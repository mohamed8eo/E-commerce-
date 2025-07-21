import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getDbUserId } from '@/action/user.action'

export async function GET() {
  try {
    const userId = await getDbUserId()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const from = new Date()
    from.setDate(from.getDate() - 30) // Last 30 days

    // Get total revenue from orders of products owned by this vendor
    const revenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        createdAt: { gte: from },
        orderItems: {
          some: {
            product: {
              ownerId: userId
            }
          }
        },
        status: 'PAID'
      }
    })

    const previousPeriod = new Date(from)
    previousPeriod.setDate(previousPeriod.getDate() - 30)
    
    // Get previous period revenue for trend calculation
    const previousRevenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        createdAt: { 
          gte: previousPeriod,
          lt: from
        },
        orderItems: {
          some: {
            product: {
              ownerId: userId
            }
          }
        },
        status: 'PAID'
      }
    })

    const currentTotal = revenue._sum.totalAmount || 0
    const previousTotal = previousRevenue._sum.totalAmount || 0
    
    // Calculate trend percentage
    const trend = previousTotal === 0 
      ? 100 
      : ((currentTotal - previousTotal) / previousTotal) * 100

    return NextResponse.json({ 
      total: currentTotal,
      trend: trend.toFixed(1)
    })
  } catch (error) {
    console.error('Revenue calculation error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}