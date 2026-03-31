"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function createTransaction(data: {
  accountId: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  categoryId?: string;
  date: Date;
  description: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    // Save transaction
    // amount in gemini.md is stored as "smallest currency unit" (e.g. cents). We should multiply by 100 on client or server. 
    // We expect the client to pass the raw decimal number and we handle it here if it's not already handled.
    // Let's assume the client passes raw numbers (e.g., 50.25) and we store as int 5025.
    const amountInSmallestUnit = Math.round(data.amount * 100);

    const tx = await prisma.transaction.create({
      data: {
        userId,
        accountId: data.accountId,
        type: data.type,
        amount: amountInSmallestUnit,
        currency: "USD", // For simplicity, in real app get from user/store
        categoryId: data.categoryId || null,
        description: data.description,
        date: data.date,
        tags: "[]",
      },
    });

    // Update account balance
    const account = await prisma.account.findUnique({ where: { id: data.accountId } });
    if (account) {
      let change = 0;
      if (data.type === "income") change = amountInSmallestUnit;
      if (data.type === "expense") change = -amountInSmallestUnit;
      // Transfer logic...

      await prisma.account.update({
        where: { id: data.accountId },
        data: { balance: account.balance + change },
      });
    }

    return { success: true, transaction: tx };
  } catch (error) {
    console.error("Failed to create transaction", error);
    return { success: false, error: "Database error." };
  }
}

// Fetch helper for categories and accounts to populate the modal select inputs
export async function getModalData() {
  const session = await auth();
  if (!session?.user?.id) return { accounts: [], categories: [] };
  const userId = session.user.id;
  let accounts = await prisma.account.findMany({ where: { userId } });
  let categories = await prisma.category.findMany({ where: { userId } });

  // Auto-seed Categories if user lacks tracking dimensions
  const hasExpense = categories.some((c: any) => c.type === "expense");
  const hasIncome = categories.some((c: any) => c.type === "income");

  if (!hasExpense || !hasIncome) {
    const toCreate = [];
    if (!hasExpense) {
      toCreate.push(
        { userId, name: "Food & Dining", type: "expense", icon: "Utensils", color: "#f43f5e" },
        { userId, name: "Transport", type: "expense", icon: "Car", color: "#3b82f6" }
      );
    }
    if (!hasIncome) {
      toCreate.push(
        { userId, name: "Salary / Income", type: "income", icon: "Briefcase", color: "#10b981" }
      );
    }
    
    await prisma.category.createMany({ data: toCreate });
    categories = await prisma.category.findMany({ where: { userId } });
  }

  // Auto-seed default global Wallet
  if (accounts.length === 0) {
    await prisma.account.create({
      data: {
        userId,
        name: "Main Wallet",
        type: "cash",
        balance: 0,
        currency: "USD"
      }
    });
    accounts = await prisma.account.findMany({ where: { userId } });
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { currencyDefault: true } });

  return { 
    accounts, 
    categories,
    globalCurrency: user?.currencyDefault || "USD" 
  };
}

export async function getTransactions({
  page = 1,
  limit = 20,
  type,
  categoryId,
  accountId,
  search,
}: {
  page?: number;
  limit?: number;
  type?: string;
  categoryId?: string;
  accountId?: string;
  search?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const where: any = { userId: session.user.id };

  if (type) where.type = type;
  if (categoryId) where.categoryId = categoryId;
  if (accountId) where.accountId = accountId;
  if (search) {
    where.OR = [
      { description: { contains: search } },
      { category: { name: { contains: search } } },
    ];
  }

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      include: { category: true, account: true },
      orderBy: { date: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.transaction.count({ where }),
  ]);

  return {
    transactions: transactions.map((tx: any) => ({ ...tx, amount: tx.amount / 100 })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function deleteTransaction(txId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const tx = await prisma.transaction.findUnique({
      where: { id: txId, userId: session.user.id },
    });

    if (!tx) return { success: false, error: "Not found" };

    // Reverse the balance
    const account = await prisma.account.findUnique({ where: { id: tx.accountId } });
    if (account) {
      let change = 0;
      if (tx.type === "income") change = -tx.amount;
      if (tx.type === "expense") change = tx.amount;
      
      await prisma.account.update({
        where: { id: tx.accountId },
        data: { balance: account.balance + change },
      });
    }

    await prisma.transaction.delete({ where: { id: txId } });

    // Assuming we do revalidate on the client or via revalidatePath
    return { success: true };
  } catch (error) {
    console.error("Failed to delete transaction", error);
    return { success: false, error: "Database error" };
  }
}
