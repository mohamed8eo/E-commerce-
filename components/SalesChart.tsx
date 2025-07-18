"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", sales: 40000 },
  { month: "Feb", sales: 60000 },
  { month: "Mar", sales: 35000 },
  { month: "Apr", sales: 50000 },
  { month: "May", sales: 30000 },
  { month: "Jun", sales: 70000 },
  { month: "Jul", sales: 55000 },
]

export function SalesChart() {
  return (
    <Card className="bg-[#18181b] rounded-2xl border border-[#232329] shadow-sm p-6">
      <div className="mb-6">
        <div className="text-lg font-medium text-white">Sales Over Time</div>
        <div className="text-4xl font-bold text-white mt-2">$120,000</div>
        <div className="text-sm mt-1">
          <span className="text-gray-400">Last 30 Days </span>
          <span className="text-green-500 font-semibold">+15%</span>
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