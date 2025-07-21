"use client"
import { Card } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts"

export function DashboardChart({ salesData }: { salesData?: Record<string, number> }) {
  // Transform salesData to array for recharts
  const data = salesData
    ? Object.entries(salesData).map(([month, sales]) => ({ month, sales }))
    : []

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="mb-6">
        <div className="text-lg font-medium text-black">Sales Over Time</div>
        <div className="text-4xl font-bold text-black mt-2">
          {salesData ? `$${data.reduce((sum, d) => sum + d.sales, 0).toLocaleString()}` : '...'}
        </div>
        <div className="text-sm mt-1">
          <span className="text-gray-600">Last 12 Months </span>
          {/* You can add a real percentage if you calculate it */}
          <span className="text-green-600 font-semibold">+15%</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#18181b" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            stroke="#94a3b8"
            tick={{ fontSize: 16, fontWeight: 600 }}
          />
          <Tooltip
            contentStyle={{ background: "#232329", border: "none", color: "#fff" }}
            labelStyle={{ color: "#fff" }}
            cursor={{ stroke: "#64748b", strokeWidth: 1, opacity: 0.2 }}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#64748b"
            strokeWidth={4}
            fill="url(#salesGradient)"
            dot={false}
            activeDot={{ r: 6, fill: "#64748b", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
} 