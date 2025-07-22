"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getAdminProducts, deleteAdminProduct } from "@/action/admin.action"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2Icon } from "lucide-react"
import NoAdminProducts from "./NoAdminProducts"
import { redirect } from "next/navigation"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  mainImage: string
  tags: string[]
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAdminProducts()
        if (result.success) {
          setProducts(
            result.products.map((product: Product) => ({
              ...product,
              description: product.description ?? ""
            }) as Product)
          )
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleEdit = (product: Product) => {
    redirect( `/vendor/dashboard/editProduct/${product.id}`)
  }

  const handleDelete = async (product: Product) => {
    try {
      setIsDeleting(true);
      const result = await deleteAdminProduct(product.id);
      if (result.success) {
        toast.success("Product deleted successfully");
        // Remove the product from the local state
        setProducts(products.filter(p => p.id !== product.id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }finally {
      setIsDeleting(false);
    }
  }

  if (loading) {
    return <div className="text-center text-gray-400">Loading products...</div>
  }

  if (products.length === 0) {
    return(
      <div className="text-center text-gray-400 sm:w-[900] lg:w-[1100px]">
        <NoAdminProducts/>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <Card key={product.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between p-0 h-[500px]">
          <CardHeader className="p-0 relative h-40 overflow-hidden rounded-t-2xl flex items-center justify-center">
            <Image 
              src={product.mainImage || '/placeholder-product.jpg'} 
              alt={product.name}
              height={0}
              width={220}
              className="object-contain h-full w-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-black mb-1 line-clamp-2">{product.name}</CardTitle>
              <div className="text-gray-600 text-sm mb-2 line-clamp-3">{product.description}</div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-green-600 font-bold text-lg">${product.price}</div>
                <div className="text-gray-600 text-sm">Stock: {product.stock}</div>
              </div>
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-auto">
            <Button 
              variant="outline" 
                className="border-gray-300 text-gray-800 hover:bg-gray-100" 
              onClick={() => handleEdit(product)}
            >
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="cursor-pointer">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your product and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button 
                      onClick={() => handleDelete(product)}
                    >
                      {isDeleting ? (<Loader2Icon className="animate-spin" />) : "Continue"}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
