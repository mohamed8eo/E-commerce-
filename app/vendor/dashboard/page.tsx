"use client"
import useSWR from 'swr'
import { DashboardCard } from "@/components/DashboardCard"
import { DashboardCardGroup } from "@/components/DashboardCardGroup"
import { DashboardChart } from "@/components/DashboardChart"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function DashboardPage() {
  const { data: revenue } = useSWR('/api/dashboard/revenue', fetcher)
  const { data: newCustomers } = useSWR('/api/dashboard/new-customers', fetcher)
  const { data: activeAccounts } = useSWR('/api/dashboard/active-accounts', fetcher)
  const { data: growthRate } = useSWR('/api/dashboard/growth-rate', fetcher)
  const { data: salesOverTime } = useSWR('/api/dashboard/sales-over-time', fetcher)

  return (
    <div className="flex min-h-screen bg-black">
      <main className="flex-1 p-8">
        <DashboardCardGroup>
          <DashboardCard
            title="Total Revenue"
            value={revenue ? `$${revenue.total.toLocaleString()}` : "..."}
            trend={<span className="flex items-center text-green-500"><ArrowUpRight className="w-4 h-4 mr-1" />+12.5%</span>}
            description="Trending up this month\nVisitors for the last 6 months"
          />
          <DashboardCard
            title="New Customers"
            value={newCustomers ? newCustomers.count : "..."}
            trend={<span className="flex items-center text-red-500"><ArrowDownRight className="w-4 h-4 mr-1" />-20%</span>}
            description="Down 20% this period\nAcquisition needs attention"
          />
          <DashboardCard
            title="Active Accounts"
            value={activeAccounts ? activeAccounts.count : "..."}
            trend={<span className="flex items-center text-green-500"><ArrowUpRight className="w-4 h-4 mr-1" />+12.5%</span>}
            description="Strong user retention\nEngagement exceed targets"
          />
          <DashboardCard
            title="Growth Rate"
            value={growthRate ? `${growthRate.growth}%` : "..."}
            trend={<span className="flex items-center text-green-500"><ArrowUpRight className="w-4 h-4 mr-1" />+4.5%</span>}
            description="Steady performance increase\nMeets growth projections"
          />
        </DashboardCardGroup>
        <DashboardChart salesData={salesOverTime} />
      </main>
    </div>
  )
} 