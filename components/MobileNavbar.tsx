"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Boxes, PackagePlus, Home } from "lucide-react";
import { cn } from "@/lib/utils";

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
    icon: Home,
  },
];

const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#18181b] border-t border-[#232329] flex justify-around items-center h-16 sm:hidden">
      {items.map((item) => {
        const isActive = pathname === item.url;
        return (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs px-2 py-1 transition-colors",
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive ? "text-white" : "text-gray-400")} />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNavbar;
 