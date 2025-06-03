"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, ShoppingCart, Megaphone, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

interface RealtimeStatsProps {
  initialStats: {
    totalCustomers: number
    totalOrders: number
    totalCampaigns: number
    totalRevenue: number
  }
}

export default function RealtimeStats({ initialStats }: RealtimeStatsProps) {
  const [stats, setStats] = useState(initialStats)
  const [previousStats, setPreviousStats] = useState(initialStats)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/dashboard/stats")
        if (response.ok) {
          const newStats = await response.json()
          setPreviousStats(stats)
          setStats(newStats)
        }
      } catch (error) {
        console.error("Error fetching real-time stats:", error)
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [stats])

  const getChangeIndicator = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return null
  }

  const cards = [
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      previous: previousStats.totalCustomers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      previous: previousStats.totalOrders,
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Campaigns",
      value: stats.totalCampaigns,
      previous: previousStats.totalCampaigns,
      icon: Megaphone,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      previous: previousStats.totalRevenue,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon
        const numericValue = typeof card.value === "string" ? Number.parseInt(card.value.replace("₹", "")) : card.value

        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                {getChangeIndicator(numericValue, card.previous)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-xs text-gray-500">
                  {numericValue > card.previous && `+${numericValue - card.previous} from last update`}
                  {numericValue < card.previous && `${numericValue - card.previous} from last update`}
                  {numericValue === card.previous && "No change"}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
