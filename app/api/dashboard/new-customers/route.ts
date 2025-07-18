import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const from = new Date()
  from.setDate(from.getDate() - 30)
  const count = await prisma.user.count({
    where: { createdAt: { gte: from } }
  })
  return NextResponse.json({ count })
} 