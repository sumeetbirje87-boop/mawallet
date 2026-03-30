import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";

export function RecentTransactions({ transactions, currency }: { transactions: any[], currency: string }) {
  
  const formatCurrency = (amount: number, type: 'income' | 'expense' | 'transfer') => {
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    if (type === 'income') return <span className="text-success font-medium">+{formatted}</span>;
    if (type === 'expense') return <span className="text-foreground font-medium">-{formatted}</span>;
    return <span className="text-muted-foreground font-medium">{formatted}</span>;
  };

  return (
    <Card className="col-span-1 md:col-span-2 shadow-sm border-border animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center p-6 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
            No transactions yet. Add your first one!
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center shrink-0" 
                    style={{ backgroundColor: `${tx.category?.color || '#94a3b8'}20`, color: tx.category?.color || '#94a3b8' }}
                  >
                    {/* Fallback Initials/Icon */}
                    <span className="font-bold text-sm tracking-tighter">
                      {tx.category?.name ? tx.category.name.substring(0, 2).toUpperCase() : 'OT'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{tx.description || tx.category?.name || "Uncategorized"}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{format(new Date(tx.date), 'MMM dd, yyyy')}</span>
                      <span>•</span>
                      <span>{tx.account?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {formatCurrency(tx.amount, tx.type)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
