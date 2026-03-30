"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function TransactionFilters({ accounts, categories }: { accounts: any[], categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Local state for search debounce
  const [searchTerm, setSearchTerm] = useState(searchParams?.get("search") || "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) params.set(name, value);
      else params.delete(name);
      
      // Reset page to 1 on any filter change
      if (name !== "page") params.set("page", "1");
      
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (key: string, value: string) => {
    router.push(`${pathname}?${createQueryString(key, value)}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange("search", searchTerm);
  };

  const clearFilters = () => {
    setSearchTerm("");
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(
    searchParams?.get("type") || 
    searchParams?.get("categoryId") || 
    searchParams?.get("accountId") || 
    searchParams?.get("search")
  );

  return (
    <div className="bg-card p-4 rounded-xl border border-border shadow-sm mb-6 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search */}
        <form onSubmit={handleSearch} className="relative w-full md:w-auto flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search descriptions..."
            className="pl-9 h-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="h-10 rounded-md border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus:ring-1 focus:ring-primary"
            value={searchParams?.get("type") || ""}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">All Types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            className="h-10 rounded-md border border-input bg-card px-3 py-2 text-sm max-w-[150px] truncate"
            value={searchParams?.get("categoryId") || ""}
            onChange={(e) => handleFilterChange("categoryId", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            className="h-10 rounded-md border border-input bg-card px-3 py-2 text-sm max-w-[150px] truncate"
            value={searchParams?.get("accountId") || ""}
            onChange={(e) => handleFilterChange("accountId", e.target.value)}
          >
            <option value="">All Accounts</option>
            {accounts.map((a: any) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <Button variant="ghost" size="icon" onClick={clearFilters} className="shrink-0" title="Clear Filters">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
