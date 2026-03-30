"use client";

import { useState } from "react";
import { updateUserSettings } from "@/app/actions/settings";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { User, Globe } from "lucide-react";

export function SettingsForm({ initialData }: { initialData: any }) {
  const [displayName, setDisplayName] = useState(initialData.displayName || "");
  const [currencyDefault, setCurrencyDefault] = useState(initialData.currencyDefault || "USD");
  const [isSaving, setIsSaving] = useState(false);
  
  const setGlobalCurrency = useAppStore(state => state.setCurrency);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const res = await updateUserSettings({ displayName, currencyDefault });
    if (res.success) {
       setGlobalCurrency(currencyDefault);
       alert("Profile settings successfully updated!");
    } else {
       alert("Failed to save preferences: " + res.error);
    }
    
    setIsSaving(false);
  };

  return (
    <Card className="shadow-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
           <User className="h-5 w-5 text-primary" />
           Profile & Preferences
        </CardTitle>
        <CardDescription>
          Customize how your financial hub looks and operates globally.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSave}>
        <CardContent className="space-y-6">
          <div className="space-y-2 max-w-sm">
            <Label>Display Name</Label>
            <Input 
              value={displayName} 
              onChange={e => setDisplayName(e.target.value)} 
              placeholder="e.g. John Doe" 
              required 
            />
          </div>
          
          <div className="space-y-2 max-w-sm">
            <Label className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> Global Currency Default
            </Label>
            <select 
              value={currencyDefault} 
              onChange={e => setCurrencyDefault(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
               <option value="USD">USD ($) - US Dollar</option>
               <option value="INR">INR (₹) - Indian Rupee</option>
               <option value="EUR">EUR (€) - Euro</option>
               <option value="GBP">GBP (£) - British Pound</option>
               <option value="CAD">CAD ($) - Canadian Dollar</option>
               <option value="AUD">AUD ($) - Australian Dollar</option>
               <option value="JPY">JPY (¥) - Japanese Yen</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Note: This updates your global visual preference but does not retroactively convert ledger exchange rates.
            </p>
          </div>

          <div className="space-y-2 max-w-sm">
             <Label>Registration Email</Label>
             <Input value={initialData.email} disabled className="bg-muted/50 text-muted-foreground cursor-not-allowed" />
             <p className="text-xs text-muted-foreground mt-1">Bound permanently to your NextAuth session.</p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
           <Button type="submit" disabled={isSaving}>
             {isSaving ? "Saving..." : "Save Preferences"}
           </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
