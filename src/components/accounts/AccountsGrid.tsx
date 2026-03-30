"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, Landmark, CreditCard, Banknote, ShieldAlert, BarChart3, MoreVertical, Edit2 } from "lucide-react";
import { AccountModal } from "./AccountModal";

export function AccountsGrid({ initialAccounts, currency = "USD" }: { initialAccounts: any[], currency?: string }) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<any>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "bank": return <Landmark className="h-6 w-6 text-blue-500" />;
      case "credit_card": return <CreditCard className="h-6 w-6 text-purple-500" />;
      case "digital_wallet": return <Wallet className="h-6 w-6 text-emerald-500" />;
      case "investment": return <BarChart3 className="h-6 w-6 text-amber-500" />;
      case "cash":
      default: return <Banknote className="h-6 w-6 text-green-500" />;
    }
  };

  const handleEdit = (acc: any) => {
    setEditingAccount(acc);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  // We rely on Next.js revalidatePath to refresh data natively when form closes.
  // Actually, Server Actions + revalidatePath will trigger a server-side refresh.

  return (
    <>
      <div className="flex items-center justify-between mt-8 mb-4">
        <h3 className="text-xl font-bold tracking-tight">Your Accounts</h3>
        <Button onClick={handleAddNew} className="text-white gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Account</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {initialAccounts.map((acc) => (
          <Card 
            key={acc.id} 
            className={`shadow-sm border-border hover:shadow-md transition-shadow relative overflow-hidden group ${!acc.isActive ? 'opacity-60 grayscale' : ''}`}
          >
            {/* Action Menu */}
            <button 
              onClick={() => handleEdit(acc)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="h-4 w-4" />
            </button>

            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                {getIcon(acc.type)}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg leading-tight">{acc.name}</CardTitle>
                <CardDescription className="capitalize mt-0.5">{acc.type.replace('_', ' ')}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tight text-foreground mt-2">
                {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(acc.balance)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editAccount={editingAccount}
        currency={currency}
      />
    </>
  );
}
