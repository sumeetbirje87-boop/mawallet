import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, List, HandCoins, Target, Menu, Plus } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export default function MobileNav() {
  const pathname = usePathname();
  const setTransactionModalOpen = useUIStore((state) => state.setTransactionModalOpen);

  const mobileRoutes = [
    { name: "Home", path: "/", icon: Home },
    { name: "Transactions", path: "/transactions", icon: List },
    { name: "Budgets", path: "/budgets", icon: HandCoins },
    { name: "Goals", path: "/goals", icon: Target },
    { name: "More", path: "/more", icon: Menu },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setTransactionModalOpen(true)}
        className="fixed bottom-20 right-4 h-14 w-14 bg-primary text-white rounded-full 
                   shadow-lg flex items-center justify-center hover:bg-primary-hover z-50 
                   transition-transform active:scale-95"
        aria-label="Add Transaction"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-t border-border z-40 pb-safe">
        <nav className="flex justify-around items-center h-full max-w-md mx-auto relative px-2">
          {mobileRoutes.map((route) => {
            const isActive = pathname === route.path || (route.path !== "/" && pathname?.startsWith(route.path));
            return (
              <Link
                key={route.path}
                href={route.path}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 pt-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 w-8 h-[2px] bg-primary rounded-b-md" />
                )}
                <route.icon className="h-6 w-6" />
                <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                  {route.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
