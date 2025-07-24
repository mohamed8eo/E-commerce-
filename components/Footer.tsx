"use client";
import React, {useEffect, useRef} from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);
  return (
    <footer ref={footerRef} className="bg-black text-white mt-8 overflow-hidden" style={{ minHeight: 400 }}>
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Subscribe */}
        <div>
          <h2 className="text-2xl font-extrabold mb-2 uppercase tracking-wide">{t('exclusive')}</h2>
          <div className="font-bold mb-2 uppercase tracking-wide">{t('subscribe')}</div>
          <div className="mb-2 text-gray-300">{t('get_10_off_your_first_order')}</div>
          <form className="flex items-center border border-gray-400 rounded-lg overflow-hidden mt-4 bg-black">
            <input
              type="email"
              placeholder={t('enter_your_email')}
              className="bg-black outline-none flex-1 text-white placeholder-gray-400 py-2 px-4 text-base"
            />
            <button type="submit" className="bg-purple-500 hover:bg-purple-600 transition-colors px-4 py-2 flex items-center justify-center">
              {/* Send icon */}
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </form>
        </div>
        {/* Support */}
        <div>
          <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{t('support')}</h3>
          <div className="text-gray-300 mb-1">{t('address')}</div>
          <div className="text-gray-300 mb-1">{t('email')}</div>
          <div className="text-gray-300">{t('phone')}</div>
        </div>
        {/* Account */}
        <div>
          <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{t('account')}</h3>
          <ul className="space-y-1">
            <li className="hover:underline cursor-pointer">{t('my_account')}</li>
            <li className="hover:underline cursor-pointer">{t('login_register')}</li>
            <li className="hover:underline cursor-pointer">{t('cart')}</li>
            <li className="hover:underline cursor-pointer">{t('wishlist')}</li>
            <li className="hover:underline cursor-pointer">{t('shop')}</li>
          </ul>
        </div>
        {/* Quick Link */}
        <div>
          <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{t('quick_link')}</h3>
          <ul className="space-y-1">
            <li className="hover:underline cursor-pointer">{t('privacy_policy')}</li>
            <li className="hover:underline cursor-pointer">{t('terms_of_use')}</li>
            <li className="hover:underline cursor-pointer">{t('faq')}</li>
            <li className="hover:underline cursor-pointer">{t('contact')}</li>
          </ul>
        </div>
        {/* Download App */}
        <div>
          <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{t('download_app')}</h3>
          <div className="text-gray-300 text-xs mb-2">{t('save_3_with_app_new_user_only')}</div>
          <div className="flex items-center gap-3 mb-3">
            {/* Use correct images from /public */}
            <Image src="/Qr Code.png" alt="QR Code" width={60} height={60} className="bg-white rounded" />
            <div className="flex flex-col gap-2">
              <Image src="/GooglePlay.png" alt="Google Play" width={100} height={30} />
              <Image src="/download-appstore.png" alt="App Store" width={100} height={30} />
            </div>
          </div>
          <div className="flex gap-6 mt-6 text-2xl">
            {/* Social icons */}
            <a href="#" className="hover:text-purple-400 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.813 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" /></svg></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32 1.28.059 1.689.072 7.191.072s5.911-.013 7.191-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191s-.013-5.911-.072-7.191c-.059-1.277-.353-2.45-1.32-3.417C19.45.425 18.277.131 17 .072 15.721.013 15.312 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" /></svg></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400 text-sm">
        © Copyright Rimel 2022. All right reserved
      </div>
    </footer> 
  )
}

export default Footer