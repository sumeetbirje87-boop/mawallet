import { Suspense } from "react";
import { getDashboardData } from "@/app/actions/dashboard";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { OverviewCharts } from "@/components/dashboard/OverviewCharts";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { DashboardBudgets } from "@/components/dashboard/DashboardBudgets";
import { getBudgetsWithProgress } from "@/app/actions/budgets";
import { cookies } from "next/headers";
import { getUserCurrency } from "@/app/actions/user";

async function DashboardContent() {
  const data = await getDashboardData();
  const budgetsData = await getBudgetsWithProgress();
  const currency = await getUserCurrency();

  return (
    <div className="flex flex-col gap-6">
      <SummaryCards metrics={data.metrics} currency={currency} />
      <OverviewCharts 
        chartData={data.chartData} 
        expenseBreakdown={data.expenseBreakdown} 
        currency={currency} 
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         <RecentTransactions transactions={data.recentTransactions} currency={currency} />
         <DashboardBudgets budgets={budgetsData} currency={currency} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
            Financial overview for {currentDate}
          </p>
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
