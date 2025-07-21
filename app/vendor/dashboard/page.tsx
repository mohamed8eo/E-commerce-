"use client"
import useSWR from 'swr'
import { DashboardCard } from "@/components/admin/DashboardCard"
import { DashboardCardGroup } from "@/components/admin/DashboardCardGroup"
import { DashboardChart } from "@/components/admin/DashboardChart"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function DashboardPage() {
  const { data: revenue } = useSWR('/api/dashboard/revenue', fetcher)
  const { data: newCustomers } = useSWR('/api/dashboard/new-customers', fetcher)
  const { data: activeAccounts } = useSWR('/api/dashboard/active-accounts', fetcher)
  const { data: growthRate } = useSWR('/api/dashboard/growth-rate', fetcher)
  const { data: salesOverTime } = useSWR('/api/dashboard/sales-over-time', fetcher)

  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-8">
        <DashboardCardGroup>
          <DashboardCard
            title="Total Revenue"
            value={<span className="text-black">{revenue ? `$${revenue.total.toLocaleString()}` : "..."}</span>}
            trend={
              revenue ? (
                <span className={`flex items-center ${Number(revenue.trend) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(revenue.trend) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {Number(revenue.trend) >= 0 ? '+' : ''}{revenue.trend}%
                </span>
              ) : "..."
            }
            description={<span className="text-gray-600">{revenue ? (Number(revenue.trend) >= 0 ? "Revenue is growing\nGreat performance this month" : "Revenue has decreased\nNeeds attention") : "Loading..."}</span>}
          />
          <DashboardCard
            title="New Customers"
            value={<span className="text-black">{newCustomers ? newCustomers.count : "..."}</span>}
            trend={
              newCustomers ? (
                <span className={`flex items-center ${Number(newCustomers.trend) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(newCustomers.trend) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {Number(newCustomers.trend) >= 0 ? '+' : ''}{newCustomers.trend}%
                </span>
              ) : "..."
            }
            description={<span className="text-gray-600">{newCustomers ? (Number(newCustomers.trend) >= 0 ? "Customer growth is positive\nAcquisition strategy working" : "Customer acquisition down\nNeeds attention") : "Loading..."}</span>}
          />
          <DashboardCard
            title="Active Accounts"
            value={<span className="text-black">{activeAccounts ? activeAccounts.count : "..."}</span>}
            trend={
              activeAccounts ? (
                <span className={`flex items-center ${Number(activeAccounts.trend) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(activeAccounts.trend) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {Number(activeAccounts.trend) >= 0 ? '+' : ''}{activeAccounts.trend}%
                </span>
              ) : "..."
            }
            description={<span className="text-gray-600">{activeAccounts ? (Number(activeAccounts.trend) >= 0 ? "Active users increasing\nStrong engagement" : "Active users decreasing\nRetention needs work") : "Loading..."}</span>}
          />
          <DashboardCard
            title="Growth Rate"
            value={<span className="text-black">{growthRate ? `${growthRate.growth}%` : "..."}</span>}
            trend={
              growthRate ? (
                <span className={`flex items-center ${Number(growthRate.trend) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(growthRate.trend) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {growthRate.trend}
                </span>
              ) : "..."
            }
            description={<span className="text-gray-600">{growthRate ? (Number(growthRate.trend) >= 0 ? "Growth rate positive\nExceeding targets" : "Growth rate negative\nBelow expectations") : "Loading..."}</span>}
          />
        </DashboardCardGroup>
        <DashboardChart salesData={salesOverTime} />
      </main>
    </div>
  )
} 