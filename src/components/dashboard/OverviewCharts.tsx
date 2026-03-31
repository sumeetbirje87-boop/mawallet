"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

export function OverviewCharts({ chartData, expenseBreakdown, currency }: { chartData: any[], expenseBreakdown: any[], currency: string }) {
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg text-sm">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex items-center gap-2" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
              {entry.name}: <span className="font-semibold text-foreground">{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7 animate-in fade-in slide-in-from-bottom-3 duration-700">
      
      {/* 6-Month Trend Chart */}
      <Card className="col-span-1 md:col-span-4 shadow-sm border-border">
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} className="text-muted-foreground" />
              <YAxis fontSize={12} tickLine={false} axisLine={false} className="text-muted-foreground" tickFormatter={(v) => new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(v)} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Legend iconType="circle" />
              <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="expense" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donut Chart */}
      <Card className="col-span-1 md:col-span-3 shadow-sm border-border">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full flex items-center justify-center relative">
          {expenseBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center text-muted-foreground">
              <span className="text-sm">No expenses this month.</span>
            </div>
          )}
          
          {/* Legend Custom Render */}
          {expenseBreakdown.length > 0 && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-xs text-muted-foreground block">Total</span>
                <span className="font-bold text-foreground">
                  {formatCurrency(expenseBreakdown.reduce((acc: any, curr: any) => acc + curr.value, 0))}
                </span>
             </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
