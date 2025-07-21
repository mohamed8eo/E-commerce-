"use client";
import { useEffect, useState } from "react";
import { getUserInfoFromDb } from "@/action/user.action";
import { useAuth } from "@clerk/nextjs";
import { Home, PackagePlus, BadgeCheckIcon, Boxes, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from 'next/navigation';

type UserInfo = {
  id: string;
  name: string | null;
  email: string;
  username: string | null;
  image: string | null;
};

const items = [
  { title: "Dashboard", url: "/vendor/dashboard", icon: LayoutDashboard },
  { title: "My Products", url: "/vendor/dashboard/products", icon: Boxes },
  { title: "Adding Product", url: "/vendor/dashboard/adding-product", icon: PackagePlus },
  { title: "Return to Store", url: "/", icon: Home }
];

const AppSidebar = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getUserInfoFromDb(userId).then((data) => {
        setUser(data || undefined);
        setLoading(false);
      });
    } else {
      setUser(undefined);
      setLoading(false);
    }
  }, [userId]);

  if (loading || !user) {
    return (
      <div className="w-full sm:w-64 h-screen bg-white flex flex-col p-8">
        {/* Header skeleton */}
        <div className="flex flex-row gap-2 items-center justify-center py-8 border-b border-gray-200">
          <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex flex-col ml-1.5 gap-2">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        {/* Menu skeleton */}
        <div className="flex flex-col gap-4 mt-8 flex-1">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
        {/* Footer skeleton */}
        <div className="h-5 w-32 bg-gray-200 rounded mt-auto animate-pulse" />
      </div>
    );
  }

  const email = user.email || "";
  const username = user.username || user.name || email;
  const image = user.image || undefined;

  return (
    <Sidebar className="bg-black">
      <SidebarContent>
        {/* Header with avatar, username, and email, centered */}
        <div className="flex flex-row gap-2 items-center justify-center py-8 border-b border-gray-200">
          <Avatar className="size-9">
            <AvatarImage src={image} alt={username} />
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
  );
};

export default AppSidebar;

