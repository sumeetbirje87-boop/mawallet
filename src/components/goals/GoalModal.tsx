"use client";

import { useState } from "react";
import { createSavingsGoal, depositToGoal } from "@/app/actions/goals";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Target } from "lucide-react";

export function GoalModal({ 
  isOpen, 
  onClose, 
  goal = null, // if passed, means we are depositing to it instead of creating
  currency = "USD"
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  goal?: any;
  currency?: string;
}) {
  const currencySymbol = (0).toLocaleString(undefined, {style: 'currency', currency: currency || "USD", minimumFractionDigits: 0, maximumFractionDigits: 0}).replace(/\d/g, '').replace(/[.,]/g, '').trim() || "$";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (goal) {
      // Depositing existing funds towards an active goal
      const result = await depositToGoal(goal.id, parseFloat(amount || "0"));
      if (result.success) onClose();
      else alert("Failed to deposit");
    } else {
      // Creating a brand new tracking goal
      const result = await createSavingsGoal({ name, targetAmount: parseFloat(amount || "0") });
      if (result.success) onClose();
      else alert("Failed to create goal");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <Card className="w-full max-w-sm shadow-2xl border-border animate-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-baseline justify-between pb-2">
          <div>
            <CardTitle>{goal ? "Add Funds to Goal" : "Create Savings Goal"}</CardTitle>
            <CardDescription className="mt-1">{goal ? goal.name : "Set a milestone target"}</CardDescription>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted text-muted-foreground transition-colors shrink-0">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            
            {!goal && (
              <div className="space-y-2">
                 <Label>Goal Name</Label>
                 <Input 
                   required 
                   placeholder="e.g. Emergency Fund"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                 />
              </div>
            )}

            <div className="space-y-2">
              <Label>{goal ? "Deposit Amount" : "Target Complete Amount"}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{currencySymbol}</span>
                <Input 
                  required 
                  className="pl-7"
                  type="number" 
                  step="0.01"
                  placeholder="1000.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="text-white gap-2" disabled={isSubmitting}>
              {goal ? <span>Deposit</span> : <><Target className="h-4 w-4"/><span>Create Goal</span></>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
