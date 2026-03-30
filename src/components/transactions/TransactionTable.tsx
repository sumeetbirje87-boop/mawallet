"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { deleteTransaction } from "@/app/actions/transaction";
import { MoreHorizontal, Trash2, Edit2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export function TransactionTable({ data, currency = "USD" }: { data: any, currency?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { transactions, total, totalPages, currentPage } = data;

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this transaction? This action will restore the amount to your account balance.")) {
      const res = await deleteTransaction(id);
      if (res.success) {
        router.refresh(); // Tells Next.js to re-fetch the server data visually without reloading the page entirely.
      } else {
        alert("Failed to delete.");
      }
    }
  };

  const formatCurrency = (amount: number, type: string) => {
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    return type === 'income' 
      ? <span className="text-success font-semibold px-2 py-0.5 rounded-full bg-success/10">+{formatted}</span>
      : <span className="text-foreground font-semibold">-{formatted}</span>;
  };

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Account</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No transactions found matching your criteria.
                </td>
              </tr>
            ) : (
              transactions.map((tx: any) => (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {format(new Date(tx.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground max-w-[200px] truncate">
                    {tx.description || <i className="text-muted-foreground font-normal">No description</i>}
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: `${tx.category?.color || '#94a3b8'}20`, color: tx.category?.color || '#94a3b8' }}
                    >
                      {tx.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {tx.account?.name}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {formatCurrency(tx.amount, tx.type)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleDelete(tx.id)}
                      className="p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Transaction"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {/* The edit flow will typically connect back into the generic Transaction Modal, optionally populated with this payload, but for this phase scope simply deleting/adding is supported. */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-muted/20">
          <span className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{(currentPage - 1) * 20 + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * 20, total)}</span> of <span className="font-medium text-foreground">{total}</span>
          </span>
          <div className="flex gap-2">
            <Link 
              href={createPageUrl(currentPage - 1)}
              className={`p-2 rounded-md flex items-center border border-border bg-card hover:bg-muted transition-colors ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link 
              href={createPageUrl(currentPage + 1)}
              className={`p-2 rounded-md flex items-center border border-border bg-card hover:bg-muted transition-colors ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
