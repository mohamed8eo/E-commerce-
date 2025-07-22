"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { addProductToWishlist, removeProductFromWishlist, isProductInWishlist } from "@/action/wishlist.action";
import { toast } from "sonner";
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  tags: string[];
};

export default function ShopClient({ products, allTags }: { products: Product[]; allTags: string[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { addToCart, getItemQuantity, updateQuantity, removeFromCart } = useCart();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const filtered = selectedTag ? products.filter(p => p.tags.includes(selectedTag)) : products;

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      const likedStatus: Record<string, boolean> = {};
      for (const product of products) {
        try {
          likedStatus[product.id] = await isProductInWishlist(product.id);
        } catch {
          likedStatus[product.id] = false;
        }
      }
      setLiked(likedStatus);
    };
    fetchWishlistStatus();
  }, [products]);

  return (
    <div className="min-h-screen bg-[#fafbfc] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
        <div className="mb-8 flex flex-wrap gap-2 items-center">
          <span className="font-semibold mr-2">Filter by tag:</span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`inline-block px-3 py-1 rounded-full text-sm border ${selectedTag === null ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-blue-100"}`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`inline-block px-3 py-1 rounded-full text-sm border ${selectedTag === tag ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map(product => {
            const quantity = getItemQuantity(product.id);
            return (
              <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition group">
                <Link href={`/shop/product/${product.id}`} className="w-full flex-1 flex flex-col items-center">
                  {product.image ? (
                    <Image src={product.image || '/placeholder.png'} alt={product.name} width={128} height={128} className="w-32 h-32 object-contain mb-4 rounded group-hover:scale-105 transition" />
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center bg-gray-100 text-gray-400 mb-4 rounded">No Image</div>
                  )}
                  <div className="text-lg font-semibold text-center mb-2 line-clamp-2">{product.name}</div>
                  <div className="text-blue-600 text-xl font-bold mb-1">${product.price}</div>
                  <div className="text-xs text-gray-400 text-center">{product.tags.join(", ")}</div>
                </Link>
                <div className="flex justify-end gap-2 absolute right-4 top-4">
                  <button
                    className="bg-white rounded-full p-1 shadow"
                    aria-label={liked[product.id] ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (liked[product.id]) {
                        await removeProductFromWishlist(product.id);
                        setLiked((prev) => ({ ...prev, [product.id]: false }));
                        toast("Removed from wishlist");
                      } else {
                        await addProductToWishlist(product.id);
                        setLiked((prev) => ({ ...prev, [product.id]: true }));
                        toast("Added to wishlist");
                      }
                    }}
                  >
                    {liked[product.id] ? (
                      <svg width="20" height="20" fill="#ef4444" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" /></svg>
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" /></svg>
                    )}
                  </button>
                </div>
                {quantity > 0 ? (
                  <div className="flex items-center gap-2 mt-4 w-full justify-center">
                    <button
                      className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
                      onClick={async () => {
                        setLoadingId(product.id);
                        if (quantity === 1) {
                          await removeFromCart(product.id);
                        } else {
                          await updateQuantity(product.id, quantity - 1);
                        }
                        setLoadingId(null);
                      }}
                      disabled={loadingId === product.id}
                    >-</button>
                    <span className="px-3 font-semibold text-base select-none">{quantity}</span>
                    <button
                      className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
                      onClick={async () => {
                        setLoadingId(product.id);
                        await updateQuantity(product.id, quantity + 1);
                        setLoadingId(null);
                      }}
                      disabled={loadingId === product.id}
                    >+</button>
                  </div>
                ) : (
                  <button
                    className="mt-4 w-full bg-gradient-to-r from-black to-gray-800 text-white py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-400 hover:scale-[1.03] transition-all duration-200"
                    onClick={async () => {
                      setLoadingId(product.id);
                      await addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image || undefined,
                      });
                      setLoadingId(null);
                    }}
                    disabled={loadingId === product.id}
                  >
                    {loadingId === product.id ? "Adding..." : "Add to Cart"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
