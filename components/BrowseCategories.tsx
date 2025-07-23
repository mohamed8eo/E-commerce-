'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2 } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function BrowseCategories() {
  const { t } = useTranslation();
  const [scroll, setScroll] = useState(0);
  const CARD_WIDTH = 220 + 24; // card width + gap
  const CARDS_PER_VIEW = 4;
  const categories = [
    { name: t('phones'), icon: <Smartphone size={40} /> },
    { name: t('computers'), icon: <Monitor size={40} /> },
    { name: t('smartwatch'), icon: <Watch size={40} /> },
    { name: t('camera'), icon: <Camera size={40} /> },
    { name: t('headphones'), icon: <Headphones size={40} /> },
    { name: t('gaming'), icon: <Gamepad2 size={40} /> },
  ];
  const maxScroll = Math.max(categories.length - CARDS_PER_VIEW, 0);

  function slugify(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  const handleScroll = (dir: 'left' | 'right') => {
    setScroll((prev) => {
      if (dir === 'left') return Math.max(prev - 1, 0);
      if (dir === 'right') return Math.min(prev + 1, maxScroll);
      return prev;
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-16 px-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-4 h-8 bg-red-400 rounded-sm inline-block"></span>
        <span className="text-red-500 font-semibold text-lg">{t('categories')}</span>
      </div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold">{t('browse_by_category')}</h2>
        <div className="flex gap-3">
          <button
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleScroll("left")}
            disabled={scroll === 0}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleScroll("right")}
            disabled={scroll === maxScroll}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${scroll * CARD_WIDTH}px)` }}
        >
          {categories.map((cat) => (
            <div
              key={cat.name}
              data-card
              className="flex flex-col items-center justify-center flex-shrink-0 w-[220px] h-44 border border-gray-300 rounded-xl bg-white hover:shadow transition"
            >
              <Link
                href={`/category/${slugify(cat.name)}`}
                className="flex flex-col items-center justify-center w-full h-full"
              >
                {cat.icon}
                <span className="mt-4 text-lg font-medium">{cat.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
