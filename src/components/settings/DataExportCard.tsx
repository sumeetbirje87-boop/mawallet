"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadCloud, ShieldAlert } from "lucide-react";

export function DataExportCard() {
  
  const handleDownload = () => {
    // Dynamically spawn the download anchor targeting our NextJS Route Handler!
    window.location.href = "/api/export/csv";
  };

  return (
    <Card className="shadow-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
           <ShieldAlert className="h-5 w-5 text-amber-500" />
           Data Portability & Privacy
        </CardTitle>
        <CardDescription>
           You own 100% of your financial footprint. Export it securely anytime.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/20 border border-border rounded-lg">
           <div className="max-w-xl">
             <h4 className="font-semibold text-foreground">Export Transaction Ledger (CSV)</h4>
             <p className="text-sm text-muted-foreground mt-1">
               Download a universal comma-separated flat-file of every single `Income`, `Expense`, and `Transfer` you've ever logged into the system. Accessible by Excel, Google Sheets, or custom Python scripts natively.
             </p>
           </div>
           
           <Button 
             onClick={handleDownload}
             className="shrink-0 gap-2 font-bold tracking-wide"
             variant="outline"
           >
             <DownloadCloud className="h-4 w-4" />
             Download CSV
           </Button>
        </div>

      </CardContent>
    </Card>
  );
}
