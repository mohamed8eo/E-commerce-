import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const from = new Date()
  from.setMonth(from.getMonth() - 12)
  const orders = await prisma.order.findMany({
    where: {
      status: 'PAID',
      createdAt: { gte: from }
    },
    select: {
      totalAmount: true,
      createdAt: true
    }
  })
  // Group by month
  const salesByMonth: { [key: string]: number } = {}
  orders.forEach(order => {
    const month = order.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' })
    salesByMonth[month] = (salesByMonth[month] || 0) + order.totalAmount
  })
  return NextResponse.json(salesByMonth)
} 