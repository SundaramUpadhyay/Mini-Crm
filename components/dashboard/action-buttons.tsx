"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye, Users, TrendingUp, Sparkles, ArrowRight, ShoppingBag } from "lucide-react"

export default function ActionButtons() {
  const router = useRouter()

  const actions = [
    {
      title: "Create Campaign",
      description: "Build audience segments with AI assistance",
      icon: Plus,
      gradient: "from-purple-600 to-violet-700",
      hoverGradient: "from-purple-700 to-violet-800",
      bgGradient: "from-purple-50 to-violet-50",
      onClick: () => {
        console.log("Navigating to create campaign")
        router.push("/campaigns/create")
      },
      badge: "AI Powered",
      badgeIcon: Sparkles,
    },
    {
      title: "View Campaigns",
      description: "Monitor performance and delivery status",
      icon: Eye,
      gradient: "from-indigo-600 to-purple-700",
      hoverGradient: "from-indigo-700 to-purple-800",
      bgGradient: "from-indigo-50 to-purple-50",
      onClick: () => router.push("/campaigns"),
      badge: "Live Data",
      badgeIcon: TrendingUp,
    },
    {
      title: "Customer Data",
      description: "Manage customer information",
      icon: Users,
      gradient: "from-violet-600 to-fuchsia-700",
      hoverGradient: "from-violet-700 to-fuchsia-800",
      bgGradient: "from-violet-50 to-fuchsia-50",
      onClick: () => router.push("/customers"),
      badge: "Secure",
      badgeIcon: Users,
    },
    {
      title: "Orders",
      description: "View and manage order information",
      icon: ShoppingBag,
      gradient: "from-pink-600 to-rose-700",
      hoverGradient: "from-pink-700 to-rose-800",
      bgGradient: "from-pink-50 to-rose-50",
      onClick: () => router.push("/orders"),
      badge: "Revenue",
      badgeIcon: TrendingUp,
    },
    {
      title: "Analytics",
      description: "View detailed insights and metrics",
      icon: TrendingUp,
      gradient: "from-emerald-600 to-teal-700",
      hoverGradient: "from-emerald-700 to-teal-800",
      bgGradient: "from-emerald-50 to-teal-50",
      onClick: () => router.push("/analytics"),
      badge: "Real-time",
      badgeIcon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {actions.map((action, index) => {
        const Icon = action.icon
        const BadgeIcon = action.badgeIcon
        return (
          <Card
            key={index}
            className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm overflow-hidden relative cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              action.onClick()
            }}
          >
            {/* Background gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            ></div>

            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${action.gradient} group-hover:bg-gradient-to-br group-hover:${action.hoverGradient} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Badge */}
                <div className="flex items-center space-x-1 px-2 py-1 bg-white/80 rounded-full border border-gray-200 shadow-sm">
                  <BadgeIcon className="h-3 w-3 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">{action.badge}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
                  {action.description}
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-white group-hover:border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    action.onClick()
                  }}
                >
                  <span>
                    {action.title === "Create Campaign"
                      ? "Create New Campaign"
                      : action.title === "View Campaigns"
                        ? "View All Campaigns"
                        : action.title === "Customer Data"
                          ? "View Customers"
                          : action.title === "Orders"
                            ? "View Orders"
                            : "View Analytics"}
                  </span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
