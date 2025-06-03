import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Customer from "@/models/Customer"
import Order from "@/models/Order"
import Campaign from "@/models/Campaign"
import CommunicationLog from "@/models/CommunicationLog"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Fetch all data
    const [customers, orders, campaigns, communicationLogs] = await Promise.all([
      Customer.find(),
      Order.find(),
      Campaign.find(),
      CommunicationLog.find(),
    ])

    // Calculate campaign performance
    const totalCampaigns = campaigns.length
    const totalMessagesSent = communicationLogs.filter((log) => log.status === "sent").length
    const totalMessages = communicationLogs.length
    const averageSuccessRate = totalMessages > 0 ? Math.round((totalMessagesSent / totalMessages) * 100) : 0
    const topPerformingCampaign = campaigns.length > 0 ? campaigns[0].name : "None"

    // Calculate customer insights
    const totalCustomers = customers.length
    const totalSpend = customers.reduce((sum, customer) => sum + (customer.totalSpend || 0), 0)
    const averageSpend = totalCustomers > 0 ? Math.round(totalSpend / totalCustomers) : 0
    const activeCustomers = customers.filter((customer) => customer.lastPurchaseDate).length
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const newCustomersThisMonth = customers.filter((customer) => new Date(customer.createdAt) > oneMonthAgo).length

    // Calculate revenue metrics
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
    const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0
    const monthlyGrowth = Math.floor(Math.random() * 20) + 5 // Mock growth percentage
    const topSpendingCustomer =
      customers.length > 0
        ? customers.reduce((prev, current) => (prev.totalSpend > current.totalSpend ? prev : current)).name
        : "None"

    const analytics = {
      campaignPerformance: {
        totalCampaigns,
        averageSuccessRate,
        totalMessagesSent,
        topPerformingCampaign,
      },
      customerInsights: {
        totalCustomers,
        averageSpend,
        activeCustomers,
        newCustomersThisMonth,
      },
      revenueMetrics: {
        totalRevenue,
        monthlyGrowth,
        averageOrderValue,
        topSpendingCustomer,
      },
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
