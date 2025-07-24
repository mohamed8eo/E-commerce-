"use client";
import '../../../../i18n';
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { useTranslation } from 'react-i18next';

export default function SignUpPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-[2000pxl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Left: E-commerce image */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <Image
            src="/auth.png"
            alt="E-Commerce Shopping"
            width={1000}
            height={1000}
            className="object-contain rounded-lg"
          />
        </div>
        {/* Right: Sign up form */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 min-h-full">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('create_account')}</h2>
            <p className="text-gray-500 mb-8">{t('enter_details_below')}</p>
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded transition mb-4",
                  card: "shadow-none border-none p-0",
                  socialButtonsBlockButton: "border border-gray-300 py-3 px-4 rounded flex items-center justify-center gap-2 text-gray-700 font-medium mb-4",
                  socialButtonsBlockButtonText: "ml-2",
                  footerAction: "mt-6 text-center text-gray-600",
                  footerActionLink: "text-gray-900 underline ml-1",
                  formFieldInput: "border-b border-gray-300 focus:border-gray-900 outline-none py-2 mb-6 w-full bg-transparent",
                  formFieldLabel: "hidden",
                },
              }}
              signInUrl="/sign-in"
            />
          </div>
        </div>
      </div>
    </div>
  );
}