"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BudgetModal } from "./BudgetModal";

export function BudgetsList({ budgets, currency = "USD" }: { budgets: any[], currency?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive Color based on standard financial tracking
  const getProgressColor = (percent: number) => {
    if (percent < 60) return "bg-emerald-500";
    if (percent < 85) return "bg-amber-400";
    return "bg-red-500"; // Exceeded or Danger
  };

  return (
    <>
      <div className="flex items-center justify-between mt-8 mb-6">
        <h3 className="text-xl font-bold tracking-tight">Monthly Budgets</h3>
        <Button onClick={() => setIsModalOpen(true)} className="text-white gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Set Budget</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {budgets.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center p-8 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
            No budgets set for this month. Create your first tracking goal!
          </div>
        )}

        {budgets.map((b) => {
          const rawPercent = b.amountLimit > 0 ? (b.spent / b.amountLimit) * 100 : 0;
          const displayPercent = Math.min(rawPercent, 100);
          const colorClass = getProgressColor(rawPercent);

          return (
            <Card key={b.id} className="shadow-sm border border-border/60 hover:shadow-md transition-shadow group">
               <CardContent className="p-5">
                 <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-3">
                     <div 
                       className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                       style={{ backgroundColor: `${b.category.color}20`, color: b.category.color }}
                     >
                       <span className="text-xs font-bold leading-none">{b.category.name.substring(0, 2).toUpperCase()}</span>
                     </div>
                     <span className="font-semibold text-foreground text-lg">{b.category.name}</span>
                   </div>
                   <div className="text-right">
                     <span className="text-sm font-semibold text-foreground">
                        {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(b.spent)}
                     </span>
                     <span className="text-xs text-muted-foreground ml-1">
                        / {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(b.amountLimit)}
                     </span>
                   </div>
                 </div>

                 {/* Progress Bar Track */}
                 <div className="h-3 w-full bg-muted rounded-full overflow-hidden mt-4 relative">
                    <div 
                      className={`h-full transition-all duration-700 rounded-full ${colorClass}`}
                      style={{ width: `${displayPercent}%` }}
                    />
                 </div>
                 
                 <div className="flex justify-between items-center mt-2 text-xs">
                   <span className="text-muted-foreground">{Math.round(rawPercent)}% tracking</span>
                   <span className={rawPercent > 100 ? "text-red-500 font-medium" : "text-emerald-500 font-medium"}>
                     {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Math.abs(b.amountLimit - b.spent))} {rawPercent > 100 ? "Over" : "Left"}
                   </span>
                 </div>
               </CardContent>
            </Card>
          );
        })}
      </div>

      <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
