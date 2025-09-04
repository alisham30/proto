"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import dynamic from "next/dynamic"
import Image from "next/image"

// Dynamically import charts to avoid SSR issues
const FRAStatusPieChart = dynamic(() => import("@/components/charts/fra-status-pie-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading chart...</p>
    </div>
  ),
})

const ClaimsByStateBarChart = dynamic(() => import("@/components/charts/claims-by-state-bar-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading chart...</p>
    </div>
  ),
})

const MonthlyTrendsChart = dynamic(() => import("@/components/charts/monthly-trends-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading chart...</p>
    </div>
  ),
})

const MiniMapPreview = dynamic(() => import("@/components/mini-map-preview"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 flex items-center justify-center shadow-lg">
              <Image
                src="/images/fra-atlas-logo.png"
                alt="FRA Atlas Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Overview of FRA implementation across states</p>
            </div>
          </div>
          {user?.state && (
            <Badge variant="outline" className="text-sm">
              Viewing: {user.state}
            </Badge>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Claims</CardDescription>
              <CardTitle className="text-2xl">125,360</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Approved</CardDescription>
              <CardTitle className="text-2xl text-green-600">89,240</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">71.2% approval rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-2xl text-yellow-600">28,450</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">22.7% pending review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>CFR Area Mapped</CardDescription>
              <CardTitle className="text-2xl">2,340 km²</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+8% this quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>FRA Claim Status Distribution</CardTitle>
              <CardDescription>Breakdown of claim statuses across all states</CardDescription>
            </CardHeader>
            <CardContent>
              <FRAStatusPieChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Claims by State</CardTitle>
              <CardDescription>State-wise comparison of FRA claims</CardDescription>
            </CardHeader>
            <CardContent>
              <ClaimsByStateBarChart />
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends (2024)</CardTitle>
              <CardDescription>Submission and approval trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyTrendsChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>District-level FRA Claim Density</CardTitle>
              <CardDescription>Geographic distribution of claim density</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <MiniMapPreview />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {user?.role === "admin" && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Administrative tools and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="text-sm font-medium">Generate Report</p>
                </div>
                <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-2xl mb-2">📄</div>
                  <p className="text-sm font-medium">Bulk Upload</p>
                </div>
                <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-2xl mb-2">👥</div>
                  <p className="text-sm font-medium">Manage Users</p>
                </div>
                <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-2xl mb-2">⚙️</div>
                  <p className="text-sm font-medium">System Settings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
