"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";


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
    logo: "/1200px-Apple_gray_logo 1.png",
    logoAlt: "Apple logo",
    title: "iPhone 13 Series",
    subtitle: "Save up to $200<br />on select models",
    link: "/shop",
    linkText: "Shop Now",
    image: "/Frame 613.png",
    imageAlt: "iPhone 13",
  },
  // Add more banners as needed
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-advance logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (idx: number) => setCurrent(idx);

  return (
    <div className="relative w-full max-w-5xl h-[420px] bg-black rounded-lg overflow-hidden mx-auto">
      {/* Sliding banners */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className="min-w-full flex items-center px-16 h-full relative"
          >
            <div className="z-10 text-white max-w-xl">
              <div className="flex items-center mb-6">
                <Image src={banner.logo} alt={banner.logoAlt} width={40} height={40} className="mr-3" />
                <span className="font-semibold text-2xl">{banner.title}</span>
              </div>
              <h2 className="text-6xl font-bold mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: banner.subtitle }} />
              <Link href={banner.link} className="inline-block mt-2 text-[16px] leading-[24px] font-medium underline underline-offset-4">{banner.linkText} <span className="ml-1">&rarr;</span></Link>
            </div>
            <Image
              src={banner.image}
              alt={banner.imageAlt}
              width={420}
              height={420}
              className="absolute right-10 bottom-0 h-72 object-contain drop-shadow-2xl z-0"
            />
          </div>
        ))}
      </div>
      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-4 h-4 rounded-full inline-block transition-colors duration-200 ${current === idx ? 'bg-red-500' : 'bg-gray-400'}`}
            aria-label={`Go to banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

// ... existing code ...
const MusicExperienceSection = () => {
  // Set the end time for the countdown (e.g., 5 days from now)
  const END_TIME = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 35 * 1000);
  const getTimeLeft = () => {
    const now = new Date();
    const diff = END_TIME.getTime() - now.getTime();
    if (diff <= 0) return { hours: 0, days: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { hours, days, minutes, seconds };
  };
  const [timer, setTimer] = useState(getTimeLeft());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full flex justify-center items-center py-12">
      <div className="w-full max-w-6xl bg-black rounded-2xl flex flex-col md:flex-row items-center overflow-hidden shadow-xl relative">
        {/* Left Side */}
        <div className="flex-1 px-10 py-12 flex flex-col justify-center z-10">
          <span className="text-green-400 font-bold text-lg mb-4">Categories</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            Enhance Your<br />Music Experience
          </h2>
          <div className="flex gap-4 mb-8">
            <div className="flex flex-col items-center">
              <span className="bg-white text-black font-bold text-xl w-20 h-20 flex items-center justify-center rounded-full mb-1">{String(timer.hours).padStart(2, '0')}</span>
              <span className="text-white text-sm">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-white text-black font-bold text-xl w-20 h-20 flex items-center justify-center rounded-full mb-1">{String(timer.days).padStart(2, '0')}</span>
              <span className="text-white text-sm">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-white text-black font-bold text-xl w-20 h-20 flex items-center justify-center rounded-full mb-1">{String(timer.minutes).padStart(2, '0')}</span>
              <span className="text-white text-sm">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-white text-black font-bold text-xl w-20 h-20 flex items-center justify-center rounded-full mb-1">{String(timer.seconds).padStart(2, '0')}</span>
              <span className="text-white text-sm">Seconds</span>
            </div>
          </div>
          <Link href="/shop">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-16 py-4 rounded-lg shadow transition">Buy Now!</button>
          </Link>
        </div>
        {/* Right Side with blur */}
        <div className="flex-1 flex justify-center items-center p-8 relative z-10">
          <div className="absolute inset-0 flex justify-center items-center z-0">
            <div className="w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br from-gray-700/60 to-black blur-2xl"></div>
          </div>
          <img src="/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png" alt="JBL Boombox" className="max-w-xs md:max-w-md w-full h-auto object-contain relative z-10" />
        </div>
      </div>
    </section>
  );
};
// ... existing code ...

// Export for use in page
export { MusicExperienceSection }; 