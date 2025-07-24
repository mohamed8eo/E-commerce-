'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { GetAllProductFromDb } from "@/action/product.action";
import { toast } from "sonner";
import { useCart } from "./CartContext";
import Link from "next/link";
import { useWishlist } from "@/components/WishlistContext";
import { useTranslation } from 'react-i18next';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const CARD_WIDTH = 300;
const CARD_GAP = 24;
const CARDS_PER_VIEW = 4;
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

const BestSellingProducts = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [scroll, setScroll] = useState(0);
  const maxScroll = Math.max(products.length - CARDS_PER_VIEW, 0);
  const { addToCart, updateQuantity, getItemQuantity, removeFromCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetching products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetAllProductFromDb();
        if (Array.isArray(res)) {
          setProducts(res);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error on Fetching Data");
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Animation for the best selling products section
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!products.length) return;
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
    if (typeof window === 'undefined') return;
    if (products.length) {
      ScrollTrigger.refresh();
    }
  }, [products]);

  if (!products.length) return null;

  const handleScroll = (dir: "left" | "right") => {
    setScroll((prev) => {
      if (dir === "left") return Math.max(prev - 1, 0);
      if (dir === "right") return Math.min(prev + 1, maxScroll);
      return prev;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto mt-16 px-2"
      style={{ minHeight: !products.length ? 600 : undefined }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-6 bg-red-400 rounded-sm inline-block"></span>
        <span className="text-red-500 font-semibold text-lg">{t('this_month')}</span>
      </div>

      <div className="flex items-center justify-end sm:justify-between  mb-8 flex-wrap gap-4">
        <h2 className="text-4xl font-bold">{t('best_selling_products')}</h2>
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
          className="flex gap-6 transition-transform duration-500 ease-in-out min-w-fit"
          style={{ transform: `translateX(-${scroll * SCROLL_AMOUNT}px)` }}
        >
          {products.map((product) => {
            const quantity = getItemQuantity(product.id);
            return (
              <Link href={`/shop/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl flex flex-col justify-between items-center flex-shrink-0 w-[80vw] sm:w-[40vw] md:w-[300px] h-[420px] relative group transition-all duration-300">
                  
                  {/* Wishlist + View Buttons */}
                  <div className="flex justify-end gap-2 absolute right-4 top-4 z-10">
                    <button
                      className="bg-white rounded-full p-1 shadow hover:scale-105 transition"
                      aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
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
                        <svg width="20" height="20" fill="#ef4444" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" />
                        </svg>
                      )}
                    </button>
                    <button className="bg-white rounded-full p-1 shadow hover:scale-105 transition">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center items-center h-40 mb-4 w-full">
                    {product.image ? (
                      <Image src={product.image} alt={product.name} width={120} height={120} className="object-contain" />
                    ) : (
                      <div className="w-[120px] h-[120px] flex items-center justify-center bg-gray-200 text-gray-400 rounded">No Image</div>
                    )}
                  </div>

                  {/* Product Name */}
                  <div className="text-lg font-semibold mb-2 text-center line-clamp-2">{product.name}</div>

                  {/* Price */}
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-red-500 text-xl font-bold">${product.price}</span>
                    {product.oldPrice && product.oldPrice > product.price && (
                      <span className="text-gray-400 line-through text-lg">${product.oldPrice}</span>
                    )}
                  </div>

                  {/* Ratings */}
                  {product.rating && product.reviews ? (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                        <svg key={i} width="22" height="22" fill="#FACC15" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      {product.rating % 1 !== 0 && (
                        <svg width="22" height="22" fill="#FACC15" viewBox="0 0 24 24">
                          <defs>
                            <linearGradient id={`half${product.id}`}>
                              <stop offset="50%" stopColor="#FACC15" />
                              <stop offset="50%" stopColor="#E5E7EB" />
                            </linearGradient>
                          </defs>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={`url(#half${product.id})`} />
                        </svg>
                      )}
                      <span className="text-gray-400 text-lg ml-2">({product.reviews})</span>
                    </div>
                  ) : null}

                  {/* Cart Buttons */}
                  {quantity > 0 ? (
                    <div className="flex items-center gap-2 w-full mt-2 justify-center">
                      <button className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300 transition" onClick={async () => {
                        if (quantity === 1) {
                          await removeFromCart(product.id);
                        } else {
                          await updateQuantity(product.id, quantity - 1);
                        }
                      }}>-</button>
                      <span className="px-3 font-semibold text-base select-none">{quantity}</span>
                      <button className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300 transition" onClick={async () => {
                        await updateQuantity(product.id, quantity + 1);
                      }}>+</button>
                    </div>
                  ) : (
                    <button className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-400 hover:scale-[1.03] transition-all duration-200 mb-2 mt-2" onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image || undefined,
                      });
                      toast.success(t('added_to_cart'));
                    }}>{t('add_to_cart')}</button>
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

export default BestSellingProducts;
