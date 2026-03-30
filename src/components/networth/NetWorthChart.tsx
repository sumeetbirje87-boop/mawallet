"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function NetWorthChart({ data, currency = "USD" }: { data: any[], currency?: string }) {
  
  const formatCurrency = (value: any) => new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(value));

  // Find min/max for tighter Y-axis scaling
  const minNetWorth = Math.min(...data.map(d => d.netWorth));
  const maxNetWorth = Math.max(...data.map(d => d.netWorth));
  const padding = (maxNetWorth - minNetWorth) * 0.1;

  // Determine gradient color mapping (Green for Positive NW overall, Orange for Negative)
  const isPositive = data[data.length - 1]?.netWorth >= 0;
  const strokeColor = isPositive ? "#10b981" : "#f43f5e"; 

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748b", fontSize: 12 }}
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickFormatter={(value) => new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)}
            domain={[minNetWorth - padding, maxNetWorth + padding]}
          />
          <Tooltip 
            formatter={formatCurrency}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Area 
            type="monotone" 
            dataKey="netWorth" 
            name="Net Worth"
            stroke={strokeColor} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorNetWorth)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
