"use client"
import { Home, PackagePlus, BadgeCheckIcon, Boxes,LayoutDashboard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from 'next/navigation';

const items = [
  {
    title: "Dashboard",
    url: "/vendor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Products",
    url: "/vendor/dashboard/products",
    icon: Boxes,
  },
  {
    title: "Adding Product",
    url: "/vendor/dashboard/adding-product",
    icon: PackagePlus,
  },
  {
    title: "Return to Store",
    url: "/",
    icon: Home
  }
]

const AppSidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  if (!user || user.publicMetadata?.role !== "vendor") return null;
  const email = user.primaryEmailAddress?.emailAddress || "";
  const username = user.username || user.firstName || email;

  return (
    <Sidebar>
      <SidebarContent>
        {/* Header with avatar, username, and email, centered */}
        <div className="flex flex-row gap-2 items-center justify-center py-8 border-b border-gray-200">
          <Avatar className="size-9">
            <AvatarImage src={user.imageUrl} alt={username} />
            <AvatarFallback>{username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex justify-center items-start flex-col ml-1.5">
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600 mt-1 mb-1"
            >
              <BadgeCheckIcon className="mr-1" />
              Verified
            </Badge>
            <span className="font-bold text-[16px] uppercase">{username}</span>
            <span className="text-xs text-gray-500 text-[10px]">{email}</span>
          </div>
        </div>
        {/* Sidebar menu content */}
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 ${isActive ? 'bg-[#232329] text-white' : ''}`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Sidebar Footer */}
        <div className="mt-auto py-4 px-6 text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 text-center">
          © {new Date().getFullYear()} E-Commerce Admin
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar

