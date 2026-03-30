"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getSavingsGoals() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const goals = await prisma.savingsGoal.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return goals.map(g => ({
    ...g,
    targetAmount: g.targetAmount / 100,
    currentAmount: g.currentAmount / 100,
  }));
}

export async function createSavingsGoal(data: { name: string; targetAmount: number }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const goal = await prisma.savingsGoal.create({
      data: {
        userId: session.user.id,
        name: data.name,
        targetAmount: Math.round(data.targetAmount * 100),
        currentAmount: 0, // Starts empty
        isCompleted: false,
      }
    });

    revalidatePath("/goals");
    return { success: true, goal };
  } catch (error) {
    console.error("Failed to create goal", error);
    return { success: false, error: "Database error" };
  }
}

export async function depositToGoal(goalId: string, amount: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const goal = await prisma.savingsGoal.findUnique({ where: { id: goalId, userId: session.user.id } });
    if (!goal) throw new Error("Goal not found");

    const newAmount = goal.currentAmount + Math.round(amount * 100);

    await prisma.savingsGoal.update({
      where: { id: goalId },
      data: {
        currentAmount: newAmount,
        isCompleted: newAmount >= goal.targetAmount
      }
    });

    revalidatePath("/goals");
    return { success: true };
  } catch (error) {
    console.error("Failed to deposit", error);
    return { success: false, error: "Database error" };
  }
}
