import { Suspense } from "react";
import { getAccounts } from "@/app/actions/accounts";
import { getUserCurrency } from "@/app/actions/user";
import { AccountsGrid } from "@/components/accounts/AccountsGrid";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Wallet, Landmark, CreditCard, Banknote, ShieldAlert } from "lucide-react";

async function AccountsContent() {
  const accounts = await getAccounts();
  const currency = await getUserCurrency();
  const totalBalance = accounts.filter(a => a.isActive).reduce((acc, a) => acc + a.balance, 0);

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-border bg-gradient-to-br from-primary/10 to-transparent">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Total Net Balance</p>
          <h2 className="text-4xl font-bold text-foreground mt-2">
            {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(totalBalance)}
          </h2>
        </CardContent>
      </Card>
      
      <AccountsGrid initialAccounts={accounts} currency={currency} />
    </div>
  );
}

export default function AccountsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Accounts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your wallets, banks, and balances
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="animate-pulse space-y-6">
          <div className="h-32 w-full bg-muted rounded-xl" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {[...Array(3)].map((_,i) => <div key={i} className="h-40 bg-muted rounded-xl" />)}
          </div>
        </div>
      }>
        <AccountsContent />
      </Suspense>
    </main>
  );
}
