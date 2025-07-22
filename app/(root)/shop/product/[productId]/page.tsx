import { GetAllProductFromDbImages } from "@/action/product.action";
import ProductDetailClient from "@/components/ProductDetailClient";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  images?: { url: string }[];
  description?: string;
  tags?: string[];
  // ...other fields
};

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const products = await GetAllProductFromDbImages();
  const product = products.find((p: Product) => p.id === params.productId);
  if (!product) return <div>Product not found</div>;
  // For demo, use product.images or fallback to [product.image]
  const images = product.images?.length ? product.images.map((img: { url: string }) => img.url) : [product.image];
  // Related items: just show other products for now
  const related = products.filter((p: Product) => p.id !== product.id).slice(0, 4);
  return (
    <ProductDetailClient product={product} images={images} related={related} />
  );
}