import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const from = new Date()
  from.setDate(from.getDate() - 30)
  const users = await prisma.order.findMany({
    where: { createdAt: { gte: from } },
    select: { userId: true },
    distinct: ['userId']
  })
  return NextResponse.json({ count: users.length })
} 