"use client";

import { useState, useEffect } from "react";
import { createDebt, payDownDebt } from "@/app/actions/debts";
import { getModalData } from "@/app/actions/transaction";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, SendHorizontal } from "lucide-react";

export function DebtModal({ 
  isOpen, 
  onClose, 
  debt = null,
  currency = "USD"
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  debt?: any;
  currency?: string;
}) {
  const currencySymbol = (0).toLocaleString(undefined, {style: 'currency', currency: currency || "USD", minimumFractionDigits: 0, maximumFractionDigits: 0}).replace(/\d/g, '').replace(/[.,]/g, '').trim() || "$";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);

  // Debt Creation State
  const [name, setName] = useState("");
  const [type, setType] = useState("loan");
  const [principalAmount, setPrincipalAmount] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [minimumPayment, setMinimumPayment] = useState("");
  const [dueDateDay, setDueDateDay] = useState("1");

  // Payment State
  const [paymentAmount, setPaymentAmount] = useState("");
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    if (isOpen && debt) {
      getModalData().then(data => {
        setAccounts(data.accounts);
        if (data.accounts.length > 0) setAccountId(data.accounts[0].id);
      });
    }
  }, [isOpen, debt]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (debt) {
      // Execute Asset Withdrawal -> Liability Payment
      const result = await payDownDebt(debt.id, parseFloat(paymentAmount), accountId);
      if (result.success) onClose();
      else alert(result.error || "Failed to submit payment");
    } else {
      // Execute Brand New Liability Registration
      const result = await createDebt({
        name,
        type,
        principalAmount: parseFloat(principalAmount || "0"),
        currentBalance: parseFloat(currentBalance || principalAmount || "0"),
        interestRate: parseFloat(interestRate || "0"),
        minimumPayment: parseFloat(minimumPayment || "0"),
        dueDateDay: parseInt(dueDateDay, 10)
      });
      if (result.success) onClose();
      else alert(result.error || "Failed to create debt");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <Card className="w-full max-w-md shadow-2xl border-border animate-in zoom-in-95 duration-200 mt-10 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-baseline justify-between pb-2">
          <div>
            <CardTitle>{debt ? "Make a Payment" : "Add New Liability"}</CardTitle>
            <CardDescription className="mt-1">
               {debt ? `Pay down ${debt.name}` : "Track a new Loan, Credit Card, or Mortgage."}
            </CardDescription>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted text-muted-foreground transition-colors shrink-0">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            
            {debt ? (
              // PAYMENT UI
              <>
                <div className="space-y-2">
                  <Label>Payment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{currencySymbol}</span>
                    <Input 
                      required 
                      className="pl-7 font-mono text-lg"
                      type="number" 
                      step="0.01"
                      max={debt.currentBalance}
                      placeholder={debt.minimumPayment.toString()}
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Outstanding Balance: {new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || "USD" }).format(debt.currentBalance)}
                  </p>
                </div>

                <div className="space-y-2 mt-4">
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
                    This will automatically create a balancing Expense line-item in your Ledger!
                  </p>
                </div>
              </>
            ) : (
              // CREATION UI
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label>Debt Name</Label>
                     <Input required placeholder="e.g. Chase Sapphire" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="loan">Auto/Personal Loan</option>
                      <option value="mortgage">Mortgage</option>
                      <option value="student">Student Loan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label>Original Principal</Label>
                    <Input type="number" required placeholder="5000" value={principalAmount} onChange={(e) => setPrincipalAmount(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Balance</Label>
                    <Input type="number" required placeholder="4200" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label>Interest (%)</Label>
                    <Input type="number" step="0.1" required placeholder="18.9" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Min. Payment</Label>
                    <Input type="number" required placeholder="125" value={minimumPayment} onChange={(e) => setMinimumPayment(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date (Day)</Label>
                    <Input type="number" required min="1" max="31" placeholder="15" value={dueDateDay} onChange={(e) => setDueDateDay(e.target.value)} />
                  </div>
                </div>
              </>
            )}

          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2 border-t mt-4 border-border">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="text-white bg-primary hover:bg-primary/90" disabled={isSubmitting}>
               {isSubmitting ? "Processing..." : debt ? "Submit Payment" : "Save Liability"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
