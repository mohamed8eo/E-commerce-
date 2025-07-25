import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CartProvider } from "../components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";


const Inte_rfont = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exclusive",
  description: "E-commerce website for Hardware Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${Inte_rfont.className}  antialiased`}
        >
      <WishlistProvider>
        <CartProvider>
        <main className="flex-1">{children}</main>
        <Toaster />
      </CartProvider>
    </WishlistProvider>
    </body>
  </html>
</ClerkProvider>
  );
}
