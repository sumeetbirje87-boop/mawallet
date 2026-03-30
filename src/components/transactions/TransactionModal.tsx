"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/store/useUIStore";
import { createTransaction, getModalData } from "@/app/actions/transaction";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function TransactionModal() {
  const isOpen = useUIStore((state) => state.isTransactionModalOpen);
  const setOpen = useUIStore((state) => state.setTransactionModalOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [accounts, setAccounts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [globalCurrency, setGlobalCurrency] = useState("USD");
  
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    if (isOpen) {
      getModalData().then(data => {
        setAccounts(data.accounts);
        setCategories(data.categories);
        setGlobalCurrency(data.globalCurrency || "USD");
        // Set defaults
        if (data.accounts.length > 0) setAccountId(data.accounts[0].id);
      });
      // also reset state
      setAmount("");
      setDescription("");
      setDate(new Date().toISOString().substring(0, 10));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && categories.length > 0) {
      const filteredCats = categories.filter((c: any) => c.type === type);
      if (filteredCats.length > 0) {
        setCategoryId(filteredCats[0].id);
      } else {
        setCategoryId("");
      }
    }
  }, [type, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await createTransaction({
      accountId,
      type,
      amount: parseFloat(amount),
      categoryId,
      date: new Date(date),
      description
    });
    
    if (result.success) {
      setOpen(false);
      // Reset
      setAmount("");
      setDescription("");
    } else {
      alert("Failed to create transaction.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <Card className="w-full max-w-lg shadow-2xl border-border animate-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Add Transaction</CardTitle>
          <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-muted text-muted-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            
            <div className="flex bg-muted p-1 rounded-lg">
              <button 
                type="button"
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${type === 'expense' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
                onClick={() => setType('expense')}
              >
                Expense
              </button>
              <button 
                type="button"
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${type === 'income' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
                onClick={() => setType('income')}
              >
                Income
              </button>
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-xs py-1 px-2 bg-muted rounded-md">{globalCurrency}</span>
                <Input 
                  type="number" 
                  step="0.01"
                  required 
                  className="pl-[4.5rem] font-mono text-lg" 
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Account</Label>
                <select 
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                >
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select 
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.filter(c => c.type === type).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Date</Label>
                <Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input 
                placeholder="What was this for?" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="text-white" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Transaction"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
