import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await (await clerkClient()).users.updateUser(userId, {
    publicMetadata: {
      role: null // Remove the vendor role
    }
  });

  return NextResponse.json({ message: 'You are no longer a vendor.' });
} 