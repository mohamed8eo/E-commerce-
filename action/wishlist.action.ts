"use server";
import prisma from '@/lib/prisma';
import { getDbUserId } from "./user.action";

// Add a product to the current user's wishlist
export async function addProductToWishlist(productId: string) {
  const userId = await getDbUserId();
  if (!userId) throw new Error("User not found");
  // Find or create wishlist for user
  let wishlist = await prisma.wishlist.findUnique({ where: { userId }, include: { items: true } });
  if (!wishlist) {
    wishlist = await prisma.wishlist.create({ data: { userId }, include: { items: true } });
  }
  // Check if product already in wishlist
  const existingItem = await prisma.wishlistItem.findFirst({ where: { wishlistId: wishlist.id, productId } });
  if (existingItem) {
    return { success: true, message: "Already in wishlist" };
  }
  await prisma.wishlistItem.create({ data: { wishlistId: wishlist.id, productId } });
  return { success: true };
}

// Remove a product from the current user's wishlist
export async function removeProductFromWishlist(productId: string) {
  const userId = await getDbUserId();
  if (!userId) throw new Error("User not found");
  const wishlist = await prisma.wishlist.findUnique({ where: { userId } });
  if (!wishlist) return { success: false, message: "Wishlist not found" };
  await prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id, productId } });
  return { success: true };
}

// Get all products in the current user's wishlist
export async function getWishlistProducts() {
  const userId = await getDbUserId();
  if (!userId) throw new Error("User not found");
  const wishlist = await prisma.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
              tags: { include: { tag: true } },
            },
          },
        },
      },
    },
  });
  if (!wishlist || !wishlist.items) return [];
  return wishlist.items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    image: item.product.images[0]?.url || null,
    tags: item.product.tags.map(t => t.tag.name),
    createdAt: item.createdAt,
  }));
}

// Check if a product is in the current user's wishlist
export async function isProductInWishlist(productId: string) {
  const userId = await getDbUserId();
  if (!userId) throw new Error("User not found");
  const wishlist = await prisma.wishlist.findUnique({ where: { userId } });
  if (!wishlist) return false;
  const item = await prisma.wishlistItem.findFirst({ where: { wishlistId: wishlist.id, productId } });
  return !!item;
}  