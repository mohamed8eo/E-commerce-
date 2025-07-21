"use client"

import { redirect, usePathname,  } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu } from "lucide-react";
import Link from 'next/link';
import {
  SignedIn,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';



const RightNavbar = () => {
  const { user } = useUser();
  const [isVendor, setIsVendor] = useState(false);
  const [language, setLanguage] = useState("English");
  const pathname = usePathname(); 
  
  useEffect(() => {
  if (user?.publicMetadata?.role === 'vendor') {
    setIsVendor(true);
  } else {
    setIsVendor(false);
  }
  }, [user]);
  
  
  const handleBecomeVendor = async () => {
  await fetch('/api/become-vendor', { method: 'POST' });
  toast.success('You are now a Vendor');
  setIsVendor(true);
  redirect('/vendor/dashboard')
  };
  
  const handleExitVendor = async () => {
  await fetch('/api/exit-vendor/', { method: 'POST' });
  toast.error('You are no longer a Vendor');
  setIsVendor(false);
  };
  const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  ];
  return (
    <div className="flex items-center gap-4">
    <div className=" hidden md:block relative w-40 md:w-64">
      <Input
        type="text"
        placeholder="Search products..."
        className="w-full bg-white text-black border-none rounded-full px-4 py-2 pl-10 focus-visible:ring-[3px]"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
    <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
      <ShoppingCart className="w-6 h-6 " />
    </button>
    <SignedIn>
      <UserButton />
    </SignedIn>
    
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0 w-64">
          <SheetTitle className="p-6 text-xl font-bold border-b">Menu</SheetTitle>
          {/* Search bar for mobile inside Sheet, below Menu heading */}
          <div className="p-4 border-b">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="
                  w-full
                  bg-gray-100
                  text-black
                  border border-gray-300
                  rounded-lg
                  px-10
                  py-2
                  shadow-sm
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                  placeholder:text-gray-400
                  transition
                "
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <ul className="flex flex-col gap-2 p-6">
            {links.map(link => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                    ${pathname === link.path ? 'bg-[#f3f3f3] text-[#6c47ff]' : 'text-gray-700 hover:bg-[#f3f3f3] hover:text-[#6c47ff]'}
                  `}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {!isVendor && (
                <Button onClick={handleBecomeVendor}>Become a Vendor</Button>
              )}
              {isVendor && (
                <Button onClick={handleExitVendor} variant="destructive">
                  Exit Vendor
                </Button>
              )}
          </ul>
          {/* Language switcher for mobile, at the bottom of the Sheet */}
          <div className="flex justify-center mt-auto mb-6 md:hidden">
            <button
              onClick={() => setLanguage(language === "English" ? "Arabic" : "English")}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium shadow transition-colors text-base"
            >
              <span>{language === "English" ? "🇺🇸 EN" : "🇪🇬 AR"}</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
  )
} 

export default RightNavbar