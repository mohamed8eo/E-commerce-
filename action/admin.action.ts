"use server";
import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import redis from "@/lib/redis";

export async function postAdminProduct(data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  tags: string[];
  images: string[];
}) {
  try {
    const { name, description, price, stock, tags, images } = data;
    const userId = await getDbUserId();

    if (!userId) throw new Error("User not found");

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        tags: {
          create: tags.map(tag => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag }
              }
            }
          })),
        },
        images: {
          createMany: {
            data: images.map(url => ({ url })),
          },
        },
        ownerId: userId, // Use the database user ID instead of Clerk ID
      },
      include: {
        images: true,
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    // Invalidate cache for this user
    await redis.del(`admin_products_${userId}`);
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
    
  }
  
}

export async function getAdminProducts() { 
  try {
    const userId = await getDbUserId();
    if (!userId) throw new Error("User not found");
    // Try cache first
    const cacheKey = `admin_products_${userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return { success: true, products: JSON.parse(cached) };
    }
    const products = await prisma.product.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        images: {
          take: 1,
          select: {
            url: true
          }
        },
        tags: {
          select: {
            tag: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      mainImage: product.images[0]?.url || "", 
      tags: product.tags.map(t => t.tag.name)
    }));
    // Cache result
    await redis.set(cacheKey, JSON.stringify(transformedProducts), { EX: 300 }); // 5 min
    return { success: true, products: transformedProducts };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function deleteAdminProduct(productId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) throw new Error("User not found");
    // First, verify the product exists and belongs to the user
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        ownerId: userId,
      },
    });
    if (!existingProduct) {
      throw new Error("Product not found or unauthorized");
    }
    // Delete everything in a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // 1. Delete all product images
      await tx.productImage.deleteMany({
        where: { productId }
      });
      // 2. Delete all product tags
      await tx.productTag.deleteMany({
        where: { productId }
      });
      // 3. Finally delete the product itself
      const deletedProduct = await tx.product.delete({
        where: { id: productId }
      });
      return deletedProduct;
    });
    // Invalidate cache for this user
    await redis.del(`admin_products_${userId}`);
    return { success: true, product: result };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

//adding an adming edit product function

export async function editAdminProduct(productId: string, data: {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  tags?: string[];
  images?: string[];
  oldPrice?: number;
  discount?: number;
}) {
  try {
    const userId = await getDbUserId();
    if (!userId) throw new Error("User not found");
    // Verify the product exists and belongs to the user
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        ownerId: userId,
      },
    });
    if (!existingProduct) {
      throw new Error("Product not found or unauthorized");
    }
    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        oldPrice: data.oldPrice,      // <-- add this
        discount: data.discount,      // <-- add this
        stock: data.stock,
        tags: {
          deleteMany: {}, // Clear existing tags
          create: data.tags?.map(tag => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag }
              }
            }
          })) || [],
        },
        images: {
          deleteMany: {}, // Clear existing images
          createMany: {
            data: data.images?.map(url => ({ url })) || [],
          },
        },
      },
      include: {
        images: true,
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    // Invalidate cache for this user
    await redis.del(`admin_products_${userId}`);
    return { success: true, product: updatedProduct };
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function getAdminProductById(productId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) throw new Error("User not found");

    const product = await prisma.product.findFirst({
      where: { id: productId, ownerId: userId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        oldPrice: true,      // <-- add this
        discount: true,      // <-- add this
        images: { select: { url: true } },
        tags: { select: { tag: { select: { name: true } } } },
      },
    });
    if (!product) throw new Error("Product not found or unauthorized");
    return {
      success: true,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        oldPrice: product.oldPrice,    // <-- add this
        discount: product.discount,    // <-- add this
        images: product.images.map(img => img.url),
        tags: product.tags.map(t => t.tag.name),
      },
    };
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw new Error("Failed to fetch product");
  }
}