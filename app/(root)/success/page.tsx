"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartContext";
import { CreateOrderFromCart, ClearCart } from "@/action/product.action";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const { refreshCart } = useCart();
  const router = useRouter();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Create order in DB, then clear cart and redirect
    CreateOrderFromCart().then(() => {
      ClearCart().then(() => refreshCart());
      const timeout = setTimeout(() => {
        setShow(false);
        router.push("/");
      }, 2500);
      return () => clearTimeout(timeout);
    });
  }, [refreshCart, router]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40" />
      {/* Centered message */}
      <div className="relative z-50 bg-white rounded-xl shadow-lg px-8 py-10 flex flex-col items-center">
        <div className="text-green-500 text-5xl mb-4">✔</div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-lg">Thank you for your purchase.</p>
      </div>
    </div>
  );
} 