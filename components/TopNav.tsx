"use client"
import React from 'react'
import Link from "next/link";
import { useState } from "react";

const TopNav = () => {
  const [language, setLanguage] = useState("English");
  return (
    <>
    <div className=" border-b-4pointer-events-none " />
    <div className="bg-black text-white flex justify-between items-center h-[56px] md:h-12 px-6 relative z-10">
      <div className="mx-auto flex items-center space-x-2 gap-4 text-center ">
        <span>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
          <Link href="/products/shop" className="underline font-bold transition">
            ShopNow
          </Link>
        </span>
      </div>
      <div className="m-0 hidden md:block">
        <div className="relative inline-block">
          <button
            onClick={() => setLanguage(language === "English" ? "Arabic" : "English")}
            className="flex items-center space-x-2 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          >
            <span>{language === "English" ? "🇺🇸 EN" : "🇪🇬 AR"}</span>
          </button>
        </div>
      </div>
    </div>
    </>
  )
} 

export default TopNav