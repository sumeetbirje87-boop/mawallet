"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { startOfMonth, endOfMonth, getDate } from "date-fns";

const prisma = new PrismaClient();

export async function getBillsAndStatus() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  const now = new Date();
  const currentDay = getDate(now);

  // 1. Fetch Active Bills
  const bills = await prisma.bill.findMany({
    where: { userId, isActive: true },
    include: { category: true, linkedAccount: true },
    orderBy: { dueDateDay: 'asc' }
  });

  // 2. Fetch all Transactions strictly this month bounding for explicit Tags!
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);

  const transactionsThisMonth = await prisma.transaction.findMany({
    where: {
      userId,
      date: { gte: thisMonthStart, lte: thisMonthEnd },
      tags: { contains: "bill_id_" }
    }
  });

  // 3. Process Statuses Statelessly!
  const processedBills = bills.map((bill: any) => {
    
    // Have we paid it this month?
    const hasPaid = transactionsThisMonth.some((tx: any) => tx.tags.includes(`bill_id_${bill.id}`));
    
    let status: "upcoming" | "due_today" | "overdue" | "paid" = "upcoming";
    let daysUntilDue = bill.dueDateDay - currentDay;

    if (hasPaid) {
      status = "paid";
    } else if (daysUntilDue === 0) {
      status = "due_today";
    } else if (daysUntilDue < 0) {
      status = "overdue";
    } // else it remains "upcoming"

    return {
      ...bill,
      amount: bill.amount / 100, // Format for client display (decimal)
      status,
      daysUntilDue
    };
  });

  return processedBills;
}

export async function createBill(data: {
  name: string;
  amount: number;
  isFixed: boolean;
  dueDateDay: number;
  categoryId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const bill = await prisma.bill.create({
      data: {
        userId: session.user.id,
        name: data.name,
        amount: Math.round(data.amount * 100),
        isFixed: data.isFixed,
        dueDateDay: data.dueDateDay,
        categoryId: data.categoryId,
        isActive: true,
      }
    });

    revalidatePath("/bills");
    return { success: true, bill };
  } catch (error) {
    console.error("Failed to create bill:", error);
    return { success: false, error: "Database exception" };
  }
}

export async function payBill(billId: string, accountId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };
  const userId = session.user.id;

  try {
    const bill = await prisma.bill.findUnique({ where: { id: billId, userId } });
    if (!bill) return { success: false, error: "Bill not found" };

    const account = await prisma.account.findUnique({ where: { id: accountId, userId } });
    if (!account) return { success: false, error: "Account not found" };

    // Atomically execute Payment Ledger + Account Drain
    await prisma.$transaction([
      prisma.account.update({
        where: { id: accountId },
        data: { balance: account.balance - bill.amount }
      }),
      prisma.transaction.create({
         data: {
           userId,
           accountId,
           categoryId: bill.categoryId,
           type: "expense",
           amount: bill.amount,
           currency: account.currency,
           description: `[Auto-Logged] Paid Bill: ${bill.name}`,
           date: new Date(),
           tags: `["bill_id_${bill.id}"]` // This is crucial for the stateless chronological solver!
         }
      })
    ]);

    revalidatePath("/bills");
    revalidatePath("/transactions");
    revalidatePath("/dashboard");
    revalidatePath("/reports");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to pay bill:", error);
    return { success: false, error: "Database exception" };
  }
}
