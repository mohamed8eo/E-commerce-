// app/(root)/page.tsx (Server Component)
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Banner, { MusicExperienceSection } from "@/components/Banner";
import  Layer  from '@/components/Layer';
import FlashSales from "@/components/FlashSales";
import BrowseCategories from '@/components/BrowseCategories';
import BestSellingProducts from '@/components/BestSellingProducts';
import ExploreProductsSection from '@/components/ExploreProductsSection';
import HomepageShowcase from '@/components/HomepageShowcase';
import Testna from '@/components/Testna'
export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up');
  }

    return (
      <>
        <div className="flex bg-white p-4 min-h-[400px]">
          <aside className="w-full md:w-1/4 lg:w-1/5 border-r border-gray-200 pr-5 pt-5  justify-end hidden md:flex">
            <Layer/>
          </aside>
          <div className="flex-1 flex items-center justify-center">
            <Banner />
          </div>
        </div>
        <FlashSales />
        <BrowseCategories />
        <BestSellingProducts />
        <MusicExperienceSection />
        <ExploreProductsSection />
        <HomepageShowcase />
        <Testna/>
      </>
    );
}