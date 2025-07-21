"use server";

import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getUserByClerkId(clerkId:string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          products: true,
          orders: true,
        }
      }
    }
  })
} 


export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await getUserByClerkId(clerkId);

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("User not found");
    }
    const newUser = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        name:  clerkUser.firstName || "",
      }
    });
    return newUser.id;
  }

  return user!.id;
}

// Fetch user info from DB by Clerk userId (for fast sidebar rendering, with Redis cache)
export async function getUserInfoFromDb(clerkId: string) {
  const cacheKey = `user:${clerkId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log('Sidebar: Redis cache hit');
    return JSON.parse(cached);
  }
  console.log('Sidebar: Redis cache miss, fetching from DB');
  const userInfo = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      username: true,
    },
  });
  if (userInfo) {
    await redis.set(cacheKey, JSON.stringify(userInfo), { EX: 3600 }); // cache for 1 hour
  }
  return userInfo;
}
