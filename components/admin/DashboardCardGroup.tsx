import { ReactNode } from "react"

export function DashboardCardGroup({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {children}
    </div>
  )
} 