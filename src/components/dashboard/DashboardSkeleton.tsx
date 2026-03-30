import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      
      {/* Summary Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-muted rounded mb-2" />
              <div className="h-3 w-40 bg-muted/60 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-4 shadow-sm border-border">
          <CardHeader>
            <div className="h-5 w-40 bg-muted rounded" />
          </CardHeader>
          <CardContent className="h-[300px] flex items-end gap-4 pb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-1 bg-muted rounded-t flex items-end justify-center" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-3 shadow-sm border-border">
          <CardHeader>
            <div className="h-5 w-32 bg-muted rounded" />
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="h-40 w-40 bg-muted rounded-full p-6 border-[16px] border-muted/50" />
          </CardContent>
        </Card>
      </div>

      {/* Transactions Skeleton */}
      <Card className="col-span-1 shadow-sm border-border">
        <CardHeader>
          <div className="h-5 w-48 bg-muted rounded mb-1" />
          <div className="h-3 w-64 bg-muted/60 rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-muted rounded-full shrink-0" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-24 bg-muted/60 rounded" />
                </div>
              </div>
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
