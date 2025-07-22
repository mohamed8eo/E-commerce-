"use client";
import { useEffect, useState } from "react";
import { getWishlistProducts } from "@/action/wishlist.action";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/components/WishlistContext";
import { Button } from "@/components/ui/button";

type WishlistProduct = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  tags: string[];
  createdAt: string;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { removeFromWishlist } = useWishlist();

  // Define fetchWishlist locally so it can be called after removal
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await getWishlistProducts();
      setWishlist(Array.isArray(res) ? res.map(item => ({ ...item, createdAt: String(item.createdAt) })) : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);
 
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {loading ? (
        <div>Loading...</div>
      ) : wishlist.length === 0 ? (
        <div className="text-gray-500">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="relative bg-white rounded-lg shadow p-4 hover:shadow-lg transition flex flex-col min-h-[350px]">
              <Button
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow transition"
                aria-label="Remove from wishlist"
                onClick={async () => {
                  await removeFromWishlist(item.id);
                  await fetchWishlist();
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
              <Link href={`/shop/product/${item.id}`} className="flex-1 flex flex-col">
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={160} height={160} className="object-contain mx-auto mb-4 rounded" />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center bg-gray-100 text-gray-400 mb-4 rounded">No Image</div>
                )}
                <div className="text-lg font-semibold mb-1">{item.name}</div>
                <div className="text-blue-600 font-bold mb-2">${item.price}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags?.map((tag: string) => (
                    <span key={tag} className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
