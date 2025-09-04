"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "📊", permission: "read" },
  { name: "FRA Atlas", href: "/atlas", icon: "🗺️", permission: "read" },
  { name: "Data Digitization", href: "/digitization", icon: "📄", permission: "write" },
  { name: "Asset Mapping", href: "/assets", icon: "🏞️", permission: "read" },
  { name: "DSS Recommendations", href: "/dss", icon: "🤖", permission: "read" },
  { name: "Communication Portal", href: "/communication", icon: "💬", permission: "read" },
  { name: "Scheme Dashboard", href: "/schemes", icon: "📋", permission: "read" },
  { name: "Reports", href: "/reports", icon: "📈", permission: "view_reports" },
  { name: "Settings", href: "/settings", icon: "⚙️", permission: "read" },
]

const roleColors = {
  admin: "bg-purple-100 text-purple-800",
  department: "bg-blue-100 text-blue-800",
  ngo: "bg-green-100 text-green-800",
  public: "bg-gray-100 text-gray-800",
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout, hasPermission } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex items-center justify-center h-20 px-4 bg-green-600">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-16 h-16 flex items-center justify-center shadow-lg">
                <Image
                  src="/fra-atlas-logo.png"
                  alt="FRA Atlas Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">FRA Atlas & DSS</span>
                <span className="text-green-100 text-xs">वन अधिकारी दृष्टि</span>
              </div>
            </Link>
          </div>

          <nav className="mt-8 px-4 space-y-2 flex-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const hasAccess = hasPermission(item.permission)

              if (!hasAccess) {
                return (
                  <div
                    key={item.name}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
                  >
                    <span className="text-lg opacity-50">{item.icon}</span>
                    <span>{item.name}</span>
                    <span className="text-xs">🔒</span>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          
          {/* Logout Button in Sidebar */}
          <div className="p-4 border-t">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => {
                console.log('Sidebar logout button clicked!')
                if (confirm('Are you sure you want to logout?')) {
                  console.log('User confirmed logout')
                  logout()
                }
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              🚪 LOGOUT
            </Button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top navigation */}
          <header className="bg-white shadow-sm border-b h-16 flex-shrink-0">
            <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  ☰
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
                {user?.department && (
                  <Badge variant="outline" className="text-xs hidden sm:block">
                    {user.department}
                  </Badge>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 border-2 border-transparent hover:border-gray-300">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-700 font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0">
                    <Badge className={`${roleColors[user?.role] || "bg-gray-100 text-gray-800"} w-full justify-center`}>
                      {user?.role?.toUpperCase()}
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      if (confirm('Are you sure you want to logout?')) {
                        logout()
                      }
                    }} 
                    className="text-red-600 cursor-pointer hover:bg-red-50"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>🚪 Logout</span>
                      <span className="text-xs text-gray-400">Ctrl+S</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </ProtectedRoute>
  )
}
