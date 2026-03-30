import { Suspense } from "react";
import { getTransactions } from "@/app/actions/transaction";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { CategoryPieChart } from "@/components/reports/CategoryPieChart";
import { getUserCurrency } from "@/app/actions/user";

export default async function IncomePage() {
  const currency = await getUserCurrency();
  const data = await getTransactions({ type: "income", limit: 50 });
  
  let totalIncome = 0;
  const map: Record<string, number> = {};
  data.transactions.forEach(tx => {
      totalIncome += (tx.amount / 100);
      const cat = tx.category?.name || "Uncategorized";
      map[cat] = (map[cat] || 0) + (tx.amount / 100);
  });
  
  const incomeCategories = Object.entries(map).map(([name, value]) => ({
      name, value, fill: "#10b981", type: "income"
  })).sort((a,b) => b.value - a.value);

  const formatMoney = (val: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(val);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Income Tracking</h1>
        <p className="text-muted-foreground mt-1">Analyzing absolute deposits, refunds, and wealth generation sources.</p>
      </div>

      <Suspense fallback={<div className="h-[300px] bg-muted animate-pulse rounded-xl mb-6" />}>
         <div className="grid gap-6 md:grid-cols-[1fr_2fr] mb-8">
            <div className="p-6 border border-border rounded-xl bg-card shadow-sm">
               <h3 className="text-sm font-medium text-emerald-600 uppercase tracking-widest mb-1">Mapped Income</h3>
               <p className="text-4xl font-black text-foreground">{formatMoney(totalIncome)}</p>
               <p className="mt-4 text-sm text-muted-foreground">Every dollar accumulated natively classified by categorical groupings.</p>
            </div>
            <div className="p-6 border border-border rounded-xl bg-card shadow-sm">
               <h3 className="text-sm font-medium text-muted-foreground mb-4">Income Breakdown Map</h3>
               <div className="h-[400px]">
                 <CategoryPieChart data={incomeCategories} />
               </div>
            </div>
         </div>
      </Suspense>

      <Suspense fallback={<div className="h-[500px] w-full bg-muted rounded-xl animate-pulse" />}>
        <TransactionTable data={data} currency={currency} />
      </Suspense>
    </main>
  );
}
