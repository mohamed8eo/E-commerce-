"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AddProductToCart, GetCartProducts, RemoveProductFromCart, UpdateProductQuantityInCart } from "@/action/product.action";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  tags?: string[];
  subtotal?: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  getItemQuantity: (id: string) => number;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch cart from DB on mount
  useEffect(() => {
    refreshCart();
  }, []);

  const refreshCart = async () => {
    const products = await GetCartProducts();
    setCart(products.map(p => ({ ...p, image: (p.image ?? undefined) as string | undefined })));
  };

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    await AddProductToCart(item.id);
    // Fire-and-forget refresh
    refreshCart();
  };

  const removeFromCart = async (id: string) => {
    await RemoveProductFromCart(id);
    await refreshCart();
  };

  const updateQuantity = async (id: string, quantity: number) => {
    // Optimistically update UI
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
    // Then sync with server
    await UpdateProductQuantityInCart(id, quantity);
    // Fire-and-forget refresh
    refreshCart();
  };

  const getItemQuantity = (id: string) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getItemQuantity, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}; 