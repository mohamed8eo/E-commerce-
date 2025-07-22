"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetRandomProducts } from "@/action/product.action";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "./CartContext";
import { toast } from "sonner";

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

const CARD_WIDTH = 300;
const CARD_GAP = 24; // gap-6 = 1.5rem = 24px
const CARDS_PER_VIEW = 4;
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

const FlashSales = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(FLASH_SALE_END));
  const [scroll, setScroll] = useState(0);
  const { addToCart, updateQuantity, getItemQuantity, removeFromCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

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

  const maxScroll = Math.max(products.length - CARDS_PER_VIEW, 0);

  const handleScroll = (dir: "left" | "right") => {
    setScroll((prev) => {
      if (dir === "left") return Math.max(prev - 1, 0);
      if (dir === "right") return Math.min(prev + 1, maxScroll);
      return prev;
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-16">
      {/* Title and timer */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-6 bg-red-400 rounded-sm inline-block"></span>
            <span className="text-red-500 font-semibold text-lg">Today&apos;s</span>
          </div>
          <h2 className="text-4xl font-bold">Flash Sales</h2>
        </div>
        <div className="flex items-center gap-4">
          {(['days', 'hours', 'minutes', 'seconds'] as const).map((label, idx, arr) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center min-w-[70px]">
                <span className="text-gray-500 text-base mb-1 capitalize">{label.charAt(0).toUpperCase() + label.slice(1)}</span>
                <span className="text-3xl font-bold text-black">{String(timeLeft[label]).padStart(2, '0')}</span>
              </div>
              {idx < arr.length - 1 && (
                <span className="text-red-300 text-3xl font-bold mx-1">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Product cards */}
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
          onClick={() => handleScroll("left")}
          disabled={scroll === 0}
        >
          <span className="sr-only">Scroll left</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="w-[1248px] overflow-hidden mx-auto">
          <div className="flex gap-6 min-w-fit" style={{ transform: `translateX(-${scroll * SCROLL_AMOUNT}px)`, transition: 'transform 0.5s' }}>
            {products.map((product, idx) => {
              const quantity = getItemQuantity(product.id);
              return (
                <Link href={`/shop/product/${product.id}`} key={idx}>
                  <div key={product.id} className="bg-gray-50 rounded-lg p-6 w-[300px] h-[420px] flex flex-col justify-between items-center flex-shrink-0 relative group">
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
                          onClick={async () => {
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
                          onClick={async () => {
                            await updateQuantity(product.id, quantity + 1);
                          }}
                        >+</button>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-400 hover:scale-[1.03] transition-all duration-200 mb-2 mt-auto"
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image || undefined,
                          });
                          toast.success("Added to cart!");
                        }}
                      >
                        Add To Cart
                      </Button>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
          onClick={() => handleScroll("right")}
          disabled={scroll === maxScroll}
        >
          <span className="sr-only">Scroll right</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      {/* <div className="flex justify-center mt-10">
        <Link href="/products" className="bg-red-500 text-white px-10 py-3 rounded font-semibold text-lg hover:bg-red-600 transition">View All Products</Link>
      </div> */}
    </section>
  );
};

export default FlashSales; 