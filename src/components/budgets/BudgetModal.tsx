"use client";

import { useState, useEffect } from "react";
import { createBudget } from "@/app/actions/budgets";
import { getCategories } from "@/app/actions/categories";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function BudgetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [categoryId, setCategoryId] = useState("");
  const [amountLimit, setAmountLimit] = useState("");

  useEffect(() => {
    if (isOpen) {
      getCategories("expense").then(data => {
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0].id);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await createBudget({ categoryId, amountLimit: parseFloat(amountLimit || "0") });
    if (result.success) onClose();
    else alert("Failed to create budget");
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <Card className="w-full max-w-sm shadow-2xl border-border animate-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Set Monthly Budget</CardTitle>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted text-muted-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            
            <div className="space-y-2">
              <Label>Expense Category</Label>
              <select 
                required
                className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Monthly Limit Amount</Label>
              <Input 
                required 
                type="number" 
                step="0.01"
                placeholder="500.00"
                value={amountLimit}
                onChange={(e) => setAmountLimit(e.target.value)}
              />
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="text-white bg-primary hover:bg-primary/90" disabled={isSubmitting || categories.length === 0}>
              {isSubmitting ? "Saving..." : "Save Budget"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
