"use client";

import { useState } from "react";
import { format, getDate } from "date-fns";
import { Card, CardHeader, CardContent, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Clock, AlertCircle, CalendarX } from "lucide-react";
import { BillModal } from "./BillModal";

export function BillsList({ bills, currency = "USD" }: { bills: any[], currency?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBill, setActiveBill] = useState<any>(null);

  const handleCreateNew = () => {
    setActiveBill(null);
    setIsModalOpen(true);
  };

  const handlePayment = (bill: any) => {
    setActiveBill(bill);
    setIsModalOpen(true);
  };

  const currentDay = getDate(new Date());
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "due_today": return "bg-rose-500/10 text-rose-600 border-rose-500/50 shadow-sm shadow-rose-500/20";
      case "overdue": return "bg-rose-500/20 text-rose-700 border-rose-500";
      case "upcoming": default: return "bg-primary/5 text-primary border-primary/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle2 className="h-4 w-4" />;
      case "due_today": return <AlertCircle className="h-4 w-4" />;
      case "overdue": return <CalendarX className="h-4 w-4" />;
      case "upcoming": default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (bill: any) => {
    if (bill.status === "paid") return "Paid";
    if (bill.status === "due_today") return "Due Today";
    if (bill.status === "overdue") return `Overdue by ${Math.abs(bill.daysUntilDue)} days`;
    return `Due in ${bill.daysUntilDue} days`;
  };

  return (
    <>
      <div className="flex items-center justify-between mt-8 mb-6">
        <h3 className="text-xl font-bold tracking-tight">Scheduled Bills</h3>
        <Button onClick={handleCreateNew} className="text-white gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Bill</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bills.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-8 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
            No bills scheduled. Click 'Add Bill' to start tracking your monthly obligations.
          </div>
        )}

        {bills.map((b) => (
          <Card key={b.id} className={`shadow-sm border transition-shadow hover:shadow-md overflow-hidden ${b.status === 'due_today' ? 'border-rose-500/50 ring-1 ring-rose-500/20' : ''}`}>
             <div className="p-5">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg text-foreground max-w-[200px] truncate">{b.name}</h4>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">{b.category?.name || "Uncategorized"}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(b.status)}`}>
                    {getStatusIcon(b.status)}
                    <span>{getStatusLabel(b)}</span>
                  </div>
               </div>

               <div className="flex items-end gap-2 mb-2">
                 <span className={`text-3xl font-black ${b.status === 'paid' ? 'text-muted-foreground' : 'text-foreground'}`}>
                   {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(b.amount)}
                 </span>
                 <span className="text-sm text-muted-foreground mb-1 font-medium">{b.isFixed ? 'Exact' : 'Est.'}</span>
               </div>
               
               <div className="flex items-center justify-between text-sm">
                 <span className="text-muted-foreground">Due Date</span>
                 <span className="font-bold text-foreground">Day {b.dueDateDay}</span>
               </div>
             </div>
             
             <CardFooter className="p-4 bg-muted/10 border-t border-border mt-auto">
                <Button 
                  variant={b.status === "paid" ? "outline" : "default"} 
                  className={`w-full ${b.status === 'paid' ? 'text-muted-foreground' : 'text-white'}`}
                  onClick={() => handlePayment(b)}
                  disabled={b.status === "paid"}
                >
                  {b.status === "paid" ? "Paid this Month" : "Pay Bill"}
                </Button>
             </CardFooter>
          </Card>
        ))}
      </div>

      <BillModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        bill={activeBill}
      />
    </>
  );
}
