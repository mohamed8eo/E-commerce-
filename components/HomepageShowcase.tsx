"use client"
import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomepageShowcase() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cards = [
    {
      title: t('playstation5'),
      desc: t('ps5_desc'),
      img: '/ps5-slim-goedkope-playstation_large 1.png',
      large: true,
    },
    {
      title: t('gaming_accessories'),
      desc: t('gaming_accessories_desc'),
      img: '/woman-with-hat.png',
    },
    {
      title: t('smart_speakers'),
      desc: t('smart_speakers_desc'),
      img: '/Frame 707.png',
    },
    {
      title: t('premium_perfume'),
      desc: t('premium_perfume_desc'),
      img: '/Frame 7063.png',
    },
  ];


  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen bg-white flex flex-col items-center py-10 px-2" style={{ minHeight: 400 }}>
      <main className="w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <span className="bg-red-500 text-white text-sm font-bold px-4 py-1 rounded-md inline-block mb-2">
            {t('featured')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-2">
            {t('new_arrival')}
          </h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Large Left Card: PlayStation 5 */}
          <div className="relative md:col-span-2 bg-black rounded-xl overflow-hidden min-h-[400px] flex flex-col justify-end p-0">
            <Image
              src={cards[0].img}
              alt={cards[0].title}
              fill
              quality={90}
              style={{objectFit:'cover'}}
              className="absolute inset-0 z-0"
            />
            <div className="relative z-10 text-white p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {cards[0].title}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4">
                {cards[0].desc}
              </p>
              <Link
                href="/shop"
                className="inline-block underline text-white text-base font-semibold mt-2"
              >
                {t('shop_now')}
              </Link>
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="flex flex-col gap-8">
            {/* Top Right Card: Gaming Accessories */}
            <div className="relative bg-black rounded-xl overflow-hidden min-h-[190px] flex flex-col justify-end p-0">
              <Image
                src={cards[1].img}
                alt={cards[1].title}
                fill
                quality={90}
                style={{objectFit:'cover'}}
                className="absolute inset-0 z-0"
              />
              <div className="relative z-10 text-white p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  {cards[1].title}
                </h2>
                <p className="text-sm text-gray-300 mb-4">
                  {cards[1].desc}
                </p>
                <Link
                  href="/shop"
                  className="inline-block underline text-white text-base font-semibold mt-2"
                >
                  {t('shop_now')}
                </Link>
              </div>
            </div>
            {/* Bottom Right Two Cards (Smart Speakers & Premium Headsets) */}
            <div className="grid grid-cols-2 gap-8">
              {/* Smart Speakers Card */}
              <div className="relative bg-black rounded-xl overflow-hidden min-h-[190px] flex flex-col justify-end p-0">
                <Image
                  src={cards[2].img}
                  alt={cards[2].title}
                  fill
                  quality={90}
                  style={{objectFit:'cover'}}
                  className="absolute inset-0 z-0"
                />
                <div className="relative z-10 text-white p-8">
                  <h2 className="text-xl font-bold mb-2">{cards[2].title}</h2>
                  <p className="text-sm text-gray-300 mb-4">
                    {cards[2].desc}
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block underline text-white text-base font-semibold mt-2"
                  >
                    {t('shop_now')}
                  </Link>
                </div>
              </div>
              {/* Premium Headsets Card */}
              <div className="relative bg-black rounded-xl overflow-hidden min-h-[190px] flex flex-col justify-end p-0">
                <Image
                  src={cards[3].img}
                  alt={cards[3].title}
                  fill
                  quality={90}
                  style={{objectFit:'cover'}}
                  className="absolute inset-0 z-0"
                />
                <div className="relative z-10 text-white p-8">
                  <h2 className="text-xl font-bold mb-2">{cards[3].title}</h2>
                  <p className="text-sm text-gray-300 mb-4">
                    {cards[3].desc}
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block underline text-white text-base font-semibold mt-2"
                  >
                    {t('shop_now')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}