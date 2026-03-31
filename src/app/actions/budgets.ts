"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { startOfMonth, endOfMonth } from "date-fns";

const prisma = new PrismaClient();

export async function getBudgetsWithProgress() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  
  const userId = session.user.id;
  const now = new Date();
  
  // Hardcoded to strictly calculate "monthly" progress for this phase standard.
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);

  const budgets = await prisma.budget.findMany({
    where: { userId, isActive: true },
    include: { category: true },
  });

  const categoriesIds = budgets.map((b: any) => b.categoryId);

  // Fetch all expenses this month for the budgeted categories
  const expensesThisMonth = await prisma.transaction.findMany({
    where: {
      userId,
      type: "expense",
      date: { gte: thisMonthStart, lte: thisMonthEnd },
      categoryId: { in: categoriesIds }
    }
  });

  // Map expenses to budgets
  const budgetProgress = budgets.map((budget: any) => {
    const spentAmount = expensesThisMonth
      .filter((tx: any) => tx.categoryId === budget.categoryId)
      .reduce((acc: any, tx: any) => acc + tx.amount, 0);

    return {
      ...budget,
      amountLimit: budget.amountLimit / 100, // Decimal conversion
      spent: spentAmount / 100,
    };
  });

  return budgetProgress.sort((a: any, b: any) => b.amountLimit - a.amountLimit);
}

export async function createBudget(data: { categoryId: string; amountLimit: number }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const existingBudget = await prisma.budget.findFirst({
      where: { userId: session.user.id, categoryId: data.categoryId, isActive: true }
    });

    if (existingBudget) {
      // Just update it if one already exists for the category
      await prisma.budget.update({
        where: { id: existingBudget.id },
        data: { amountLimit: Math.round(data.amountLimit * 100) }
      });
    } else {
      await prisma.budget.create({
        data: {
          userId: session.user.id,
          categoryId: data.categoryId,
          amountLimit: Math.round(data.amountLimit * 100),
          period: "monthly",
          startDate: new Date(),
          alertThreshold: 80,
          isActive: true
        }
      });
    }

    revalidatePath("/budgets");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create budget", error);
    return { success: false, error: "Database error" };
  }
}
