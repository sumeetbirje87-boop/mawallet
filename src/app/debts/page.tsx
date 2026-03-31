import { Suspense } from "react";
import { getDebts } from "@/app/actions/debts";
import { DebtList } from "@/components/debts/DebtList";
import { getUserCurrency } from "@/app/actions/user";

async function DebtsContent() {
  const debts = await getDebts();
  const currency = await getUserCurrency();
  
  const totalDebt = debts.reduce((acc: any, d: any) => acc + d.currentBalance, 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      {/* Heavy Lifting Summary Strip */}
      <div className="grid gap-4 md:grid-cols-3 mt-8">
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
           <h4 className="text-sm font-medium text-muted-foreground">Total Active Debt</h4>
           <p className="text-3xl font-bold mt-2 text-rose-500">{new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(totalDebt)}</p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
           <h4 className="text-sm font-medium text-muted-foreground">Active Liabilities</h4>
           <p className="text-3xl font-bold mt-2 text-foreground">{debts.filter((d: any) => d.currentBalance > 0).length}</p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
           <h4 className="text-sm font-medium text-muted-foreground">Next Payment Due</h4>
           <p className="text-3xl font-bold mt-2 text-foreground">
              {debts.length > 0 
                ? debts.sort((a: any, b: any) => a.dueDateDay - b.dueDateDay)[0].dueDateDay 
                : "--"}
           </p>
           <p className="text-xs text-muted-foreground mt-1">Day of current month</p>
        </div>
      </div>

      <DebtList debts={debts} currency={currency} />
    </div>
  );
}

export default function DebtsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Debt Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track your liabilities, monitor interest, and manage your pay-down flows.
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="grid gap-6 md:grid-cols-3 mt-12 animate-pulse">
           {[...Array(3)].map((_,i) => <div key={i} className="h-48 bg-muted rounded-xl" />)}
        </div>
      }>
        <DebtsContent />
      </Suspense>
    </main>
  );
}
