import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Home, Wallet, TrendingUp, HandCoins, Target, 
  Landmark, List, Repeat, ReceiptText, CreditCard, 
  BarChart2, Scale, Settings
} from "lucide-react";

export const routes = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Income", path: "/income", icon: Wallet },
  { name: "Expenses", path: "/expenses", icon: TrendingUp },
  { name: "Budgets", path: "/budgets", icon: HandCoins },
  { name: "Savings Goals", path: "/goals", icon: Target },
  { name: "Accounts", path: "/accounts", icon: Landmark },
  { name: "Transactions", path: "/transactions", icon: List },
  { name: "Recurring", path: "/recurring", icon: Repeat },
  { name: "Bills & Reminders", path: "/bills", icon: ReceiptText },
  { name: "Debts", path: "/debts", icon: CreditCard },
  { name: "Reports", path: "/reports", icon: BarChart2 },
  { name: "Net Worth", path: "/net-worth", icon: Scale },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full bg-card border-r border-border transition-all pl-3 pr-4 py-6 overflow-y-auto">
      <div className="flex items-center gap-3 px-3 mb-8">
        {/* Placeholder Logo Mark */}
        <div className="h-8 w-8 bg-primary rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shrink-0">
          M
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground hidden md:block">
          MaWallet
        </span>
      </div>

      <nav className="space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.path || (route.path !== "/" && pathname?.startsWith(route.path));
          return (
            <Link 
              key={route.path} 
              href={route.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group relative ${
                isActive 
                  ? "bg-success-bg text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[3px] bg-primary rounded-r-sm" />
              )}
              <route.icon className="h-5 w-5 shrink-0" />
              <span>{route.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
