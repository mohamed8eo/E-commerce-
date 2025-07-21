import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface DashboardCardProps {
  title: string;
  value: React.ReactNode;
  trend: React.ReactNode;
  description: React.ReactNode;
  children?: ReactNode
}

export function DashboardCard({ title, value, trend, description, children }: DashboardCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between h-full">
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {trend && <div className="text-xs font-semibold">{trend}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {description && <div className="text-xs text-muted-foreground mt-1">{description}</div>}
        {children}
      </CardContent>
    </div>
  )
} 