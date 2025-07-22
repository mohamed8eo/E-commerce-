"use server";
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';
import { getDbUserId } from "./user.action";

interface ProductWithImagesAndTags {
  id: string;
  name: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  oldPrice: number;
  discount: number;
  images: { url: string }[];
  tags: { tag: { name: string } }[];
}

export async function GetAllProductFromDb() {
  const cacheKey = 'all_products';
  // Try to get from Redis cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // If cache is corrupted, ignore and fetch from DB
    }
  }

  // Fetch from DB
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      rating: true,
      reviews: true,
      oldPrice: true,
      discount: true,
      images: {
        take: 1,
        select: { url: true }
      },
      tags: {
        select: {
          tag: { select: { name: true } }
        }
      }
    }
  });

  const transformedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
    reviews: product.reviews,
    image: product.images[0]?.url || null,
    tags: product.tags.map(t => t.tag.name),
    oldPrice: product.oldPrice,
    discount: product.discount,
  }));

  // Cache result
  await redis.set(cacheKey, JSON.stringify(transformedProducts), { EX: 60 * 60 }); // 1 hour

  return transformedProducts;
}
export async function GetAllProductFromDbImages() {
  const cacheKey = 'all_products_images';
  // Try to get from Redis cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // If cache is corrupted, ignore and fetch from DB
    }
  }

  // Fetch from DB
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      rating: true,
      reviews: true,
      oldPrice: true,
      discount: true,
      images: {
        select: { url: true }
      },
      tags: {
        select: {
          tag: { select: { name: true } }
        }
      }
    }
  });

  const transformedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
    reviews: product.reviews,
    images: product.images,
    tags: product.tags.map(t => t.tag.name),
    oldPrice: product.oldPrice,
    discount: product.discount,
  }));

  // Cache result
  await redis.set(cacheKey, JSON.stringify(transformedProducts), { EX: 60 * 60 }); // 1 hour

  return transformedProducts;
}

export async function GetRandomProducts() {
  const cacheKey = 'random_products_5_on_sale';
  const cached = await redis.get(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // If cache is corrupted, ignore and fetch from DB
    }
  }

  // Fetch products that have a discount (on sale)
  const products = await prisma.product.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      rating: true,
      reviews: true,
      oldPrice: true,
      discount: true,
      images: {
        take: 1,
        select: { url: true }
      },
      tags: {
        select: {
          tag: { select: { name: true } }
        }
      }
    }
  }) as ProductWithImagesAndTags[];

  // Shuffle and take 5
  const shuffled = products.sort(() => 0.5 - Math.random()).slice(0, 5);

  const transformed = shuffled.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
    reviews: product.reviews,
    image: product.images[0]?.url || null,
    tags: product.tags.map((t) => t.tag.name),
    oldPrice: product.oldPrice,
    discount: product.discount,
  }));

  await redis.set(cacheKey, JSON.stringify(transformed), { EX: 60 * 60 * 24 * 2 }); // 2 days
  return transformed;
}

export async function AddProductToCart(productId: string) {
  const userId = await getDbUserId();
  if (!userId) {
    throw new Error("User not found");
  }
  // Find or create cart for user
  let cart = await prisma.cart.findUnique({ where: { userId }, include: { items: true } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId }, include: { items: true } });
  }
  // Check if product already in cart
  const existingItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
  if (existingItem) {
    await prisma.cartItem.update({ where: { id: existingItem.id }, data: { quantity: existingItem.quantity + 1 } });
  } else {
    await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity: 1 } });
  }
  return { success: true };
}

export async function RemoveProductFromCart(productId: string) {
  const userId = await getDbUserId();
  if (!userId) {
    throw new Error("User not found");
  }
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return { success: false, message: "Cart not found" };
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });
  return { success: true };
}

export async function ClearCart() {
  const userId = await getDbUserId();
  if (!userId) {
    throw new Error("User not found");
  }
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return { success: false, message: "Cart not found" };
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  return { success: true };
}

export async function GetCartProducts() {
  const userId = await getDbUserId();
  if (!userId) {
    throw new Error("User not found");
  }
  const cart = await prisma.cart.findUnique({
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
  if (!cart || !cart.items) return [];
  return cart.items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    image: item.product.images[0]?.url || null,
    tags: item.product.tags.map(t => t.tag.name),
    quantity: item.quantity,
    subtotal: item.quantity * item.product.price,
  }));
}

export async function UpdateProductQuantityInCart(productId: string, quantity: number) {
  const userId = await getDbUserId();
  if (!userId) throw new Error("User not found");
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Cart not found");
  await prisma.cartItem.updateMany({
    where: { cartId: cart.id, productId },
    data: { quantity },
  });
  return { success: true };
}
