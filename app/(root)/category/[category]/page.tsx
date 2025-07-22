import { GetAllProductFromDb } from "@/action/product.action";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  stock: number;
  image: string | null;
  tags: string[];
  reviews: number;
  rating: number;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const products: Product[] = await GetAllProductFromDb();
  // Filter products by tag (case-insensitive)
  const filtered = products.filter((product) =>
    product.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <h1 className="text-4xl font-extrabold mb-12 capitalize text-center tracking-tight text-gray-900 drop-shadow-sm">
        {category} Products
      </h1>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-xl hover:scale-[1.025] transition-all duration-200 border border-gray-100 group min-h-[420px]"
            >
              {/* Discount badge */}
              {product.discount && product.discount > 0 ? (
                <span className="absolute left-4 top-4 bg-red-500 text-white text-base font-bold px-4 py-1 rounded-md shadow">
                  -{product.discount}%
                </span>
              ) : null}
              <div className="flex justify-center items-center h-40 mb-4 w-full">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="object-contain drop-shadow-md"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] flex items-center justify-center bg-gray-200 text-gray-400 rounded">
                    No Image
                  </div>
                )}
              </div>
              <div className="text-lg font-semibold mb-2 text-center line-clamp-2 text-gray-900">
                {product.name}
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-red-500 text-xl font-bold">${product.price}</span>
                {product.oldPrice && product.oldPrice > product.price ? (
                  <span className="text-gray-400 line-through text-lg">${product.oldPrice}</span>
                ) : null}
              </div>
              {/* Rating and reviews */}
              {product.rating && product.reviews ? (
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                    <svg key={i} width="22" height="22" fill="#FACC15" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  ))}
                  {product.rating % 1 !== 0 && (
                    <svg width="22" height="22" fill="#FACC15" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stopColor="#FACC15" /><stop offset="50%" stopColor="#E5E7EB" /></linearGradient></defs><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#half)" /></svg>
                  )}
                  <span className="text-gray-400 text-lg ml-2">({product.reviews})</span>
                </div>
              ) : null}
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.tags.map((tag: string, index: number) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <Link href={`/product/${product.id}`} className="w-full mt-auto">
                <button className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-400 hover:scale-[1.03] transition-all duration-200">
                  View Product
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}