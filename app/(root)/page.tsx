// app/(root)/page.tsx (Server Component)
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';


export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up');
  }
  return (
    <div className='h-[100vh]'>Home page</div>
  )
}