"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetRandomProducts } from "@/action/product.action";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "./CartContext";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  stock: number;
  image: string | null;
  tags: string[];
  reviews: number;
  rating: number;
}

const FLASH_SALE_END = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

const getTimeLeft = (end: Date) => {
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const FlashSales = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(FLASH_SALE_END));
  const { addToCart, updateQuantity, getItemQuantity, removeFromCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const rowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isArabic = i18n.language === 'ar';

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
  }, [products]);

  useEffect(() => {
    const FetchingProducts = async () => {
      try {
        const res = await GetRandomProducts();
        if (Array.isArray(res)) {
          setProducts(res);
        }
      } catch (error) {
        // Handle error
        console.log(error);
        toast.error('Error on Fetching Products Sales')
      }
    };
    FetchingProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(FLASH_SALE_END));
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const scrollByCard = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const card = rowRef.current.querySelector('div[data-card]');
    if (!card) return;
    const cardWidth = (card as HTMLElement).offsetWidth + 24; // 24px gap
    rowRef.current.scrollBy({
      left: dir === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto mt-16">
      {/* Title and timer */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-6 bg-red-400 rounded-sm inline-block"></span>
            <span className="text-red-500 font-semibold text-lg">{t('todays')}</span>
          </div>
          <h2 className="text-4xl font-bold">{t('flash_sales')}</h2>
        </div>
        <div className="flex items-end flex-col gap-4">
          <div className="flex items-center gap-4">
            {(['days', 'hours', 'minutes', 'seconds'] as const).map((label, idx, arr) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
                  <span className="text-gray-500 text-sm sm:text-base mb-1 capitalize">
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-black leading-none">
                    {String(timeLeft[label]).padStart(2, '0')}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <span className="text-red-300 text-2xl sm:text-3xl font-bold mx-1 sm:mx-2">:</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex gap-3">
            {isArabic ? (
              <>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
                  onClick={() => scrollByCard('right')}
                  aria-label="Scroll right"
                >
                  {/* Right arrow for RTL (Arabic) */}
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
                  onClick={() => scrollByCard('left')}
                  aria-label="Scroll left"
                >
                  {/* Left arrow for RTL (Arabic) */}
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
                  onClick={() => scrollByCard('left')}
                  aria-label="Scroll left"
                >
                  {/* Left arrow for LTR (English) */}
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
                  onClick={() => scrollByCard('right')}
                  aria-label="Scroll right"
                >
                  {/* Right arrow for LTR (English) */}
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Product cards: always a single horizontal row with scroll, with arrow buttons */}
      <div className="relative w-full">
        <div
          ref={rowRef}
          className="flex gap-6 overflow-x-auto w-full scrollbar-hide scroll-smooth px-2"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, idx) => {
            const quantity = getItemQuantity(product.id);
            return (
              <Link href={`/shop/product/${product.id}`} key={idx}>
                <div
                  key={product.id}
                  data-card
                  className="bg-gray-50 rounded-lg p-6 flex flex-col justify-between items-center flex-shrink-0 relative group transition-shadow hover:shadow-xl w-[70vw] md:w-[33vw] lg:w-[23vw] max-w-xs h-[420px]"
                >
                  {/* Discount badge */}
                  {product.discount && product.discount > 0 ? (
                    <span className="absolute left-4 top-4 bg-red-500 text-white text-base font-bold px-4 py-1 rounded-md">-{product.discount}%</span>
                  ) : null}
                  <div className="flex justify-end gap-2 absolute right-4 top-4">
                    <button
                      className="bg-white rounded-full p-1 shadow"
                      aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      onClick={async (e) => {
                        e.preventDefault();
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product.id);
                        }
                      }}
                    >
                      {isInWishlist(product.id) ? (
                        <svg width="20" height="20" fill="#ef4444" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" /></svg>
                      ) : (
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" /></svg>
                      )}
                    </button>
                    <button className="bg-white rounded-full p-1 shadow"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15A7.97 7.97 0 0 0 21 12c0-4.42-3.58-8-8-8S5 7.58 5 12c0 1.07.21 2.09.6 3" /></svg></button>
                  </div>
                  <div className="flex justify-center items-center h-40 mb-4 w-full">
                    {product.image ? (
                      <Image src={product.image} alt={product.name} width={120} height={120} className="object-contain" />
                    ) : (
                      <div className="w-[120px] h-[120px] flex items-center justify-center bg-gray-200 text-gray-400 rounded">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold mb-2 text-center line-clamp-2">{product.name}</div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-red-500 text-xl font-bold">${product.price}</span>
                    {product.oldPrice && product.oldPrice > product.price ? (
                      <span className="text-gray-400 line-through text-lg">${product.oldPrice}</span>
                    ) : null}
                  </div>
                  {/* Rating and reviews */}
                  {product.rating && product.reviews ? (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                        <svg key={i} width="22" height="22" fill="#FACC15" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      ))}
                      {product.rating % 1 !== 0 && (
                        <svg width="22" height="22" fill="#FACC15" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stopColor="#FACC15" /><stop offset="50%" stopColor="#E5E7EB" /></linearGradient></defs><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#half)" /></svg>
                      )}
                      <span className="text-gray-400 text-lg ml-2">({product.reviews})</span>
                    </div>
                  ) : null}
                  {quantity > 0 ? (
                    <div className="flex items-center gap-2 w-full mt-2 justify-center">
                      <button
                        className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
                        onClick={async (e) => {
                          e.preventDefault();
                          if (quantity === 1) {
                            await removeFromCart(product.id);
                          } else {
                            await updateQuantity(product.id, quantity - 1);
                          }
                        }}
                      >-</button>
                      <span className="px-3 font-semibold text-base select-none">{quantity}</span>
                      <button
                        className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
                        onClick={async (e) => {
                          e.preventDefault();
                          await updateQuantity(product.id, quantity + 1);
                        }}
                      >+</button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-400 hover:scale-[1.03] transition-all duration-200 mb-2 mt-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image || undefined,
                        });
                        toast.success(t('added_to_cart'));
                      }}
                    >
                      {t('add_to_cart')}
                    </Button>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashSales; 