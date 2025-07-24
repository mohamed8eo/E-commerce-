import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getDbUserId } from '@/action/user.action'

export async function GET() {
  try {
    const userId = await getDbUserId()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    // Revenue (last 30 days)
    const from = new Date()
    from.setDate(from.getDate() - 30)
    const revenue = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        createdAt: { gte: from },
        orderItems: { some: { product: { ownerId: userId } } },
        status: 'PAID'
      }
    })

    // New Customers (last 30 days)
    const newCustomers = await prisma.user.count({ where: { createdAt: { gte: from } } })

    // Active Accounts (last 30 days)
    const users = await prisma.order.findMany({
      where: { createdAt: { gte: from } },
      select: { userId: true },
      distinct: ['userId']
    })

    // Growth Rate (last 30 days vs previous 30 days)
    const now = new Date()
    const prevFrom = new Date(now)
    prevFrom.setDate(prevFrom.getDate() - 60)
    const prevTo = new Date(now)
    prevTo.setDate(prevTo.getDate() - 30)
    const current = await prisma.order.count({ where: { createdAt: { gte: from, lte: now } } })
    const previous = await prisma.order.count({ where: { createdAt: { gte: prevFrom, lte: prevTo } } })
    const growth = previous === 0 ? 0 : ((current - previous) / previous) * 100

    // Sales Over Time (last 12 months)
    const salesFrom = new Date()
    salesFrom.setMonth(salesFrom.getMonth() - 12)
    const orders = await prisma.order.findMany({
      where: { status: 'PAID', createdAt: { gte: salesFrom } },
      select: { totalAmount: true, createdAt: true }
    })
    const salesByMonth: { [key: string]: number } = {}
    orders.forEach(order => {
      const month = order.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' })
      salesByMonth[month] = (salesByMonth[month] || 0) + order.totalAmount
    })

    return NextResponse.json({
      revenue: revenue._sum.totalAmount || 0,
      newCustomers,
      activeAccounts: users.length,
      growth: Math.round(growth * 10) / 10,
      salesOverTime: salesByMonth
    })
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
} 