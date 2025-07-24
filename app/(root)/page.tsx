"use client";
import '../../i18n';
import Banner, { MusicExperienceSection } from "@/components/Banner";
import Layer from '@/components/Layer';
import FlashSales from "@/components/FlashSales";
import BrowseCategories from '@/components/BrowseCategories';
import BestSellingProducts from '@/components/BestSellingProducts';
import ExploreProductsSection from '@/components/ExploreProductsSection';
import HomepageShowcase from '@/components/HomepageShowcase';
import ServiceFeatures from '@/components/ServiceFeatures';

export default function Home() {
  return (
    <>
      <div className="flex bg-white p-4 min-h-[400px]">
        <aside className="w-full md:w-1/4 lg:w-1/5 border-r border-gray-200 px-5 pt-5  justify-end hidden md:flex">
          <Layer />
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
      <ServiceFeatures />
    </>
  );
}