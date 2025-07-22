"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { GetAllProductFromDb } from "@/action/product.action";
import { useCart } from "./CartContext";
import { toast } from "sonner";
import Link from "next/link";
import { useWishlist } from "@/components/WishlistContext";

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

const COLUMNS = 4;
const ROWS = 2;
const PRODUCTS_PER_PAGE = COLUMNS * ROWS;
const MAX_PRODUCTS = 16;

const ExploreProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(Math.min(products.length, MAX_PRODUCTS) / PRODUCTS_PER_PAGE);
  const { addToCart, updateQuantity, getItemQuantity, removeFromCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetAllProductFromDb();
        if (Array.isArray(res)) {
          setProducts(res.slice(0, MAX_PRODUCTS));
        }
      } catch (error) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleScroll = (dir: "left" | "right") => {
    setPage((prev) => {
      if (dir === "left") return Math.max(prev - 1, 0);
      if (dir === "right") return Math.min(prev + 1, totalPages - 1);
      return prev;
    });
  };

  if (!products.length) return null;

  const startIdx = page * PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-8 bg-red-400 rounded-md flex items-center justify-center">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><rect x="7" y="11" width="10" height="2" rx="1" fill="#ef4444"/></svg>
          </span>
          <span className="text-red-500 font-semibold text-lg">Our Products</span>
        </div>
        <div className="flex items-center justify-between mb-8">
      <h2 className="text-4xl font-bold">Explore Our Products</h2>
      <div className="flex gap-3">
          <button
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
            onClick={() => handleScroll("left")}
            disabled={page === 0}
          >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
          <button
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
            onClick={() => handleScroll("right")}
            disabled={page === totalPages - 1}
          >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
        </div>
        
        {/* Product Grid with Arrows */}
        <div className="relative flex items-center justify-center">
          <div className="grid grid-cols-4 grid-rows-2 gap-8 w-full max-w-7xl mx-auto">
            {visibleProducts.map((product, idx) => {
              const quantity = getItemQuantity(product.id);
              return (
                <Link href={`/shop/product/${product.id}`} key={product.id}> 
                  <div
                    key={product.id}
                    className="bg-gray-50 rounded-lg p-6 w-[300px] h-[420px] flex flex-col justify-between items-center flex-shrink-0 relative group shadow"
                  >
                  <div className="flex justify-end gap-2 absolute right-4 top-4">
                    <button
                      className="bg-white rounded-full p-1 shadow"
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
                        <svg
                          width="20"
                          height="20"
                          fill="#ef4444"
                          stroke="#ef4444"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z"
                          />
                        </svg>
                      )}
                    </button>
                    <button className="bg-white rounded-full p-1 shadow"><Eye className="w-5 h-5" /></button>
                  </div>
                  <div className="flex justify-center items-center h-40 mb-4 w-full">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-[120px] h-[120px] flex items-center justify-center bg-gray-200 text-gray-400 rounded">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold mb-2 text-center line-clamp-2">
                    {product.name}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-red-500 text-xl font-bold">
                      ${product.price}
                    </span>
                    {product.oldPrice && product.oldPrice > product.price ? (
                      <span className="text-gray-400 line-through text-lg">
                        ${product.oldPrice}
                      </span>
                    ) : null}
                  </div>
                  {/* Rating and reviews */}
                  {product.rating && product.reviews ? (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                        <svg
                          key={i}
                          width="22"
                          height="22"
                          fill="#FACC15"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      {product.rating % 1 !== 0 && (
                        <svg width="22" height="22" fill="#FACC15" viewBox="0 0 24 24">
                          <defs>
                            <linearGradient id={`half${product.id}`}><stop offset="50%" stopColor="#FACC15" /><stop offset="50%" stopColor="#E5E7EB" /></linearGradient>
                          </defs>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={`url(#half${product.id})`} />
                        </svg>
                      )}
                      <span className="text-gray-400 text-lg ml-2">
                        ({product.reviews})
                      </span>
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
                      <button
                        className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-400 hover:scale-[1.03] transition-all duration-200 mb-2 mt-2"
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
                      </button>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* View All Products Button */}
        <div className="flex justify-center mt-10">
          <Link href="/shop">
            <button className="bg-red-500 text-white px-10 py-3 font-semibold text-lg hover:bg-red-600 transition rounded-[10px]">View All Products</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreProductsSection; 