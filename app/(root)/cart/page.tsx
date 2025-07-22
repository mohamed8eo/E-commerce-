"use client"
import React, { useState } from 'react'
import { useCart } from '../../../components/CartContext'
import Link from 'next/link'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import Image from 'next/image';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setLoading(true);
    // Example billing data (should be collected from user in production)
    const billingData = {
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      phone_number: "+201234567890",
      apartment: "NA",
      floor: "NA",
      street: "NA",
      building: "NA",
      city: "Cairo",
      state: "Cairo",
      country: "EG",
      postal_code: "12345",
    };
    const res = await fetch("/api/paymob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, billingData }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.url) {
      window.location.href = data.url;
    }
  };

  if (cart.length === 0) return <div className="p-8 text-center text-xl">Your cart is empty.</div>;

  return (
    <div className="bg-[#fafbfc] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="text-gray-400 text-sm mb-8">
          Home <span className="mx-1">/</span> <span className="text-black font-semibold">Cart</span>
        </nav>
        <div className="bg-transparent mb-8">
          <Table className="bg-transparent">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="py-4 px-6 font-semibold text-gray-500 bg-transparent">Product</TableHead>
                <TableHead className="py-4 px-6 font-semibold text-gray-500 bg-transparent">Price</TableHead>
                <TableHead className="py-4 px-6 font-semibold text-gray-500 bg-transparent">Quantity</TableHead>
                <TableHead className="py-4 px-6 font-semibold text-gray-500 bg-transparent">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map(item => (
                <TableRow key={item.id} className="bg-white rounded-2xl shadow-sm my-4 align-middle">
                  <TableCell className="py-6 px-6 flex items-center gap-4 border-none relative">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute left-2 top-1 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow hover:scale-110 transition-transform z-10 border-2 border-white"
                      aria-label="Remove from cart"
                    >
                      ✖
                    </button>
                    {item.image && (
                      <Image src={item.image || '/placeholder.png'} alt={item.name} width={60} height={60} className="object-contain rounded" />
                    )}
                    <span className="font-medium text-black ml-2">{item.name}</span>
                  </TableCell>
                  <TableCell className="py-6 px-6 text-black font-medium">${item.price}</TableCell>
                  <TableCell className="py-6 px-6">
                    <select
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, Number(e.target.value))}
                      className="border border-gray-300 rounded px-3 py-2 min-w-[60px] text-center font-medium bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i+1} value={i+1}>{String(i+1).padStart(2, '0')}</option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="py-6 px-6 font-semibold text-black">${item.price * item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-8">
            <Link href="/" className="border border-gray-400 px-6 py-2 rounded font-medium text-black hover:bg-gray-100 transition">Return To Shop</Link>
            <button className="border border-gray-400 px-6 py-2 rounded font-medium text-black hover:bg-gray-100 transition">Update Cart</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="flex-1">
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                className="border border-gray-400 rounded px-4 py-2 flex-1 font-medium focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <button className="bg-[#e74c3c] text-white px-8 py-2 rounded font-semibold hover:bg-[#d62c1a] transition">Apply Coupon</button>
            </div>
          </div>
          <div className="w-full md:w-96 border border-gray-400 rounded-lg p-8 bg-white">
            <h2 className="text-lg font-bold mb-6">Cart Total</h2>
            <div className="flex justify-between mb-4 text-black font-medium">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between mb-4 text-black font-medium">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-6 mt-6 text-black">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <button
              className="w-full bg-[#e74c3c] text-white py-3 rounded font-semibold mt-8 hover:bg-[#d62c1a] transition text-base"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Proceeds to checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage