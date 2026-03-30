"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function getCategories(type: "income" | "expense" = "expense") {
  const session = await auth();
  if (!session?.user?.id) return [];
  const userId = session.user.id;

  let cats = await prisma.category.findMany({
    where: { 
      userId, 
      type, 
      isActive: true 
    },
    orderBy: { name: "asc" }
  });

  // Native fail-safe if the user explicitly skipped onboarding
  if (cats.length === 0) {
     const defaults = type === "expense" ? [
        { name: "Food & Dining", type: "expense", icon: "Utensils", color: "#f43f5e" },
        { name: "Transport", type: "expense", icon: "Car", color: "#3b82f6" },
        { name: "Housing", type: "expense", icon: "Home", color: "#8b5cf6" },
        { name: "Utilities", type: "expense", icon: "Zap", color: "#eab308" }
     ] : [
        { name: "Salary", type: "income", icon: "Briefcase", color: "#10b981" },
        { name: "Trading", type: "income", icon: "TrendingUp", color: "#06b6d4" }
     ];
     await prisma.category.createMany({ 
        data: defaults.map(d => ({ ...d, userId })) 
     });
     cats = await prisma.category.findMany({ 
        where: { userId, type, isActive: true }, 
        orderBy: { name: "asc" } 
     });
  }

  return cats;
}
