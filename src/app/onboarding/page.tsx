"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { finishOnboarding } from "@/app/actions/onboarding";
import { useAppStore } from "@/store/useAppStore";
import { Check, ChevronRight } from "lucide-react";

const STEPS = ["Welcome", "Accounts", "Categories", "Done"];

export default function OnboardingPage() {
  const router = useRouter();
  const setGlobalCurrency = useAppStore((state) => state.setCurrency);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [currency, setCurrency] = useState("USD");
  const [accounts, setAccounts] = useState([{ name: "Checking", type: "bank", balance: 0 }]);
  
  const defaultCategories = [
    { name: "Salary", type: "income" as const, icon: "briefcase", color: "#10B981" },
    { name: "Food & Dining", type: "expense" as const, icon: "utensils", color: "#EF4444" },
    { name: "Rent/Housing", type: "expense" as const, icon: "home", color: "#F59E0B" },
  ];

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      if (step === 2) {
        // We are on last configuration step, run action
        setIsSubmitting(true);
        const result = await finishOnboarding({
          currency,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          accounts,
          categories: defaultCategories,
        });

        if (result.success) {
          setGlobalCurrency(currency);
          setStep(step + 1);
        } else {
          alert("Error saving your setup. Please try again.");
        }
        setIsSubmitting(false);
      } else {
        setStep(step + 1);
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg z-10">
        <div className="flex justify-between items-center mb-6 px-2">
           {STEPS.map((s, i) => (
             <div key={s} className="flex flex-col items-center gap-2">
               <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i <= step ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                 {i < step ? <Check className="h-4 w-4" /> : i + 1}
               </div>
               <span className={`text-xs ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s}</span>
             </div>
           ))}
        </div>

        <Card className="shadow-xl bg-card border-border overflow-hidden relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  {step === 0 && "Welcome to MaWallet"}
                  {step === 1 && "Add Your First Account"}
                  {step === 2 && "Default Categories"}
                  {step === 3 && "You're All Set!"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {step === 0 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Let's set up your primary currency.</p>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Where do you hold your money?</p>
                    {accounts.map((acc, index) => (
                      <div key={index} className="space-y-2 p-4 border border-border rounded-lg bg-muted/30">
                        <Label>Account Name</Label>
                        <Input 
                          value={acc.name} 
                          onChange={(e) => {
                            const newAccs = [...accounts];
                            newAccs[index].name = e.target.value;
                            setAccounts(newAccs);
                          }} 
                        />
                        <Label className="mt-2 block">Initial Balance</Label>
                        <Input 
                          type="number"
                          value={acc.balance} 
                          onChange={(e) => {
                            const newAccs = [...accounts];
                            newAccs[index].balance = Number(e.target.value);
                            setAccounts(newAccs);
                          }} 
                        />
                      </div>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">We will create these basic categories to get you started. You can customize them later.</p>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                      {defaultCategories.map((cat, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg shadow-sm">
                          <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                            {/* Dummy Icon representation */}
                            {cat.name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{cat.name}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{cat.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-10">
                    <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center text-success mb-2">
                      <Check className="h-10 w-10" />
                    </div>
                    <p className="text-xl font-medium text-foreground">Your wallet is ready!</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleNext} 
                  className="w-full text-white" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Setting up..." : step === STEPS.length - 1 ? "Go to Dashboard" : "Continue"}
                  {step < STEPS.length - 1 && !isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
