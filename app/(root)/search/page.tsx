"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  tags: string[];
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tag) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetch(`/api/search?tag=${encodeURIComponent(tag)}`)
      .then(res => res.json())
      .then(products => setResults(products))
      .finally(() => setLoading(false));
  }, [tag]);

  return (
    <div className="min-h-screen bg-[#fafbfc] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Search Results for: <span className="text-blue-600">{tag}</span></h1>
        {loading && <div className="text-center text-gray-400 text-lg mt-16">Searching...</div>}
        {!loading && results.length === 0 && tag && (
          <div className="text-center text-gray-400 text-lg mt-16">No products found for this tag.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {results.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition">
              {product.image ? (
                <Image src={product.image || '/placeholder.png'} alt={product.name} width={128} height={128} className="w-32 h-32 object-contain mb-4 rounded" />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-100 text-gray-400 mb-4 rounded">No Image</div>
              )}
              <div className="text-lg font-semibold text-center mb-2 line-clamp-2">{product.name}</div>
              <div className="text-blue-600 text-xl font-bold mb-1">${product.price}</div>
              <div className="text-xs text-gray-400 text-center">{product.tags.join(", ")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}