"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function ReportFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPeriod = searchParams?.get("period") || "last_6_months";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) params.set(name, value);
      else params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  const handlePeriodChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("period", value)}`);
  };

  return (
    <div className="flex gap-2 p-1 bg-muted rounded-lg w-max shrink-0">
      {[
        { id: "this_month", label: "This Month" },
        { id: "last_month", label: "Last Month" },
        { id: "last_6_months", label: "Last 6 Months" },
        { id: "this_year", label: "This Year" },
      ].map((p) => (
        <button
          key={p.id}
          onClick={() => handlePeriodChange(p.id)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            currentPeriod === p.id 
              ? "bg-card text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
