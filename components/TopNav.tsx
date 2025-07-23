"use client";
import '../i18n';
import React from 'react'
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const TopNav = () => {
  const [language, setLanguage] = useState("English");
  const { t, i18n } = useTranslation();

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <>
    <div className=" border-b-4pointer-events-none " />
    <div className="bg-black text-white flex justify-between items-center h-[56px] md:h-12 px-6 relative z-10">
      <div className="mx-auto flex items-center space-x-2 gap-4 text-center ">
        <span>
          {t('summer_sale')}{' '}
          <Link href="/products/shop" className="underline font-bold transition">
            {t('shop_now')}
          </Link>
        </span>
      </div>
      <div className="m-0 hidden md:block">
        <div className="relative inline-block">
          <button
            onClick={handleLanguageToggle}
            className="flex items-center space-x-2 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          >
            <span>{i18n.language === 'en' ? '🇺🇸 EN' : '🇪🇬 AR'}</span>
          </button>
        </div>
      </div>
    </div>
    </>
  )
} 

export default TopNav