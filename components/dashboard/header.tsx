"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings, Bell } from "lucide-react"

interface HeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function Header({ user }: HeaderProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" })
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-purple-100/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Enhanced Logo */}
          <div className="relative group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-violet-700 to-fuchsia-800 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              <span className="text-white font-bold text-lg relative z-10">M</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-md"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-violet-800 bg-clip-text text-transparent">
              Mini CRM
            </span>
            <span className="text-xs text-gray-500 font-medium">Customer Management</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
          >
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>

          <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-violet-50 rounded-full border border-purple-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Welcome, {user?.name || "User"}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-purple-200 transition-all duration-200"
              >
                <Avatar className="h-10 w-10 ring-2 ring-white shadow-md">
                  <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-600 text-white font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white/95 backdrop-blur-sm border border-purple-100 shadow-xl"
              align="end"
              forceMount
            >
              <div className="px-3 py-2 border-b border-purple-100">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <DropdownMenuItem className="flex items-center hover:bg-purple-50 transition-colors duration-200">
                <User className="mr-2 h-4 w-4 text-purple-600" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center hover:bg-purple-50 transition-colors duration-200">
                <Settings className="mr-2 h-4 w-4 text-purple-600" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex items-center hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
