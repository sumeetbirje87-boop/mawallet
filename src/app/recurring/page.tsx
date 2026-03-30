import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw } from "lucide-react";

export default function RecurringPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-3xl mx-auto w-full flex items-center justify-center h-[80vh]">
      
      <Card className="shadow-2xl border-border w-full text-center animate-in zoom-in-95 duration-500">
         <CardHeader className="pt-12">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-max mb-6">
              <RefreshCw className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-black text-foreground">Recurring Architecture</CardTitle>
            <CardDescription className="text-base mt-2 max-w-md mx-auto">
               MaWallet consolidates all structurally recurring rules (Subscriptions, Automated Transfers, Monthly Debits) strictly inside the Bills & Reminders Chronology engine.
            </CardDescription>
         </CardHeader>
         <CardContent className="pb-12 space-y-6">
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              To avoid duplicating logic and fragmenting your projected cashflows across separate dashboards, all repeating logic is mapped universally through a single, chronologically-aware tracker.
            </p>
            
            <Link href="/bills" passHref>
               <Button size="lg" className="text-white gap-2 font-bold px-8 mt-2">
                 Go to Scheduled Bills
                 <ArrowRight className="h-4 w-4" />
               </Button>
            </Link>
         </CardContent>
      </Card>

    </main>
  );
}
