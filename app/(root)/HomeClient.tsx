'use client'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function HomeClient() {
  const { user } = useUser();
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    if (user?.publicMetadata?.role === 'vendor') {
      setIsVendor(true);
    } else {
      setIsVendor(false);
    }
  }, [user]);

  const handleBecomeVendor = async () => {
    await fetch('/api/become-vendor', { method: 'POST' });
    alert('You are now a Vendor');
    redirect('/vendor/dashboard')
    setIsVendor(true);
  };

  const handleExitVendor = async () => {
    await fetch('/api/exit-vendor/', { method: 'POST' });
    alert('You are no longer a Vendor');
    setIsVendor(false);
  };

  return (
    <div>
      {!isVendor && (
        <Button onClick={handleBecomeVendor}>Become a Vendor</Button>
      )}
      {isVendor && (
        <Button onClick={handleExitVendor} variant="destructive">
          Exit Vendor
        </Button>
      )}

      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
}