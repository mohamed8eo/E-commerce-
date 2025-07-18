import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface DashboardCardProps {
  title: string
  value: string | number
  trend?: ReactNode
  description?: string
  children?: ReactNode
}

export function DashboardCard({ title, value, trend, description, children }: DashboardCardProps) {
  return (
    <Card className="bg-[#18181b] rounded-2xl border border-[#232329] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {trend && <div className="text-xs font-semibold">{trend}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {description && <div className="text-xs text-muted-foreground mt-1">{description}</div>}
        {children}
      </CardContent>
    </Card>
  )
} 