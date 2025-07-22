"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { addProductToWishlist, removeProductFromWishlist, getWishlistProducts } from "@/action/wishlist.action";
import { toast } from "sonner";

export type WishlistProduct = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  tags: string[];
  createdAt: string;
};

type WishlistContextType = {
  wishlist: WishlistProduct[];
  count: number;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  refreshWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    refreshWishlist();
  }, []);

  const refreshWishlist = async () => {
    const res = await getWishlistProducts();
    const list = Array.isArray(res)
      ? res.map(item => ({ ...item, createdAt: String(item.createdAt) }))
      : [];
    setWishlist(list);
    setCount(list.length);
  };

  const addToWishlist = async (id: string) => {
    if (wishlist.some(item => item.id === id)) return;
    // Optimistic update
    setWishlist(prev => [...prev, { id, name: "", price: 0, image: null, tags: [], createdAt: new Date().toISOString() }]);
    setCount(prev => prev + 1);
    try {
      await addProductToWishlist(id);
      toast.success("Added to wishlist");
      refreshWishlist();
    } catch {
      setWishlist(prev => prev.filter(item => item.id !== id));
      setCount(prev => Math.max(prev - 1, 0));
      toast.error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (id: string) => {
    // Optimistic update
    setWishlist(prev => prev.filter(item => item.id !== id));
    setCount(prev => Math.max(prev - 1, 0));
    try {
      await removeProductFromWishlist(id);
      toast.success("Removed from wishlist");
      refreshWishlist();
    } catch {
      // Revert if failed
      refreshWishlist();
      toast.error("Failed to remove from wishlist");
    }
  };

  const isInWishlist = (id: string) => wishlist.some(item => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, count, addToWishlist, removeFromWishlist, isInWishlist, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
} 