"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"

// Dynamically import the map component to avoid SSR issues
const InteractiveIndiaMap = dynamic(() => import("@/components/interactive-india-map"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-blue-50 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
        <p className="text-gray-500">Loading Interactive Map...</p>
      </div>
    </div>
  ),
})

// Dummy data for states
const statesData = {
  "Madhya Pradesh": { claims: 45230, coordinates: [23.2599, 77.4126] },
  Tripura: { claims: 12450, coordinates: [23.9408, 91.9882] },
  Odisha: { claims: 38920, coordinates: [20.9517, 85.0985] },
  Telangana: { claims: 28760, coordinates: [18.1124, 79.0193] },
}

export default function LandingPage() {
  const [hoveredState, setHoveredState] = useState(null)
  const router = useRouter()

  const handleStateClick = (stateName) => {
    const stateSlug = stateName.toLowerCase().replace(" ", "-")
    router.push(`/dashboard/state/${stateSlug}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                <h1 className="text-2xl font-bold text-gray-900">FRA Atlas & DSS</h1>
                <p className="text-sm text-green-600 font-medium">वन अधिकारी दृष्टि</p>
              </div>
            </div>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
            AI-powered FRA Atlas & WebGIS-based Decision Support System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Comprehensive digital platform for Forest Rights Act implementation, asset mapping, and data-driven decision
            support across tribal regions of India.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/atlas">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Explore Atlas
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              View Dashboard
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              About Project
            </Button>
          </Link>
        </div>

        {/* Interactive India Map Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">FRA Implementation States</h2>

          <div className="mb-6">
            <InteractiveIndiaMap onStateClick={handleStateClick} />
          </div>

          {/* Map Instructions */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Click on the green markers to explore state-wise FRA data and navigate to detailed dashboards
            </p>
          </div>

          {/* State Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(statesData).map(([state, data]) => (
              <Card
                key={state}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => handleStateClick(state)}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">{state}</h3>
                    <p className="text-xs text-gray-600">FRA Claims</p>
                    <p className="text-lg font-bold text-green-600">{data.claims.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">🗺️</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Interactive Atlas</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive WebGIS platform for FRA claim visualization and analysis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">🤖</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600 text-sm">
                Machine learning algorithms for asset detection and decision support
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Data Analytics</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive reporting and analytics for informed decision making
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}