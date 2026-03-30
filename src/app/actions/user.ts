"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserCurrency() {
  const session = await auth();
  if (!session?.user?.id) return "USD";
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { currencyDefault: true }
  });
  
  return user?.currencyDefault || "USD";
}
