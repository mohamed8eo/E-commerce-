"use client";
import '../i18n';
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const banners = [
  {
    logo: "/1200px-Apple_gray_logo 1.png",
    logoAlt: "Apple logo",
    title: "iPhone 14 Series",
    subtitle: "Up to 10%<br />off Voucher",
    link: "/shop",
    linkText: "Shop Now",
    image: "/hero_endframe__cvklg0xk3w6e_large 2.png",
    imageAlt: "iPhone 14",
  },
  {
    logo: "/download.png",
    logoAlt: "Asus logo",
    title: "Asus Monitor",
    subtitle: "Save up to $200<br />on select models",
    link: "/shop",
    linkText: "Shop Now",
    image: "/Frame 613.png",
    imageAlt: "iPhone 13",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (idx: number) => setCurrent(idx);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] bg-black rounded-lg overflow-hidden mx-auto">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className="min-w-full flex flex-col-reverse sm:flex-row items-center justify-between px-6 sm:px-12 md:px-16 py-8 h-full relative"
          >
            <div className="z-10 text-white w-full sm:w-1/2 max-w-xl text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-6">
                <Image src={banner.logo} alt={banner.logoAlt} width={40} height={40} className="mr-3" />
                <span className="font-semibold text-xl sm:text-2xl tracking-wide">{t(banner.title)}</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-bold mb-6 leading-tight text-white/90"
                dangerouslySetInnerHTML={{ __html: t(banner.subtitle) }}
              />
              <Link
                href={banner.link}
                className="inline-block text-sm sm:text-base font-medium underline underline-offset-4 hover:text-red-400 transition"
              >
                {t(banner.linkText)} <span className="ml-1">&rarr;</span>
              </Link>
            </div>
            <div className="relative w-full sm:w-1/2 flex justify-center items-center">
              <Image
                src={banner.image}
                alt={banner.imageAlt}
                width={420}
                height={420}
                className="h-56 sm:h-64 md:h-80 lg:h-96 object-contain drop-shadow-[0_5px_15px_rgba(255,255,255,0.1)] transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors duration-200 ${current === idx ? 'bg-red-500' : 'bg-gray-400'}`}
            aria-label={`Go to banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

// Music Experience Section

const MusicExperienceSection = () => {
  const END_TIME = useMemo(() => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 35 * 1000), []);
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const getTimeLeft = useCallback(() => {
    const now = new Date();
    const diff = END_TIME.getTime() - now.getTime();
    if (diff <= 0) return { hours: 0, days: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { hours, days, minutes, seconds };
  }, [END_TIME]);

  const [timer, setTimer] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [getTimeLeft]);
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
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex justify-center items-center py-12" style={{ minHeight: 400 }}>
      <div className="w-full max-w-6xl bg-black rounded-2xl flex flex-col md:flex-row items-center overflow-hidden shadow-xl relative">
        <div className="flex-1 px-8 sm:px-10 py-12 flex flex-col justify-center z-10">
          <span className="text-green-400 font-bold text-base sm:text-lg mb-4">{t('categories')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            {t('enhance_music')}
          </h2>
          <div className="flex flex-wrap gap-4 mb-8 justify-center sm:justify-start">
            {['days', 'hours', 'minutes', 'seconds'].map((label) => (
              <div key={label} className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
                <span className="bg-white text-black font-bold text-2xl sm:text-3xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full mb-1 leading-none">
                  {String(timer[label as keyof typeof timer]).padStart(2, '0')}
                </span>
                <span className="text-white text-sm sm:text-base capitalize">
                  {t(label)}
                </span>
              </div>
            ))}
          </div>
          <Link href="/shop">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold text-base sm:text-lg px-10 sm:px-16 py-3 sm:py-4 rounded-lg shadow transition">
              {t('buy_now')}
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center items-center p-8 relative z-10">
          <div className="absolute inset-0 flex justify-center items-center z-0">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br from-gray-700/60 to-black blur-2xl"></div>
          </div>
          <Image
            src="/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png"
            alt="JBL Boombox"
            width={400}
            height={300}
            className="max-w-[300px] sm:max-w-xs md:max-w-md w-full h-auto object-contain relative z-10 drop-shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </section>
  );
};

export { MusicExperienceSection };
