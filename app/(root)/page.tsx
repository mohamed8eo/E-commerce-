// app/(root)/page.tsx (Server Component)
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import HomeClient from './HomeClient';

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up');
  }
  return <HomeClient />;
}