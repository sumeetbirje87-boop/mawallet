import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { subMonths, startOfMonth, startOfDay, endOfMonth, endOfDay, format } from "date-fns";

const prisma = new PrismaClient();

export async function getDashboardData() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;
  const now = new Date();

  // 1. Total Balance Across Accounts
  const accounts = await prisma.account.findMany({ where: { userId, isActive: true } });
  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);

  // 2. Income & Expenses for Current Month vs Previous Month
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const currentMonthTx = await prisma.transaction.findMany({
    where: {
      userId,
      date: { gte: thisMonthStart, lte: thisMonthEnd },
    },
    include: { category: true },
  });

  const lastMonthTx = await prisma.transaction.findMany({
    where: {
      userId,
      date: { gte: lastMonthStart, lte: lastMonthEnd },
    },
  });

  const incomeThisMonth = currentMonthTx.filter((tx) => tx.type === "income").reduce((acc, tx) => acc + tx.amount, 0);
  const expensesThisMonth = currentMonthTx.filter((tx) => tx.type === "expense").reduce((acc, tx) => acc + tx.amount, 0);
  
  const incomeLastMonth = lastMonthTx.filter((tx) => tx.type === "income").reduce((acc, tx) => acc + tx.amount, 0);
  const expensesLastMonth = lastMonthTx.filter((tx) => tx.type === "expense").reduce((acc, tx) => acc + tx.amount, 0);

  const netSavingsThisMonth = incomeThisMonth - expensesThisMonth;
  const netSavingsLastMonth = incomeLastMonth - expensesLastMonth;

  // 3. Last 6 Months historical data for charts
  const sixMonthsAgo = startOfMonth(subMonths(now, 5));
  const historicalTx = await prisma.transaction.findMany({
    where: {
      userId,
      date: { gte: sixMonthsAgo },
      type: { in: ["income", "expense"] },
    },
  });

  // Aggregate into array of 6 months: { name: 'Jan', income: X, expense: Y }
  const monthNames = Array.from({ length: 6 }).map((_, i) => format(subMonths(now, 5 - i), 'MMM'));
  const chartData = monthNames.map((monthStr) => {
    return { name: monthStr, income: 0, expense: 0 };
  });

  historicalTx.forEach((tx) => {
    const monthStr = format(tx.date, 'MMM');
    const chartIndex = chartData.findIndex((d) => d.name === monthStr);
    if (chartIndex >= 0) {
      if (tx.type === "income") chartData[chartIndex].income += tx.amount / 100;
      if (tx.type === "expense") chartData[chartIndex].expense += tx.amount / 100;
    }
  });

  // 4. Expense Breakdown (Current Month)
  const expenseByCategoryMap: Record<string, { value: number, fill: string }> = {};
  currentMonthTx.filter(tx => tx.type === "expense").forEach(tx => {
    const catName = tx.category?.name || "Other";
    const catColor = tx.category?.color || "#94a3b8"; // slate-400
    
    if (!expenseByCategoryMap[catName]) {
      expenseByCategoryMap[catName] = { value: 0, fill: catColor };
    }
    expenseByCategoryMap[catName].value += tx.amount / 100;
  });

  const expenseBreakdown = Object.entries(expenseByCategoryMap)
    .map(([name, data]) => ({ name, value: data.value, fill: data.fill }))
    .sort((a, b) => b.value - a.value);

  // 5. Recent Transactions
  const recentTransactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 10,
    include: { category: true, account: true },
  });

  return {
    metrics: {
      totalBalance: totalBalance / 100, // Converting back to decimal
      incomeThisMonth: incomeThisMonth / 100,
      expensesThisMonth: expensesThisMonth / 100,
      netSavingsThisMonth: netSavingsThisMonth / 100,
      incomeLastMonth: incomeLastMonth / 100,
      expensesLastMonth: expensesLastMonth / 100,
      netSavingsLastMonth: netSavingsLastMonth / 100,
    },
    chartData,
    expenseBreakdown,
    recentTransactions: recentTransactions.map(tx => ({
      ...tx,
      amount: tx.amount / 100,
    })),
  };
}
