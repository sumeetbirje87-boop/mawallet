import { Suspense } from "react";
import { getBudgetsWithProgress } from "@/app/actions/budgets";
import { BudgetsList } from "@/components/budgets/BudgetsList";
import { getUserCurrency } from "@/app/actions/user";

async function BudgetsContent() {
  const budgets = await getBudgetsWithProgress();
  const currency = await getUserCurrency();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <BudgetsList budgets={budgets} currency={currency} />
    </div>
  );
}

export default function BudgetsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Budgets</h1>
          <p className="text-muted-foreground mt-1">
            Track your monthly category pacing limits dynamically
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="grid gap-6 md:grid-cols-2 mt-12 animate-pulse">
           {[...Array(4)].map((_,i) => <div key={i} className="h-32 bg-muted rounded-xl" />)}
        </div>
      }>
        <BudgetsContent />
      </Suspense>
    </main>
  );
}
