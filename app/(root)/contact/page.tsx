"use client";
import '../../../i18n';
import { Phone, Mail } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="w-full max-w-5xl mb-8 px-2 sm:px-0">
        <nav className="text-gray-400 text-sm flex items-center gap-2 pl-1">
          <span>{t('home')}</span>
          <span>/</span>
          <span className="text-black font-medium">{t('contact')}</span>
        </nav>
      </div>
      {/* Main Content */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 px-2 sm:px-0">
        {/* Left Card */}
        <div className="bg-white rounded-xl border p-6 sm:p-8 flex-1 max-w-full lg:max-w-md mb-4 lg:mb-0 mx-auto lg:mx-0">
          {/* Call To Us */}
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-red-500 text-white rounded-full p-3 flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div>
              <div className="font-bold text-lg">{t('call_to_us')}</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm mb-2 w-full max-w-[170px]">
            {t('available_247')}
          </div>
          <div className="text-black text-sm mb-1">
            {t('phone')} +8801611112222
          </div>
          <hr className="my-6" />
          {/* Write To Us */}
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-red-500 text-white rounded-full p-3 flex items-center justify-center">
              <Mail size={24} />
            </div>
            <div>
              <div className="font-bold text-lg">{t('write_to_us')}</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm mb-2">
            {t('fill_details_create')}
          </div>
          <div className="text-black text-sm">
            {t('emails')} customer@exclusive.com
          </div>
          <div className="text-black text-sm">
            {t('emails')} support@exclusive.com
          </div>
        </div>
        {/* Right Form */}
        <form className="flex-1 border-2  shadow rounded-xl bg-white p-6 sm:p-8 flex flex-col gap-6 mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder={t('your_name')}
              className="flex-1 bg-gray-100 rounded-md px-4 py-3 outline-none min-w-0"
              required
            />
            <input
              type="email"
              placeholder={t('your_email')}
              className="flex-1 bg-gray-100 rounded-md px-4 py-3 outline-none min-w-0"
              required
            />
            <input
              type="tel"
              placeholder={t('your_phone')}
              className="flex-1 bg-gray-100 rounded-md px-4 py-3 outline-none min-w-0"
              required
            />
          </div>
          <textarea
            placeholder={t('your_message')}
            className="bg-gray-100 rounded-md px-4 py-3 outline-none min-h-[140px] resize-none"
            required
          />
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md px-8 py-3 transition w-full md:w-auto"
            >
              {t('send_message')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 