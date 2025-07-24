"use client";
import '../../../i18n';
import { useTranslation } from 'react-i18next';
import Link from "next/link"
import Image from 'next/image'
import BreadcrumbWithCustomSeparator from '@/components/BreadcrumbWithCustomSeparator';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Card = {
  img: string;
  alt: string;
  value: string;
  label: string;
  highlight: boolean;
};

const cards: Card[] = [
  {
    img: '/Services.png',
    alt: 'Sellers',
    value: '10.5k',
    label: 'sellers_active',
    highlight: false,
  },
  {
    img: '/Services2.png',
    alt: 'Monthly Product Sale',
    value: '33k',
    label: 'monthly_product_sale',
    highlight: true,
  },
  {
    img: '/Services3.png',
    alt: 'Customer Active',
    value: '45.5k',
    label: 'customer_active',
    highlight: false,
  },
  {
    img: '/Services4.png',
    alt: 'Annual Gross Sale',
    value: '25k',
    label: 'annual_gross_sale',
    highlight: false,
  },
];

type TeamMember = {
  name: string;
  title: string;
  img: string;
  socials: { icon: string; url: string }[];
};

const team: TeamMember[] = [
  {
    name: "Tom Cruise",
    title: "Founder & Chairman",
    img: "/Frame 874.png",
    socials: [
      { icon: "twitter", url: "#" },
      { icon: "instagram", url: "#" },
      { icon: "linkedin", url: "#" },
    ],
  },
  {
    name: "Emma Watson",
    title: "Managing Director",
    img: "/Frame 875.png",
    socials: [
      { icon: "twitter", url: "#" },
      { icon: "instagram", url: "#" },
      { icon: "linkedin", url: "#" },
    ],
  },
  {
    name: "Will Smith",
    title: "Product Designer",
    img: "/Frame 876.png",
    socials: [
      { icon: "twitter", url: "#" },
      { icon: "instagram", url: "#" },
      { icon: "linkedin", url: "#" },
    ],
  },
];

type Service = {
  img: string;
  title: string;
  desc: string;
  highlight: boolean;
};

const services: Service[] = [
  {
    img: "/1Services.png",
    title: "money_back_guarantee",
    desc: "money_back_text",
    highlight: true,
  },
  {
    img: "/2Services.png",
    title: "customer_service",
    desc: "customer_service_text",
    highlight: false,
  },
  {
    img: "/3Services.png",
    title: "free_fast_delivery",
    desc: "free_fast_delivery_text",
    highlight: true,
  },
];


export default function AboutPage() {
  const { t } = useTranslation();
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const sections = [
      { ref: introRef, delay: 0 },
      { ref: cardsRef, delay: 0.1 },
      { ref: teamRef, delay: 0.2 },
      { ref: servicesRef, delay: 0.3 },
    ];
    sections.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <>
      <div className="mt-9 ml-4 sm:ml-8">
        <BreadcrumbWithCustomSeparator />
      </div>
      <div
        ref={introRef}
        style={{ opacity: 0, transform: 'translateY(50px)' }}
        className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between pt-8 sm:pt-16 lg:pt-[135px] px-4 sm:pl-8 lg:px-[80px] gap-8 lg:gap-16"
      >
        {/* image */}
        <Image
          src="/About.png"
          alt="About Section"
          width={400}
          height={400}
          className="w-full max-w-[350px] sm:max-w-[500px] lg:max-w-[705px] h-auto"
        />
        {/* content */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 w-full max-w-xl lg:w-[525px]">
          <h1 className="text-3xl sm:text-4xl lg:text-[54px] leading-tight lg:leading-[64px] font-semibold tracking-[0.06em]">
            {t('ourStory')}
          </h1>
          <div className="text-base sm:text-lg leading-relaxed flex flex-col gap-4 sm:gap-6">
            <p>
              {t('launchedIn2015')}
            </p>
            <p>
              {t('exclusiveHasMoreThan')}
            </p>
          </div>
        </div>
      </div>
      <div
        ref={cardsRef}
        style={{ opacity: 0, transform: 'translateY(50px)' }}
        className="w-full max-w-6xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map((card: Card, idx: number) => (
          <div
            key={idx}
            className={
              card.highlight
                ? "bg-[#e74c3c] border border-[#e74c3c] rounded-lg flex flex-col items-center py-10 px-4 shadow-md transition text-white transform duration-300 hover:scale-105 hover:shadow-2xl"
                : "bg-white border rounded-lg flex flex-col items-center py-10 px-4 shadow-sm transition transform duration-300 hover:scale-105 hover:shadow-2xl"
            }
          >
            <div className={card.highlight ? "flex items-center justify-center w-20 h-20 rounded-full bg-red-200 mb-6" : "flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-6"}>
              <div className={card.highlight ? "flex items-center justify-center w-16 h-16 rounded-full bg-white" : "flex items-center justify-center w-16 h-16 rounded-full bg-black"}>
                <Image src={card.img} alt={card.alt} width={50} height={50} className="object-contain mx-auto" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{card.value}</div>
            <div className={card.highlight ? "text-lg text-center text-white" : "text-lg text-center"}>{t(card.label)}</div>
          </div>
        ))}
      </div>
      {/* Team Section */}
      <div
        ref={teamRef}
        style={{ opacity: 0, transform: 'translateY(50px)' }}
        className="max-w-6xl mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {team.map((member: TeamMember, idx: number) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-lg p-6 shadow">
            <Image
              src={member.img}
              alt={member.name}
              width={220}
              height={220}
              className="rounded-lg object-cover mb-4"
            />
            <div className="text-2xl font-bold">{member.name}</div>
            <div className="text-gray-600 mb-2">{t(member.title)}</div>
            <div className="flex gap-4 mt-2">
              {/* Placeholder SVGs for social icons */}
              {member.socials.map((s, i) => (
                <Link key={i} href={s.url} className="text-gray-500 hover:text-black">
                  {s.icon === "twitter" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.813 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" /></svg>
                  )}
                  {s.icon === "instagram" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32 1.28.059 1.689.072 7.191.072s5.911-.013 7.191-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191s-.013-5.911-.072-7.191c-.059-1.277-.353-2.45-1.32-3.417C19.45.425 18.277.131 17 .072 15.721.013 15.312 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
                  )}
                  {s.icon === "linkedin" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" /></svg>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Services Section */}
      <div
        ref={servicesRef}
        style={{ opacity: 0, transform: 'translateY(50px)' }}
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 py-12"
      >
        {services.map((s: Service, i: number) => (
          <div
            key={i}
            className={`flex flex-col items-center border rounded-lg p-6 bg-white ${
              s.highlight ? "border-purple-400" : "border-gray-200"
            }`}
          >
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-full bg-black mb-4 ${
                s.highlight ? "border-2 border-purple-400" : ""
              }`}
            >
              <Image src={s.img} alt={t(s.title)} width={40} height={40} />
            </div>
            <div className="font-bold text-center">{t(s.title)}</div>
            <div className="text-sm text-gray-500 text-center mt-1">{t(s.desc)}</div>
          </div>
        ))}
      </div>
    </>
  )
} 