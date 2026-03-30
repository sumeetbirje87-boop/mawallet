import { Suspense } from "react";
import { getBillsAndStatus } from "@/app/actions/bills";
import { BillsList } from "@/components/bills/BillsList";
import { format } from "date-fns";
import { getUserCurrency } from "@/app/actions/user";

async function BillsDashboard() {
  const bills = await getBillsAndStatus();
  const currency = await getUserCurrency();
  
  const upcomingBills = bills.filter(b => b.status === "upcoming" || b.status === "due_today" || b.status === "overdue");
  const upcomingTotal = upcomingBills.reduce((acc, b) => acc + b.amount, 0);

  const formattedMonth = format(new Date(), "MMMM yyyy");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 mt-8">
      
      {/* Heavy Lifting Summary Strip */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
           <h4 className="text-sm font-medium text-muted-foreground">Outstanding this Month</h4>
           <div className="flex items-end gap-2 mt-1">
             <p className="text-3xl font-bold text-foreground">
               {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(upcomingTotal)}
             </p>
           </div>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
           <h4 className="text-sm font-medium text-muted-foreground">Due / Overdue</h4>
           <p className="text-3xl font-bold mt-1 text-rose-500">
             {bills.filter(b => b.status === "due_today" || b.status === "overdue").length}
           </p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-primary/5 shadow-sm">
           <h4 className="text-sm font-medium text-primary">Current Cycle</h4>
           <p className="text-3xl font-bold mt-1 text-primary">{formattedMonth}</p>
        </div>
      </div>
      <BillsList bills={bills} currency={currency} />
    </div>
  );
}

export default function BillsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Bills & Scheduled Reminders</h1>
          <p className="text-muted-foreground mt-1">
            Track your recurring monthly obligations seamlessly against your active calendars.
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="grid gap-6 md:grid-cols-3 mt-12 animate-pulse">
           {[...Array(3)].map((_,i) => <div key={i} className="h-48 bg-muted rounded-xl" />)}
        </div>
      }>
        <BillsDashboard />
      </Suspense>
    </main>
  );
}
