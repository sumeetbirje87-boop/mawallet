"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Landmark, Car, GraduationCap, CheckCircle2 } from "lucide-react";
import { DebtModal } from "./DebtModal";

export function DebtList({ debts, currency = "USD" }: { debts: any[], currency?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDebt, setActiveDebt] = useState<any>(null);

  const getIcon = (type: string) => {
    switch(type) {
      case "credit_card": return <CreditCard className="h-5 w-5" />;
      case "mortgage": return <Landmark className="h-5 w-5" />;
      case "loan": return <Car className="h-5 w-5" />;
      case "student": return <GraduationCap className="h-5 w-5" />;
      default: return <Landmark className="h-5 w-5" />;
    }
  };

  const handleCreateNew = () => {
    setActiveDebt(null);
    setIsModalOpen(true);
  };

  const handlePayment = (debt: any) => {
    setActiveDebt(debt);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mt-8 mb-6">
        <h3 className="text-xl font-bold tracking-tight">Active Liabilities</h3>
        <Button onClick={handleCreateNew} className="text-white gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Liability</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {debts.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-8 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
            No active debts tracked. Excellent! Add a liability if you have one.
          </div>
        )}

        {debts.map((d) => {
          // Progress Calculation (0% means completely paid off, 100% means total principal outstanding)
          // We invert it for the bar: 100% means paid off, 0% means just started paying.
          const rawPaidOff = d.principalAmount > 0 
              ? ((d.principalAmount - d.currentBalance) / d.principalAmount) * 100 
              : 0;
          const displayPercent = Math.min(Math.max(rawPaidOff, 0), 100);
          const isCompleted = d.currentBalance <= 0;

          return (
            <Card key={d.id} className={`shadow-sm border transition-shadow ${isCompleted ? 'border-primary/50 bg-primary/5' : 'border-border/60 hover:shadow-md'}`}>
               <CardContent className="p-5">
                 
                 <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className={`mt-1 p-2 rounded-full ${isCompleted ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : getIcon(d.type)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground max-w-[150px] truncate">{d.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                            {d.interestRate}% APR
                          </span>
                          {!isCompleted && (
                            <span className="text-xs text-muted-foreground">Due: {d.dueDateDay}</span>
                          )}
                        </div>
                      </div>
                    </div>
                 </div>

                 <div className="mb-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-2xl font-bold text-foreground">
                        {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(d.currentBalance)}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        of {new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(d.principalAmount)}
                      </span>
                    </div>

                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden relative">
                      {/* The bar represents how much is PAID OFF */}
                      <div 
                        className={`h-full transition-all duration-1000 rounded-full ${isCompleted ? 'bg-primary' : 'bg-rose-500'}`}
                        style={{ width: `${displayPercent}%` }}
                      />
                    </div>
                 </div>

                 <div className="flex justify-between items-center text-sm font-medium">
                   <span className={isCompleted ? "text-primary" : "text-muted-foreground"}>{Math.round(displayPercent)}% paid</span>
                   {!isCompleted && (
                      <span className="text-rose-500 font-semibold text-xs border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 rounded">
                        Min. {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(d.minimumPayment)}
                      </span>
                   )}
                 </div>
               </CardContent>
               <CardFooter className="p-4 pt-0">
                  <Button 
                    variant={isCompleted ? "outline" : "default"} 
                    className="w-full text-foreground hover:text-white"
                    onClick={() => handlePayment(d)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Fully Paid Off" : "Make Payment"}
                  </Button>
               </CardFooter>
            </Card>
          );
        })}
      </div>

      <DebtModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        debt={activeDebt}
      />
    </>
  );
}
