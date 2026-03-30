"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getAccounts() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const accounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return accounts.map(a => ({
    ...a,
    balance: a.balance / 100, // Return as decimal for UI
  }));
}

export async function createAccount(data: { name: string; type: string; balance: number; currency: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const acc = await prisma.account.create({
      data: {
        userId: session.user.id,
        name: data.name,
        type: data.type,
        balance: Math.round(data.balance * 100),
        currency: data.currency,
      }
    });
    revalidatePath("/accounts");
    revalidatePath("/");
    return { success: true, account: acc };
  } catch (error) {
    console.error("Failed to create account", error);
    return { success: false, error: "Database error" };
  }
}

export async function updateAccount(id: string, data: { name: string; isActive: boolean }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const acc = await prisma.account.update({
      where: { id, userId: session.user.id },
      data: {
        name: data.name,
        isActive: data.isActive,
      }
    });
    revalidatePath("/accounts");
    revalidatePath("/");
    return { success: true, account: acc };
  } catch (error) {
    console.error("Failed to update account", error);
    return { success: false, error: "Database error" };
  }
}
