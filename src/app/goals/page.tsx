import { Suspense } from "react";
import { getSavingsGoals } from "@/app/actions/goals";
import { GoalsList } from "@/components/goals/GoalsList";
import { getUserCurrency } from "@/app/actions/user";

async function GoalsContent() {
  const goals = await getSavingsGoals();
  const currency = await getUserCurrency();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      <GoalsList goals={goals} currency={currency} />
    </div>
  );
}

export default function GoalsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Savings Goals</h1>
          <p className="text-muted-foreground mt-1">
            Segment your liquidity to track milestone targets dynamically
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 animate-pulse">
           {[...Array(3)].map((_,i) => <div key={i} className="h-48 bg-muted rounded-xl" />)}
        </div>
      }>
        <GoalsContent />
      </Suspense>
    </main>
  );
}
