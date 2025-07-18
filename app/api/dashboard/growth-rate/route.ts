import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const now = new Date()
  const from = new Date(now)
  from.setDate(from.getDate() - 30)
  const prevFrom = new Date(now)
  prevFrom.setDate(prevFrom.getDate() - 60)
  const prevTo = new Date(now)
  prevTo.setDate(prevTo.getDate() - 30)

  const current = await prisma.order.count({
    where: { createdAt: { gte: from, lte: now } }
  })
  const previous = await prisma.order.count({
    where: { createdAt: { gte: prevFrom, lte: prevTo } }
  })
  const growth = previous === 0 ? 0 : ((current - previous) / previous) * 100
  return NextResponse.json({ growth: Math.round(growth * 10) / 10 })
} 