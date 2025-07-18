"use server";

import prisma from "@/lib/prisma";
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
// i need to create an function that create a product on the datebase
// export async function postAdminProduct(data: {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   tags: string[];
//   images: string[];
// }) {
//   try {
//     const { name, description, price, stock, tags, images } = data;
//     const userId = await getDbUserId();

//     if (!userId) throw new Error("User not found");

//     return prisma.product.create({
//       data: {
//         name,
//         description,
//         price,
//         stock,
//         tags: {
//           create: tags.map(tag => ({
//             tag: {
//               connectOrCreate: {
//                 where: { name: tag },
//                 create: { name: tag }
//               }
//             }
//           })),
//         },
//         images: {
//           createMany: {
//             data: images.map(url => ({ url })),
//           },
//         },
//         ownerId: userId, // Use the database user ID instead of Clerk ID
//       },
//       include: {
//         images: true,
//         tags: {
//           include: {
//             tag: true
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     throw new Error("Failed to create product");
    
//   }
  
// }