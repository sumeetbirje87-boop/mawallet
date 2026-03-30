"use client";

import { useState } from "react";
import { createAccount, updateAccount } from "@/app/actions/accounts";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function AccountModal({ 
  isOpen, 
  onClose, 
  editAccount = null,
  currency = "USD"
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  editAccount?: any;
  currency?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [name, setName] = useState(editAccount?.name || "");
  const [type, setType] = useState(editAccount?.type || "bank");
  const [balance, setBalance] = useState(editAccount?.balance || "");
  const [isActive, setIsActive] = useState(editAccount?.isActive ?? true);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editAccount) {
      const result = await updateAccount(editAccount.id, { name, isActive });
      if (result.success) onClose();
      else alert("Failed to update account");
    } else {
      const result = await createAccount({ name, type, balance: parseFloat(balance || "0"), currency });
      if (result.success) onClose();
      else alert("Failed to create account");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <Card className="w-full max-w-sm shadow-2xl border-border animate-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>{editAccount ? "Edit Account" : "Add Account"}</CardTitle>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-muted text-muted-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            
            <div className="space-y-2">
              <Label>Account Name</Label>
              <Input 
                required 
                placeholder="e.g. Chase Checking"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {!editAccount && (
              <>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select 
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="bank">Bank Account</option>
                    <option value="cash">Cash / Wallet</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="digital_wallet">Digital Wallet</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Initial Balance</Label>
                  <Input 
                    required 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </div>
              </>
            )}

            {editAccount && (
              <div className="flex items-center gap-2 mt-4">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={isActive} 
                  onChange={(e) => setIsActive(e.target.checked)} 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="isActive" className="font-normal cursor-pointer">Account is Active</Label>
              </div>
            )}

          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="text-white" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
