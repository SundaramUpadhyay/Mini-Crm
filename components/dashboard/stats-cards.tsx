import { Card, CardContent } from "@/components/ui/card"
import { Users, ShoppingCart, Megaphone, DollarSign, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface StatsCardsProps {
  stats: {
    totalCustomers: number
    totalOrders: number
    totalCampaigns: number
    totalRevenue: number
  }
  loading: boolean
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      subtitle: "Active customer base",
      icon: Users,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
      change: "+12%",
      changeColor: "text-green-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: "Completed orders",
      icon: ShoppingCart,
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
      iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
      change: "+8%",
      changeColor: "text-green-600",
    },
    {
      title: "Campaigns",
      value: stats.totalCampaigns,
      subtitle: "Marketing campaigns",
      icon: Megaphone,
      gradient: "from-violet-500 to-fuchsia-600",
      bgGradient: "from-violet-50 to-fuchsia-50",
      iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
      change: "+15%",
      changeColor: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      subtitle: "Total earnings",
      icon: DollarSign,
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
      change: "+23%",
      changeColor: "text-green-600",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card
            key={index}
            className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm overflow-hidden relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${card.iconBg} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className={`text-sm font-semibold ${card.changeColor}`}>{card.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1 group-hover:text-gray-700 transition-colors duration-200">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-200">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                  {card.subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
