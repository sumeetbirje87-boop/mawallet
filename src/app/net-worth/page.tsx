import { Suspense } from "react";
import { getNetWorthData } from "@/app/actions/networth";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { NetWorthChart } from "@/components/networth/NetWorthChart";
import { AssetLiabilityBreakdown } from "@/components/networth/AssetLiabilityBreakdown";
import { getUserCurrency } from "@/app/actions/user";

async function NetWorthDashboard() {
  const data = await getNetWorthData();
  const currency = await getUserCurrency();
  
  const formatMoney = (val: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(val);

  const isNetPositive = data.metrics.currentNetWorth >= 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500 mt-8">
      
      {/* Top Banner */}
      <Card className={`shadow-md border-2 overflow-hidden ${isNetPositive ? 'border-emerald-500/20' : 'border-rose-500/20'}`}>
         <div className={`p-1 w-full ${isNetPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
         <CardContent className="p-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center bg-card">
            <div>
              <p className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-1">Your Total Net Worth</p>
              <h2 className={`text-5xl md:text-6xl font-black ${isNetPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isNetPositive ? "+" : "-"}{formatMoney(Math.abs(data.metrics.currentNetWorth))}
              </h2>
            </div>
            
            <div className="mt-6 sm:mt-0 flex gap-6 md:gap-12">
               <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Assets</p>
                  <p className="text-xl font-bold text-foreground mt-1">{formatMoney(data.metrics.totalAssets)}</p>
               </div>
               <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Liabilities</p>
                  <p className="text-xl font-bold text-rose-500 mt-1">{formatMoney(data.metrics.totalLiabilities)}</p>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* Trailing Value Graph */}
      <Card className="shadow-sm border-border w-full">
         <CardHeader>
           <CardTitle>Wealth Generation Trajectory</CardTitle>
           <CardDescription>A 6-month retroactive footprint of your absolute wealth based on net income streams.</CardDescription>
         </CardHeader>
         <CardContent className="pt-2">
            <NetWorthChart data={data.chartData} currency={currency} />
         </CardContent>
      </Card>

      {/* Split Asset/Liability Lists */}
      <AssetLiabilityBreakdown 
        assets={data.breakdown.assets} 
        liabilities={data.breakdown.liabilities} 
        currency={currency}
      />

    </div>
  );
}

export default function NetWorthPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Net Worth Tracker</h1>
        <p className="text-muted-foreground mt-1">
          The ultimate distillation of your entire financial universe point-in-time.
        </p>
      </div>

      <Suspense fallback={
        <div className="space-y-6 animate-pulse mt-8">
           <div className="h-48 bg-muted rounded-xl w-full" />
           <div className="h-[400px] bg-muted rounded-xl w-full" />
           <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 bg-muted rounded-xl" />
              <div className="h-64 bg-muted rounded-xl" />
           </div>
        </div>
      }>
        <NetWorthDashboard />
      </Suspense>
    </main>
  );
}
