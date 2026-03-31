"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { 
  subMonths, startOfMonth, startOfYear, startOfDay, 
  endOfMonth, endOfYear, endOfDay, format, eachDayOfInterval, eachMonthOfInterval, subDays 
} from "date-fns";

const prisma = new PrismaClient();

export async function getReportData(period: "this_month" | "last_month" | "last_6_months" | "this_year" = "last_6_months") {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  const now = new Date();

  let startDate: Date;
  let endDate: Date = endOfDay(now);

  switch (period) {
    case "this_month":
      startDate = startOfMonth(now);
      break;
    case "last_month":
      startDate = startOfMonth(subMonths(now, 1));
      endDate = endOfMonth(subMonths(now, 1));
      break;
    case "this_year":
      startDate = startOfYear(now);
      break;
    case "last_6_months":
    default:
      startDate = startOfMonth(subMonths(now, 5));
      break;
  }

  // 1. Fetch scoped transactions
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: { gte: startDate, lte: endDate },
      type: { in: ["income", "expense"] }
    },
    include: { category: true }
  });

  // 2. Compute Top Line Metrics
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(tx => {
    if (tx.type === "income") totalIncome += tx.amount / 100;
    if (tx.type === "expense") totalExpense += tx.amount / 100;
  });

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  // 3. Category Breakdown (Expenses Only)
  const expenseByCategoryMap: Record<string, { value: number, fill: string }> = {};
  transactions.filter(tx => tx.type === "expense").forEach(tx => {
    const catName = tx.category?.name || "Other";
    const catColor = tx.category?.color || "#94a3b8"; 
    
    if (!expenseByCategoryMap[catName]) {
      expenseByCategoryMap[catName] = { value: 0, fill: catColor };
    }
    expenseByCategoryMap[catName].value += tx.amount / 100;
  });

  const expenseBreakdown = Object.entries(expenseByCategoryMap)
    .map(([name, data]) => ({ name, value: data.value, fill: data.fill }))
    .sort((a, b) => b.value - a.value); // Sort highest first

  // 4. Trend Data Generation
  let trendData: { name: string; income: number; expense: number; rawDate?: Date }[] = [];
  
  // If period spans multiple months, group by Month. If it's single month, group by Day.
  if (period === "this_month" || period === "last_month") {
    // Generate daily buckets
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    trendData = days.map((day: any) => ({
      name: format(day, 'MMM dd'),
      rawDate: day,
      income: 0,
      expense: 0
    }));

    transactions.forEach(tx => {
      const match = trendData.find(d => format(d.rawDate!, 'yyyy-MM-dd') === format(tx.date, 'yyyy-MM-dd'));
      if (match) {
        if (tx.type === "income") match.income += tx.amount / 100;
        if (tx.type === "expense") match.expense += tx.amount / 100;
      }
    });
  } else {
    // Generate monthly buckets
    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    trendData = months.map((month: any) => ({
      name: format(month, 'MMM yyyy'),
      rawDate: month,
      income: 0,
      expense: 0
    }));

    transactions.forEach(tx => {
      const match = trendData.find(d => format(d.rawDate!, 'yyyy-MM') === format(tx.date, 'yyyy-MM'));
      if (match) {
        if (tx.type === "income") match.income += tx.amount / 100;
        if (tx.type === "expense") match.expense += tx.amount / 100;
      }
    });
  }

  // Cleanup internal rawDate map mapping
  trendData = trendData.map(({ name, income, expense }) => ({ name, income, expense }));

  return {
    metrics: { totalIncome, totalExpense, netSavings, savingsRate },
    expenseBreakdown,
    trendData
  };
}
