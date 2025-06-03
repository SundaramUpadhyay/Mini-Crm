"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Header from "./header"
import RealtimeStats from "./real-time-stats"
import ActionButtons from "./action-buttons"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, Zap, Shield, Globe } from "lucide-react"

interface DashboardStats {
  totalCustomers: number
  totalOrders: number
  totalCampaigns: number
  totalRevenue: number
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalOrders: 0,
    totalCampaigns: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-violet-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-fuchsia-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Header user={session?.user} />

      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-violet-600 rounded-full"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-violet-900 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your customers, orders, campaigns, and grow your business with AI-powered insights
          </p>
        </div>

        {loading ? (
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
        ) : (
          <RealtimeStats initialStats={stats} />
        )}

        <ActionButtons />

        {/* Enhanced AI Features Card */}
        <Card className="mt-8 border-0 shadow-2xl bg-gradient-to-br from-white via-purple-50/50 to-violet-50/50 backdrop-blur-sm overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-violet-600/5 to-fuchsia-600/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600"></div>

          <CardContent className="p-8 relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-violet-800 bg-clip-text text-transparent">
                  Powered by AI
                </h2>
              </div>

              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
                Advanced artificial intelligence features to supercharge your marketing campaigns and customer insights
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:bg-white/80 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Smart Targeting</h3>
                  <p className="text-sm text-gray-600 text-center">AI-powered audience segmentation</p>
                </div>

                <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:bg-white/80 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Secure & Reliable</h3>
                  <p className="text-sm text-gray-600 text-center">Enterprise-grade security</p>
                </div>

                <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:bg-white/80 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Global Scale</h3>
                  <p className="text-sm text-gray-600 text-center">Worldwide campaign delivery</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
