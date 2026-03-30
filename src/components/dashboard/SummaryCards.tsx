import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, Wallet, ArrowDownCircle, ArrowUpCircle, PiggyBank } from "lucide-react";

export function SummaryCards({ metrics, currency }: { metrics: any, currency: string }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
  };

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const FormatTrend = ({ value, invert = false }: { value: number, invert?: boolean }) => {
    const isPositive = value > 0;
    const isGood = invert ? !isPositive : isPositive;
    const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;

    if (value === 0) return <span className="text-muted-foreground text-xs">0% from last month</span>;

    return (
      <span className={`flex items-center text-xs font-medium ${isGood ? 'text-success' : 'text-destructive'}`}>
        <Icon className="h-3 w-3 mr-1" />
        {Math.abs(value)}%
        <span className="text-muted-foreground ml-1 font-normal">from last month</span>
      </span>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Card className="shadow-sm border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{formatCurrency(metrics.totalBalance)}</div>
          <p className="text-xs text-muted-foreground mt-1">Across all accounts</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Income This Month</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{formatCurrency(metrics.incomeThisMonth)}</div>
          <div className="mt-1">
            <FormatTrend value={getPercentageChange(metrics.incomeThisMonth, metrics.incomeLastMonth)} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Expenses This Month</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{formatCurrency(metrics.expensesThisMonth)}</div>
          <div className="mt-1">
            <FormatTrend value={getPercentageChange(metrics.expensesThisMonth, metrics.expensesLastMonth)} invert />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Net Savings</CardTitle>
          <PiggyBank className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{formatCurrency(metrics.netSavingsThisMonth)}</div>
          <div className="mt-1">
            <FormatTrend value={getPercentageChange(metrics.netSavingsThisMonth, metrics.netSavingsLastMonth)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
