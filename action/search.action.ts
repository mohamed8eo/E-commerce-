"use server"

import prisma from "@/lib/prisma";

// In action/product.action.ts
export async function SearchProductsByTag(tag: string) {
    const products = await prisma.product.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: {
                contains: tag, // or use 'equals' for exact match
                mode: "insensitive"
              }
            }
          }
        }
      },
      include: {
        images: true,
        tags: { include: { tag: true } }
      }
    });
  
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || null,
      tags: product.tags.map(t => t.tag.name),
      // ...other fields as needed
    }));
  }