"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/components/WishlistContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  images?: { url: string }[];
  description?: string;
  tags?: string[];
};

type Props = {
  product: Product;
  images: string[];
  related: Product[];
};

export default function ProductDetailClient({ product, images, related }: Props) {
  const [mainImg, setMainImg] = useState(images[0]);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState("M");
  const { addToCart, getItemQuantity, updateQuantity, removeFromCart } = useCart();
  const quantity = getItemQuantity(product.id);
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-4">
            {images.map((img, idx) => (
              <button key={idx} onClick={() => setMainImg(img)} className={`w-20 h-20 border rounded-lg overflow-hidden ${mainImg === img ? "ring-2 ring-red-500" : ""}`}>
                <Image src={img} alt={product.name} width={80} height={80} className="object-contain w-full h-full" />
              </button>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg min-h-[350px] relative overflow-hidden group">
            <Image
              key={mainImg}
              src={mainImg}
              alt={product.name}
              width={350}
              height={350}
              className="object-contain w-full h-full transition-all duration-500 ease-in-out opacity-0 animate-fadein group-hover:scale-110"
              style={{ animation: "fadein 0.5s forwards" }}
            />
          </div>
        </div>
        {/* Product Info */}
        <div>
          <div className="mb-2 text-sm text-gray-400">Account / Gaming / <span className="text-black">{product.name}</span></div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 text-lg">★ 4.9</span>
            <span className="text-gray-500">(150 Reviews)</span>
            <span className="text-green-600 ml-4">| In Stock</span>
          </div>
          <div className="text-2xl font-bold mb-4">${product.price}</div>
          <p className="text-gray-600 mb-4">{product.description || "No description."}</p>
          {/* Color and Size selectors (static for demo) */}
          <div className="mb-4 flex gap-4 items-center">
            <span className="font-semibold">Colours:</span>
            <button onClick={() => setColor(0)} className={`w-6 h-6 rounded-full border-2 ${color === 0 ? "border-red-500" : "border-gray-300"} bg-red-500`}></button>
            <button onClick={() => setColor(1)} className={`w-6 h-6 rounded-full border-2 ${color === 1 ? "border-gray-800" : "border-gray-300"} bg-gray-800`}></button>
          </div>
          <div className="mb-4 flex gap-4 items-center">
            <span className="font-semibold">Size:</span>
            {["XS", "S", "M", "L", "XL"].map(s => (
              <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 border rounded hover:bg-gray-100 ${size === s ? "bg-black text-white" : ""}`}>{s}</button>
            ))}
          </div>
          {/* Quantity and Buy Now */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
              onClick={async () => {
                if (quantity === 1) {
                  await removeFromCart(product.id);
                } else {
                  await updateQuantity(product.id, quantity - 1);
                }
              }}
              disabled={quantity === 0} 
            >-</Button>
            <span className="px-3 font-semibold text-base select-none">{quantity}</span>
            <button
              className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
              onClick={async () => {
                if (quantity === 0) {
                  await addToCart({ id: product.id, name: product.name, price: product.price, image: product.image || undefined });
                } else {
                  await updateQuantity(product.id, quantity + 1);
                }
              }}
            >+</button>
            <Button
              className="ml-6 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-2 rounded-lg shadow transition"
              onClick={async () => {
                if (quantity === 0) {
                  await addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || undefined,
                  });
                }
                router.push("/cart");
              }}
            >
              Buy Now
            </Button>
          </div>
          {/* Delivery Info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 border rounded-lg p-3">
              <span className="font-bold">🚚 Free Delivery</span>
              <span className="text-gray-500 text-sm">Enter your postal code for Delivery Availability</span>
            </div>
            <div className="flex items-center gap-3 border rounded-lg p-3">
              <span className="font-bold">↩️ Return Delivery</span>
              <span className="text-gray-500 text-sm">Free 30 Days Delivery Returns. Details</span>
            </div>
          </div>
          {/* Wishlist Button */}
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-white rounded-full p-1 shadow"
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={async () => {
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id);
                } else {
                  addToWishlist(product.id);
                }
              }}
            >
              {isInWishlist(product.id) ? (
                <svg width="24" height="24" fill="#ef4444" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" /></svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Related Items */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-6 text-red-500">Related Item</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {related.map((item: Product) => {
            const relQuantity = getItemQuantity(item.id);
            const relImg = (item.images && item.images.length > 0 && item.images[0].url) ? item.images[0].url : item.image;
            return (
              <Link href={`/shop/product/${item.id}`} key={item.id}>
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow flex flex-col items-center hover:shadow-lg transition group h-full min-h-[370px] p-4"
                  style={{ minHeight: 370 }}
                >
                  <div className="w-full flex-1 flex flex-col items-center">
                    {relImg ? (
                      <Image src={relImg} alt={item.name} width={120} height={120} className="object-contain mb-4 rounded h-32 w-32" />
                    ) : (
                      <div className="w-32 h-32 flex items-center justify-center bg-gray-100 text-gray-400 mb-4 rounded">No Image</div>
                    )}
                    <div className="text-base font-semibold text-center mb-2 line-clamp-2">{item.name}</div>
                    <div className="text-blue-600 text-lg font-bold mb-1">${item.price}</div>
                  </div>
                  {relQuantity > 0 ? (
                    <div className="flex items-center gap-2 mt-2 w-full justify-center">
                      <Button
                        className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
                        onClick={async () => {
                          if (relQuantity === 1) {
                            await removeFromCart(item.id);
                          } else {
                            await updateQuantity(item.id, relQuantity - 1);
                          }
                        }}
                      >-</Button>
                      <span className="px-3 font-semibold text-base select-none">{relQuantity}</span>
                      <Button
                        className="bg-gray-200 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
                        onClick={async () => {
                          await updateQuantity(item.id, relQuantity + 1);
                        }}
                      >+</Button>
                    </div>
                  ) : (
                    <Button
                      className="mt-2 w-full bg-black text-white py-1 rounded hover:bg-gray-800 transition"
                      onClick={async () => {
                        await addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: relImg || undefined,
                        });
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
    </div>
  );
} 