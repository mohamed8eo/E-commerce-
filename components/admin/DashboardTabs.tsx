import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DashboardTabsProps {
  value: string
  onChange: (value: string) => void
}

export function DashboardTabs({ value, onChange }: DashboardTabsProps) {
  return (
    <Tabs value={value} onValueChange={onChange} className="mb-2">
      <TabsList className="rounded-full bg-[#232329] p-1">
        <TabsTrigger className="rounded-full px-4 py-1 data-[state=active]:bg-white data-[state=active]:text-black" value="3months">Last 3 months</TabsTrigger>
        <TabsTrigger className="rounded-full px-4 py-1 data-[state=active]:bg-white data-[state=active]:text-black" value="30days">Last 30 days</TabsTrigger>
        <TabsTrigger className="rounded-full px-4 py-1 data-[state=active]:bg-white data-[state=active]:text-black" value="7days">Last 7 days</TabsTrigger>
      </TabsList>
    </Tabs>
  )
} 