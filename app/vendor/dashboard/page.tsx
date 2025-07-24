"use client"
import useSWR from 'swr'
import { DashboardCard } from "@/components/admin/DashboardCard"
import { DashboardCardGroup } from "@/components/admin/DashboardCardGroup"
import { DashboardChart } from "@/components/admin/DashboardChart"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function DashboardPage() {
  const { data, error } = useSWR('/api/dashboard/summary', fetcher)

  if (error) return <div className="p-8">Failed to load dashboard data.</div>
  if (!data) return <div className="p-8">Loading dashboard...</div>

  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-8">
        <DashboardCardGroup>
          <DashboardCard
            title="Total Revenue"
            value={<span className="text-black">${data.revenue.toLocaleString()}</span>}
            trend={
              <span className={`flex items-center ${Number(data.revenue) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(data.revenue) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {Number(data.revenue) >= 0 ? '+' : ''}{data.revenue}%
                </span>
            }
            description={<span className="text-gray-600">{Number(data.revenue) >= 0 ? "Revenue is growing\nGreat performance this month" : "Revenue has decreased\nNeeds attention"}</span>}
          />
          <DashboardCard
            title="New Customers"
            value={<span className="text-black">{data.newCustomers}</span>}
            trend={
              <span className={`flex items-center ${Number(data.newCustomers) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(data.newCustomers) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {Number(data.newCustomers) >= 0 ? '+' : ''}{data.newCustomers}%
                </span>
            }
            description={<span className="text-gray-600">{Number(data.newCustomers) >= 0 ? "Customer growth is positive\nAcquisition strategy working" : "Customer acquisition down\nNeeds attention"}</span>}
          />
          <DashboardCard
            title="Active Accounts"
            value={<span className="text-black">{data.activeAccounts}</span>}
            trend={
              <span className={`flex items-center ${Number(data.activeAccounts) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(data.activeAccounts) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {Number(data.activeAccounts) >= 0 ? '+' : ''}{data.activeAccounts}%
                </span>
            }
            description={<span className="text-gray-600">{Number(data.activeAccounts) >= 0 ? "Active users increasing\nStrong engagement" : "Active users decreasing\nRetention needs work"}</span>}
          />
          <DashboardCard
            title="Growth Rate"
            value={<span className="text-black">{data.growth}%</span>}
            trend={
              <span className={`flex items-center ${Number(data.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(data.growth) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {data.growth}
                </span>
            }
            description={<span className="text-gray-600">{Number(data.growth) >= 0 ? "Growth rate positive\nExceeding targets" : "Growth rate negative\nBelow expectations"}</span>}
          />
        </DashboardCardGroup>
        <DashboardChart salesData={data.salesOverTime} />
      </main>
    </div>
  )
} 