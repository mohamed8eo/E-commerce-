// components/ServiceFeatures.js
"use client";
import '../i18n';
import React from 'react';
import { Truck, Headphones, DollarSign } from 'lucide-react'; // Import specific icons from lucide-react
import { useTranslation } from 'react-i18next';

const ServiceFeatures = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Feature 1: Free and Fast Delivery */}
          <div className="flex flex-col items-center p-4">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-4">
              {/* Using Lucide Truck icon */}
              <Truck className="text-white w-10 h-10" /> {/* Adjust size with w- and h- utilities */}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wide">
              {t('free_fast_delivery')}
            </h3>
            <p className="text-gray-600 text-sm">{t('free_fast_delivery_text')}</p>
          </div>

          {/* Feature 2: 24/7 Customer Service */}
          <div className="flex flex-col items-center p-4">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-4">
              {/* Using Lucide Headphones icon */}
              <Headphones className="text-white w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wide">
              {t('customer_service')}
            </h3>
            <p className="text-gray-600 text-sm">{t('customer_service_text')}</p>
          </div>

          {/* Feature 3: Money Back Guarantee */}
          <div className="flex flex-col items-center p-4">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-4">
              {/* Using Lucide DollarSign icon - or consider CheckCircle, ShieldCheck if more appropriate for "guarantee" */}
              <DollarSign className="text-white w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wide">
              {t('money_back_guarantee')}
            </h3>
            <p className="text-gray-600 text-sm">{t('money_back_text')}</p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300 z-50"
          aria-label="Scroll to top"
        >
          {/* Using Lucide ArrowUp icon for the scroll to top */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
          {/* Note: You could import { ArrowUp } from 'lucide-react' and use it directly here too:
          <ArrowUp className="w-6 h-6" />
          I've kept the SVG for direct reference to the Lucide icon SVG structure.
          */}
        </button>
      </div>
    </section>
  );
};

export default ServiceFeatures;