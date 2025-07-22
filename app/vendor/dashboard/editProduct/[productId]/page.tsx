"use client";

import { getAdminProductById, editAdminProduct } from '@/action/admin.action';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import  { useState } from 'react'
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";
import { Loader2Icon } from "lucide-react"

const EditProduct = () => {
  const router = useRouter();
  const { productId } = useParams();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productOldPrice, setProductOldPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productTags, setProductTags] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        // Ensure productId is a string before passing to getAdminProductById
        const id = typeof productId === "string" ? productId : String(productId ?? "");
        const res = await getAdminProductById(id);
        if (res.success) {
          setProductName(res.product.name || "");
          setProductDescription(res.product.description || "");
          setProductPrice(res.product.price || 0);
          setProductOldPrice(res.product.oldPrice || res.product.price || 0);
          setProductDiscount(res.product.discount || 0);
          setProductStock(res.product.stock || 0);
          setProductTags(res.product.tags || []);
          setProductImages(res.product.images || []);
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to load product data");
        router.push('/vendor/dashboard/products');
      } finally {
        setLoading(false);
      }
    }
    if (productId) fetchProduct();
  }, [productId, router]);

  const handleUpdate = async () => {
    if(!productDescription.trim() || !productName.trim() || !productImages.length || !productPrice || !productStock) {
      return;
    }
    setIsUpdating(true);
    try {
      // Ensure productId is a string before passing to editAdminProduct
      const id = typeof productId === "string" ? productId : String(productId ?? "");
      const res = await editAdminProduct(id, {
        name: productName,
        description: productDescription,
        price: productPrice,
        oldPrice: productOldPrice,
        discount: productDiscount,
        stock: productStock,
        tags: productTags,
        images: productImages,
      });
      if(res.success) {
        toast.success("Product updated successfully!");
        router.push('/vendor/dashboard/products');
      }

    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground mt-2">
            Fill in the details below to update the product listing.
          </p>
        </div>
        <div className="flex-1 flex flex-col w-auto md:w-[700px]  xl:w-[1050px]">
          <form onSubmit={e => { e.preventDefault(); handleUpdate(); }} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={productPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d*$/.test(val)) {
                      const value = Number(val);
                      setProductPrice(value);
                      setProductOldPrice(value);
                      if (productDiscount > 0) {
                        const discounted = value - (value * productDiscount / 100);
                        setProductPrice(Number(discounted.toFixed(2)));
                      }
                    }
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="text"
                  min="0"
                  max="100"
                  step="1"
                  placeholder="0"
                  value={productDiscount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      const discount = Number(val);
                      setProductDiscount(discount);
                      if (productOldPrice > 0) {
                        const discounted = productOldPrice - (productOldPrice * discount / 100);
                        setProductPrice(Number(discounted.toFixed(2)));
                      }
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oldPrice">Old Price</Label>
                <Input
                  id="oldPrice"
                  type="text"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={productOldPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d*$/.test(val)) {
                      setProductOldPrice(Number(val));
                    }
                  }}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Images</Label>
              <ImageUpload
                endpoint="postImage"
                value={productImages}
                onChange={setProductImages}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input
                placeholder="Add tags (press Enter to add)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.currentTarget.value.trim();
                    if (value && !productTags.includes(value)) {
                      setProductTags([...productTags, value]);
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {productTags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setProductTags(productTags.filter((_, i) => i !== index))}
                      className="text-sm hover:text-destructive"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            
            <div className=' flex justify-end'>
            <Button type="submit" className="w-[200px] cursor-pointer" disabled={isUpdating}>
                {isUpdating
                  ? (<Loader2Icon className="animate-spin" />)
                  : "Update Product"}
            </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProduct;