import { Suspense } from "react";
import { getReportData } from "@/app/actions/reports";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IncomeExpenseChart } from "@/components/reports/IncomeExpenseChart";
import { CategoryPieChart } from "@/components/reports/CategoryPieChart";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { getUserCurrency } from "@/app/actions/user";

async function ReportsDashboard({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const period = (searchParams.period || "last_6_months") as "this_month" | "last_month" | "last_6_months" | "this_year";
  const data = await getReportData(period);
  const currency = await getUserCurrency();

  const formatMoney = (val: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(val);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      {/* Top Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm border-border bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Income</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-emerald-500">{formatMoney(data.metrics.totalIncome)}</p></CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Expenses</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-rose-500">{formatMoney(data.metrics.totalExpense)}</p></CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Net Savings</CardTitle></CardHeader>
          <CardContent>
             <p className={`text-2xl font-bold ${data.metrics.netSavings >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
               {data.metrics.netSavings >= 0 ? '+' : ''}{formatMoney(data.metrics.netSavings)}
             </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-primary/5">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-primary">Savings Rate</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-primary">{Math.round(data.metrics.savingsRate)}%</p></CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Income vs Expense Graph */}
        <Card className="shadow-sm border-border col-span-1 md:col-span-2 lg:col-span-1 border-t-4 border-t-primary/80">
          <CardHeader>
            <CardTitle>Income vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart data={data.trendData} currency={currency} />
          </CardContent>
        </Card>

        {/* Category Drain Donut */}
        <Card className="shadow-sm border-border col-span-1 md:col-span-2 lg:col-span-1 border-t-4 border-t-slate-500 mt-6 lg:mt-0">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart data={data.expenseBreakdown} currency={currency} />
          </CardContent>
        </Card>

      </div>

    </div>
  );
}

export default function ReportsPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Understand your liquidity workflows through intelligent time-series data.
          </p>
        </div>
        
        <Suspense fallback={<div className="h-10 w-40 bg-muted animate-pulse rounded-md" />}>
          <ReportFilters />
        </Suspense>
      </div>

      <Suspense fallback={
        <div className="space-y-6 animate-pulse mt-8">
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_,i) => <div key={i} className="h-28 bg-muted rounded-xl" />)}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(2)].map((_,i) => <div key={i} className="h-96 md:col-span-1 bg-muted rounded-xl" />)}
          </div>
        </div>
      }>
        <ReportsDashboard searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
