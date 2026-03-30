import { Suspense } from "react";
import { getTransactions, getModalData } from "@/app/actions/transaction";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";

async function LedgerContent({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  // Parse params
  const page = parseInt(searchParams.page || "1", 10);
  const { type, categoryId, accountId, search } = searchParams;

  // Parallel fetch: get filters metadata and the bounded transactions
  const [data, metaData] = await Promise.all([
    getTransactions({ page, limit: 20, type, categoryId, accountId, search }),
    getModalData()
  ]);

  return (
    <>
      <TransactionFilters accounts={metaData.accounts} categories={metaData.categories} />
      <TransactionTable data={data} currency="USD" />
    </>
  );
}

export default function TransactionsPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Transactions Ledger</h1>
          <p className="text-muted-foreground mt-1">
            Search, filter, and review your complete financial history.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Suspense fallback={
          <div className="animate-pulse space-y-6">
             <div className="h-24 w-full bg-muted rounded-xl" />
             <div className="h-96 w-full bg-muted rounded-xl" />
          </div>
        }>
          <LedgerContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
