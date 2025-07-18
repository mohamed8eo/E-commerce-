import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const NoAdminProducts = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-[#18181b] border border-[#232329] rounded-2xl shadow-sm w-full max-w-md mx-auto">
      <Image
        src="/NoAdminProducts.png"
        alt="No products"
        width={160}
        height={160}
        className="mb-6"
        priority
      />
      <h2 className="text-xl font-semibold text-white mb-2">No Products Found</h2>
      <p className="text-gray-400 mb-6 text-center">You haven&apos;t added any products yet. Start by adding your first product to showcase in your store!</p>
      <Button onClick={() => router.push('/vendor/dashboard/adding-product')} className="w-[180px] cursor-pointer">
        Add Product
      </Button>
    </div>
  )
}

export default NoAdminProducts