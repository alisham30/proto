"use client"

import { useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// State data mapping
const stateDataMap = {
  "madhya-pradesh": {
    name: "Madhya Pradesh",
    claims: 45230,
    approved: 32150,
    pending: 13080,
    districts: 52,
    villages: 1240,
    area: "2,340 km²",
  },
  tripura: {
    name: "Tripura",
    claims: 12450,
    approved: 8920,
    pending: 3530,
    districts: 8,
    villages: 320,
    area: "890 km²",
  },
  odisha: {
    name: "Odisha",
    claims: 38920,
    approved: 27840,
    pending: 11080,
    districts: 30,
    villages: 980,
    area: "1,980 km²",
  },
  telangana: {
    name: "Telangana",
    claims: 28760,
    approved: 20330,
    pending: 8430,
    districts: 33,
    villages: 750,
    area: "1,560 km²",
  },
}

export default function StateDashboard() {
  const params = useParams()
  const stateSlug = params.slug
  const stateData = stateDataMap[stateSlug]

  if (!stateData) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">State Not Found</h1>
          <p className="text-gray-600 mb-6">The requested state dashboard could not be found.</p>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{stateData.name} Dashboard</h1>
            <p className="text-gray-600">FRA implementation overview and statistics</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">← Back to Overview</Button>
          </Link>
        </div>

        {/* State Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Claims</CardDescription>
              <CardTitle className="text-2xl">{stateData.claims.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Across {stateData.districts} districts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Approved Claims</CardDescription>
              <CardTitle className="text-2xl text-green-600">{stateData.approved.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {Math.round((stateData.approved / stateData.claims) * 100)}% approval rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Claims</CardDescription>
              <CardTitle className="text-2xl text-yellow-600">{stateData.pending.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {Math.round((stateData.pending / stateData.claims) * 100)}% pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>CFR Area</CardDescription>
              <CardTitle className="text-2xl">{stateData.area}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{stateData.villages} villages covered</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>District-wise Claims Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">District-wise Bar Chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Claim Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Status Pie Chart</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* State Map */}
        <Card>
          <CardHeader>
            <CardTitle>{stateData.name} FRA Claims Map</CardTitle>
            <CardDescription>District-level visualization of FRA implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">State-level Interactive Map</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
