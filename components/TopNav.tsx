import React from 'react'
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const TopNav = () => {
  return (
    <>
    <div className="absolute inset-0 border-t-4 border-b-4 border-purple-500 pointer-events-none" />
    <div className="bg-black text-white flex justify-between items-center h-12 px-6 relative z-10">
      <div className="mx-auto flex items-center space-x-2 gap-4">
        <span>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
          <Link href="/products/shop" className="underline font-bold transition">
            ShopNow
          </Link>
        </span>
      </div>
      <div className="ml-auto">
      <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>English</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">Arabic</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
      </div>
    </div>
    </>
  )
} 

export default TopNav