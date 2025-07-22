// app/(root)/shop/page.tsx (Server Component)
import { GetAllProductFromDb } from "@/action/product.action";
import ShopClient  from '@/components/ShopClient' // Create this component

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  tags: string[];
  // ...add other fields if needed
};

export default async function ShopPage() {
  const products = await GetAllProductFromDb() as Product[];
  const allTags = Array.from(new Set(products.flatMap((p) => p.tags))) as string[];
  return <ShopClient products={products} allTags={allTags} />;
}
