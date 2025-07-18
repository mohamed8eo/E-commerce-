import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const from = new Date()
  from.setDate(from.getDate() - 30)
  const revenue = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: {
      status: 'PAID',
      createdAt: { gte: from }
    }
  })
  return NextResponse.json({ total: revenue._sum.totalAmount || 0 })
} 