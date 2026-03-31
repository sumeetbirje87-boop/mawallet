"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getDebts() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const debts = await prisma.debt.findMany({
    where: { userId: session.user.id, isActive: true },
    orderBy: { createdAt: "desc" },
    include: { linkedAccount: true }
  });

  return debts.map((d: any) => ({
    ...d,
    principalAmount: d.principalAmount / 100,
    currentBalance: d.currentBalance / 100,
    minimumPayment: d.minimumPayment / 100
  }));
}

export async function createDebt(data: {
  name: string;
  type: string;
  principalAmount: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment: number;
  dueDateDay: number;
}) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const debt = await prisma.debt.create({
      data: {
        userId: session.user.id,
        name: data.name,
        type: data.type,
        principalAmount: Math.round(data.principalAmount * 100),
        currentBalance: Math.round(data.currentBalance * 100),
        interestRate: data.interestRate,
        minimumPayment: Math.round(data.minimumPayment * 100),
        dueDateDay: data.dueDateDay,
        startDate: new Date(),
        isActive: true,
      }
    });
    revalidatePath("/debts");
    return { success: true, debt };
  } catch (error) {
    console.error("Failed to create debt:", error);
    return { success: false, error: "Database exception" };
  }
}

export async function payDownDebt(debtId: string, amount: number, accountId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };
  const userId = session.user.id;

  try {
    // 1. Validate Debt
    const debt = await prisma.debt.findUnique({ where: { id: debtId, userId } });
    if (!debt) return { success: false, error: "Debt not found" };

    // 2. Validate Account
    const account = await prisma.account.findUnique({ where: { id: accountId, userId } });
    if (!account) return { success: false, error: "Account not found" };

    const amountInSmallestUnit = Math.round(amount * 100);

    // 3. Mathematical Execution
    await prisma.$transaction([
      
      // Withdraw cash from Asset Account
      prisma.account.update({
        where: { id: accountId },
        data: { balance: account.balance - amountInSmallestUnit }
      }),

      // Map Payment against Liability Balance
      prisma.debt.update({
        where: { id: debtId },
        data: { 
          currentBalance: Math.max(0, debt.currentBalance - amountInSmallestUnit),
          isActive: (debt.currentBalance - amountInSmallestUnit) > 0 // close it out if paid off completely!
        }
      }),

      // Create formal Ledger line item to keep historical analytics perfectly balanced
      prisma.transaction.create({
        data: {
          userId,
          accountId,
          type: "expense",
          amount: amountInSmallestUnit,
          currency: account.currency,
          categoryId: null, // Ideally we map an exact category, but null works as 'Uncategorized Expense'
          description: `Payment towards ${debt.name}`,
          date: new Date(),
          tags: "[\"debt_payment\"]"
        }
      })
    ]);

    revalidatePath("/debts");
    revalidatePath("/transactions");
    revalidatePath("/reports");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to pay down debt:", error);
    return { success: false, error: "Database exception" };
  }
}
