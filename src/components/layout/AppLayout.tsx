"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import TransactionModal from "@/components/transactions/TransactionModal";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname?.startsWith("/onboarding");

  if (isAuthPage) {
    return <div className="h-screen w-full bg-background overflow-y-auto">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 w-full relative">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-8 bg-background pb-20 md:pb-8 relative">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      <TransactionModal />
    </div>
  );
}
