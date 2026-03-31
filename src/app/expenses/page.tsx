import { Suspense } from "react";
import { getTransactions } from "@/app/actions/transaction";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { CategoryPieChart } from "@/components/reports/CategoryPieChart";
import { getUserCurrency } from "@/app/actions/user";

export default async function ExpensesPage() {
  const currency = await getUserCurrency();
  const data = await getTransactions({ type: "expense", limit: 50 });
  
  let totalExpense = 0;
  const map: Record<string, {value: number, fill: string}> = {};
  data.transactions.forEach((tx: any) => {
      totalExpense += tx.amount / 100;
      const cat = tx.category?.name || "Uncategorized";
      map[cat] = {
         value: (map[cat]?.value || 0) + (tx.amount / 100),
         fill: tx.category?.color || "#f43f5e"
      };
  });
  
  const expenseCategories = Object.entries(map).map(([name, val]) => ({
      name, value: val.value, fill: val.fill, type: "expense"
  })).sort((a,b) => b.value - a.value);

  const formatMoney = (val: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(val);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Expense Heatmap</h1>
        <p className="text-muted-foreground mt-1">Deep diving into your active cash drain algorithms.</p>
      </div>

      <Suspense fallback={<div className="h-[300px] bg-muted animate-pulse rounded-xl mb-6" />}>
         <div className="grid gap-6 md:grid-cols-[1fr_2fr] mb-8">
            <div className="p-6 border border-border rounded-xl bg-card shadow-sm border-t-4 border-t-rose-500">
               <h3 className="text-sm font-medium text-rose-500 uppercase tracking-widest mb-1">Mapped Expenses</h3>
               <p className="text-4xl font-black text-foreground">{formatMoney(totalExpense)}</p>
               <p className="mt-4 text-sm text-muted-foreground">This is how much cash you burned strictly across explicit categorizations.</p>
            </div>
            <div className="p-6 border border-border rounded-xl bg-card shadow-sm">
               <h3 className="text-sm font-medium text-muted-foreground mb-4">Cash Drain Breakdown</h3>
               <div className="h-[400px]">
                 <CategoryPieChart data={expenseCategories} />
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
