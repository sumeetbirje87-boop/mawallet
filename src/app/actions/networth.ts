"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { subMonths, startOfMonth, format } from "date-fns";

const prisma = new PrismaClient();

export async function getNetWorthData() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  
  // 1. Fetch Current Absolute Balances
  const accounts = await prisma.account.findMany({ where: { userId, isActive: true } });
  const debts = await prisma.debt.findMany({ where: { userId, isActive: true } });

  const totalAssets = accounts.reduce((acc, a) => acc + (a.balance / 100), 0);
  const totalLiabilities = debts.reduce((acc, d) => acc + (d.currentBalance / 100), 0);
  const currentNetWorth = totalAssets - totalLiabilities;

  // 2. Fetch Historical Transactions for retroactive charting
  const now = new Date();
  const sixMonthsAgo = startOfMonth(subMonths(now, 5));
  
  const transactions = await prisma.transaction.findMany({
    where: { 
      userId, 
      date: { gte: sixMonthsAgo } 
    }
  });

  // Calculate strict Net Savings per month
  // Note: Debt Payments are recorded as 'expense' tracking "debt_payment". 
  // True Wealth Generation (that alters Net Worth) excludes debt_payments because Debt Payments lower Cash AND Liability equally.
  const monthlySavings: Record<string, number> = {};
  transactions.forEach(tx => {
    const monthKey = format(tx.date, 'yyyy-MM');
    if (!monthlySavings[monthKey]) monthlySavings[monthKey] = 0;
    
    // If it's pure income, NW goes up.
    if (tx.type === "income") {
      monthlySavings[monthKey] += (tx.amount / 100);
    } 
    // If it's an expense that IS NOT a debt payment, NW goes down.
    else if (tx.type === "expense" && !tx.tags.includes("debt_payment")) {
      monthlySavings[monthKey] -= (tx.amount / 100);
    }
  });

  // 3. Retroactive Plotting
  // We know Current NW today. Net Worth at Start of Month M = End of Month M - Savings in Month M.
  const chartData = [];
  let trackingNW = currentNetWorth;
  
  for (let i = 0; i < 6; i++) {
    const targetDate = subMonths(now, i);
    const monthKey = format(targetDate, 'yyyy-MM');
    
    // We unshift to put oldest months at the start of the array
    chartData.unshift({
      name: format(targetDate, 'MMM yy'),
      netWorth: trackingNW
    });
    
    // Walk backward one month (subtract that month's wealth generation to find the prior baseline)
    const savingsThatMonth = monthlySavings[monthKey] || 0;
    trackingNW = trackingNW - savingsThatMonth;
  }

  // 4. Breakdown Mapping
  const mappedAssets = accounts.map(a => ({ id: a.id, name: a.name, type: a.type, balance: a.balance / 100 }))
                               .sort((a,b) => b.balance - a.balance);
  const mappedLiabilities = debts.map(d => ({ id: d.id, name: d.name, type: d.type, balance: d.currentBalance / 100 }))
                               .sort((a,b) => b.balance - a.balance);

  return {
    metrics: {
      totalAssets,
      totalLiabilities,
      currentNetWorth
    },
    chartData,
    breakdown: {
      assets: mappedAssets,
      liabilities: mappedLiabilities
    }
  };
}
