import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, CreditCard, Wallet, Car } from "lucide-react";

export function AssetLiabilityBreakdown({ 
  assets, 
  liabilities,
  currency = "USD",
}: { 
  assets: any[]; 
  liabilities: any[];
  currency?: string;
}) {
  const formatMoney = (val: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(val);

  const getIcon = (type: string, isAsset: boolean) => {
    if (isAsset) return <Wallet className="h-4 w-4 text-emerald-500" />;
    if (type === 'credit_card') return <CreditCard className="h-4 w-4 text-rose-500" />;
    if (type === 'loan') return <Car className="h-4 w-4 text-rose-500" />;
    return <Landmark className="h-4 w-4 text-rose-500" />;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 mt-6">
       
       <Card className="shadow-sm border-border border-t-4 border-t-emerald-500">
         <CardHeader>
           <CardTitle>Assets Breakdown</CardTitle>
         </CardHeader>
         <CardContent>
           {assets.length === 0 ? (
             <p className="text-muted-foreground text-sm">No positive assets tracked.</p>
           ) : (
             <ul className="space-y-4">
               {assets.map(a => (
                 <li key={a.id} className="flex items-center justify-between pb-2 border-b border-border/50 last:border-0">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-emerald-50 rounded-full">{getIcon(a.type, true)}</div>
                     <span className="font-medium text-foreground">{a.name}</span>
                   </div>
                   <span className="font-bold text-emerald-600">{formatMoney(a.balance)}</span>
                 </li>
               ))}
             </ul>
           )}
         </CardContent>
       </Card>

       <Card className="shadow-sm border-border border-t-4 border-t-rose-500">
         <CardHeader>
           <CardTitle>Liabilities Breakdown</CardTitle>
         </CardHeader>
         <CardContent>
           {liabilities.filter((l: any) => l.balance > 0).length === 0 ? (
             <p className="text-muted-foreground text-sm">No active debts dragging you down. Incredible!</p>
           ) : (
             <ul className="space-y-4">
               {liabilities.filter((l: any) => l.balance > 0).map((l: any) => (
                 <li key={l.id} className="flex items-center justify-between pb-2 border-b border-border/50 last:border-0">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-rose-50 rounded-full">{getIcon(l.type, false)}</div>
                     <span className="font-medium text-foreground">{l.name}</span>
                   </div>
                   <span className="font-bold text-rose-500">{formatMoney(l.balance)}</span>
                 </li>
               ))}
             </ul>
           )}
         </CardContent>
       </Card>

    </div>
  );
}
