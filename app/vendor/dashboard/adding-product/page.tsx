"use client";

import { postAdminProduct } from '@/action/admin.action';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";
import { Loader2Icon } from "lucide-react"


const CreatePost = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productTags, setProductTags] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleSubmit = async () => {
    if(!productDescription.trim() || !productName.trim() || !productImages.length || !productPrice || !productStock) {
      return;
    }
    setIsAdding(true);
    try {
      const res = await postAdminProduct({
        name: productName,
        description: productDescription,
        price: productPrice,
        stock: productStock,
        tags: productTags,
        images: productImages,
      });
      if(res) {
        setProductName("");
        setProductDescription("");
        setProductPrice(0);
        setProductStock(0);
        setProductTags([]);
        setProductImages([]);
        toast.success("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsAdding(false);
    }
  }
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground mt-2">
            Fill in the details below to create a new product listing.
          </p>
        </div>
        <div className="flex-1 flex flex-col w-auto md:w-[700px]  xl:w-[1050px] mb-[50px] md:mb-0">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }} className="space-y-6">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  inputMode="decimal"
                  pattern="^[0-9]*\.?[0-9]*$"
                  placeholder="0.00"
                  value={productPrice === 0 ? '' : productPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers and decimals
                    if (/^\d*\.?\d*$/.test(value)) {
                      setProductPrice(value === '' ? 0 : Number(value));
                    }
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="text"
                  inputMode="numeric"
                  pattern="^[0-9]*$"
                  placeholder="0"
                  value={productStock === 0 ? '' : productStock}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only integers
                    if (/^\d*$/.test(value)) {
                      setProductStock(value === '' ? 0 : Number(value));
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
            <Button type="submit" className="w-[200px] cursor-pointer" disabled={isAdding}>
                {isAdding
                  ? (<Loader2Icon className="animate-spin" />)
                  : "Add Product"}
            </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default CreatePost


