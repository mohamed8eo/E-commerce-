import MobileNavbar from "@/components/admin/MobileNavbar"
import AppSidebar from "@/components/admin/Sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-col sm:flex-row min-h-screen ">
        <div className="w-full sm:w-64 shrink-0">
          <AppSidebar />
          <MobileNavbar/>
        </div>
        <main className="flex-1">
          {children}
        </main>
        <ThemeProvider></ThemeProvider>
      </div>
    </SidebarProvider>
  )
}