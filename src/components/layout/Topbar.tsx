"use client";

import { useState } from "react";
import { Bell, Search, Plus, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useUIStore } from "@/store/useUIStore";

export default function Topbar() {
  const { data: session } = useSession();
  const setTransactionModalOpen = useUIStore((state) => state.setTransactionModalOpen);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="md:hidden flex items-center gap-2">
           {/* Mobile Logo Logo Mark */}
          <div className="h-7 w-7 bg-primary rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shrink-0">
            M
          </div>
          <span className="font-bold">MaWallet</span>
        </div>
        
        <div className="relative w-full max-w-sm hidden md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search transactions (Ctrl+K)..."
            className="w-full bg-card border border-border rounded-lg pl-9 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setTransactionModalOpen(true)}
          className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </button>
        
        <div className="relative">
           <button 
             onClick={() => setIsNotifOpen(!isNotifOpen)}
             className="relative p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
           >
             <Bell className="h-5 w-5" />
             <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border block" />
           </button>
           
           {isNotifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                 <h4 className="font-bold text-sm mb-3 text-foreground">Notifications</h4>
                 <div className="space-y-1">
                    <div className="flex gap-3 text-sm p-3 bg-muted/30 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                       <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                       <div>
                          <p className="font-semibold text-foreground">Welcome to MaWallet V1.0!</p>
                          <p className="text-muted-foreground text-xs mt-0.5">Your intelligent financial journey begins today. Start adding your daily transactions securely.</p>
                       </div>
                    </div>
                    <div className="flex gap-3 text-sm p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                       <div className="h-2 w-2 mt-1.5 rounded-full bg-rose-500 shrink-0" />
                       <div>
                          <p className="font-medium text-foreground">Missing Budgets</p>
                          <p className="text-muted-foreground text-xs mt-0.5">Consider mapping your cash thresholds with hard categorical tracking limits.</p>
                       </div>
                    </div>
                 </div>
              </div>
           )}
        </div>
        
        <div className="group relative">
          <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-xs font-semibold text-foreground">
              {getInitials(session?.user?.name)}
            </span>
          </div>

          {/* Minimal Dropdown for Sign out */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="p-3 border-b border-border text-sm">
              <p className="font-medium truncate">{session?.user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
            </div>
            <div className="p-1">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-2 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
