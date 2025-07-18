import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';  // <-- change this import
import { NextResponse } from 'next/server';

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await (await clerkClient()).users.updateUser(userId, {
    publicMetadata: {
      role: 'vendor'
    }
  });

  return NextResponse.json({ message: 'You are now a vendor!' });
}