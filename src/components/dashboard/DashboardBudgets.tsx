import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DashboardBudgets({ budgets, currency = "USD" }: { budgets: any[], currency?: string }) {
  const topBudgets = budgets.slice(0, 3);

  const getProgressColor = (percent: number) => {
    if (percent < 60) return "bg-emerald-500";
    if (percent < 85) return "bg-amber-400";
    return "bg-red-500"; 
  };

  return (
    <Card className="col-span-1 lg:col-span-1 shadow-sm border-border animate-in fade-in slide-in-from-right-4 duration-1000 h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Budget Usage</CardTitle>
          <CardDescription>Top category pacing</CardDescription>
        </div>
        <Link href="/budgets" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-5">
        
        {topBudgets.length === 0 ? (
           <div className="text-center p-6 text-muted-foreground bg-muted/20 border border-dashed rounded-lg text-sm">
             No active budgets.
           </div>
        ) : (
          topBudgets.map(b => {
             const rawPercent = b.amountLimit > 0 ? (b.spent / b.amountLimit) * 100 : 0;
             const displayPercent = Math.min(rawPercent, 100);
             const colorClass = getProgressColor(rawPercent);

             return (
               <div key={b.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground truncate max-w-[120px]" title={b.category.name}>
                       {b.category.name}
                    </span>
                    <span className="font-medium text-foreground">
                       {new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(b.spent)} <span className="text-muted-foreground text-xs font-normal">/ {new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(b.amountLimit)}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 rounded-full ${colorClass}`}
                      style={{ width: `${displayPercent}%` }}
                    />
                  </div>
               </div>
             );
          })
        )}

        {budgets.length > 3 && (
          <div className="pt-2 text-center border-t border-border mt-2">
            <Link href="/budgets" className="text-xs font-semibold text-primary hover:underline">
               View {budgets.length - 3} more {budgets.length - 3 === 1 ? 'budget' : 'budgets'}
            </Link>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
