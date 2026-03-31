"use client";

import { useState, useEffect } from "react";
import { createBill, payBill } from "@/app/actions/bills";
import { getModalData } from "@/app/actions/transaction";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { X, CalendarClock } from "lucide-react";

export function BillModal({ 
  isOpen, 
  onClose, 
  bill = null,
  currency = "USD"
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  bill?: any;
  currency?: string;
}) {
  const currencySymbol = (0).toLocaleString(undefined, {style: 'currency', currency: currency || "USD", minimumFractionDigits: 0, maximumFractionDigits: 0}).replace(/\d/g, '').replace(/[.,]/g, '').trim() || "$";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);

  // Creation State
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDateDay, setDueDateDay] = useState("1");
  const [categoryId, setCategoryId] = useState("");
  const [isFixed, setIsFixed] = useState(true);

  // Payment State
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    if (isOpen) {
      getModalData().then(data => {
        setCategories(data.categories.filter((c: any) => c.type === "expense"));
        setAccounts(data.accounts);
        
        if (!categoryId && data.categories.length > 0) {
           const expCat = data.categories.find((c: any) => c.type === "expense");
           if (expCat) setCategoryId(expCat.id);
        }
        if (!accountId && data.accounts.length > 0) {
           setAccountId(data.accounts[0].id);
        }
      });
    }
  }, [isOpen, categoryId, accountId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (bill) {
      // Execute Quick Payment
      const result = await payBill(bill.id, accountId);
      if (result.success) onClose();
      else alert(result.error || "Failed to submit payment");
    } else {
      // Execute Creation
      const result = await createBill({
        name,
        amount: parseFloat(amount || "0"),
        dueDateDay: parseInt(dueDateDay, 10),
        categoryId,
        isFixed
      });
      if (result.success) {
        setName("");
        setAmount("");
        onClose();
      } else {
        alert(result.error || "Failed to create bill");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <Card className="w-full max-w-md shadow-2xl border-border animate-in zoom-in-95 duration-200 mt-10 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-baseline justify-between pb-2">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>{bill ? "Confirm Bill Payment" : "Schedule New Bill"}</CardTitle>
              <CardDescription className="mt-1">
                 {bill ? `Authorize exact payment for ${bill.name}` : "Track monthly recurring obligations."}
              </CardDescription>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted text-muted-foreground transition-colors shrink-0">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            
            {bill ? (
              // PAYMENT UI
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 border border-border rounded-lg text-center">
                   <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">{bill.name}</p>
                   <p className="text-3xl font-black text-rose-500">{new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || "USD" }).format(bill.amount)}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Pay From Account</Label>
                  <select 
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                  >
                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name} (Bal: ${(a.balance/100).toFixed(2)})</option>)}
                  </select>
                  <p className="text-xs text-muted-foreground">
                    This automatically withdraws the funds and logs a strict Ledger Expense tracking this exact month.
                  </p>
                </div>
              </div>
            ) : (
              // CREATION UI
              <>
                <div className="space-y-2">
                   <Label>Bill Name</Label>
                   <Input required placeholder="e.g. Netflix Subscription" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{currencySymbol}</span>
                      <Input type="number" step="0.01" required placeholder="14.99" className="pl-7 text-lg font-mono" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date (Day)</Label>
                    <Input type="number" required min="1" max="31" placeholder="15" className="text-lg font-mono" value={dueDateDay} onChange={(e) => setDueDateDay(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                   <Label>Category Allocation</Label>
                   <select 
                     required
                     className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                     value={categoryId}
                     onChange={(e) => setCategoryId(e.target.value)}
                   >
                     {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                   </select>
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/10 mt-2">
                  <div className="space-y-0.5">
                    <Label>Fixed vs Estimated</Label>
                    <p className="text-xs text-muted-foreground">Does this bill change per month?</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" checked={isFixed} onChange={(e) => setIsFixed(e.target.checked)} />
                </div>
              </>
            )}

          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2 border-t mt-4 border-border">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="text-white bg-primary hover:bg-primary/90" disabled={isSubmitting}>
               {isSubmitting ? "Processing..." : bill ? "Confirm Payment" : "Save Schedule"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
