"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"

// Dynamically import map component
const AssetMapOverlay = dynamic(() => import("@/components/asset-map-overlay"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading Asset Map...</p>
    </div>
  ),
})

// Mock asset detection data
const mockAssetData = {
  agriculture: {
    count: 1240,
    area: "2,340 km²",
    locations: [
      { id: "ag_001", name: "Paddy Fields - Bhopal", area: "45.2 hectares", coordinates: [23.2599, 77.4126] },
      { id: "ag_002", name: "Wheat Fields - Indore", area: "38.7 hectares", coordinates: [22.7196, 75.8577] },
      { id: "ag_003", name: "Maize Cultivation - Jabalpur", area: "52.1 hectares", coordinates: [23.1815, 79.9864] },
    ],
  },
  forest: {
    count: 890,
    area: "5,670 km²",
    locations: [
      { id: "fr_001", name: "Dense Forest - Khordha", area: "234.5 hectares", coordinates: [20.9517, 85.0985] },
      { id: "fr_002", name: "Mixed Forest - Rayagada", area: "189.3 hectares", coordinates: [19.1667, 83.4167] },
      { id: "fr_003", name: "Bamboo Grove - Warangal", area: "156.8 hectares", coordinates: [17.9689, 79.5941] },
    ],
  },
  water: {
    count: 456,
    area: "890 km²",
    locations: [
      { id: "wt_001", name: "Village Pond - Agartala", area: "2.3 hectares", coordinates: [23.8315, 91.2868] },
      { id: "wt_002", name: "Irrigation Tank - Hyderabad", area: "8.7 hectares", coordinates: [17.385, 78.4867] },
      { id: "wt_003", name: "Natural Lake - Raipur", area: "15.2 hectares", coordinates: [21.2514, 81.6296] },
    ],
  },
  homesteads: {
    count: 2340,
    area: "450 km²",
    locations: [
      { id: "hs_001", name: "Tribal Settlement - Khargone", area: "12.5 hectares", coordinates: [21.8234, 75.6102] },
      { id: "hs_002", name: "Village Cluster - Dharmanagar", area: "8.9 hectares", coordinates: [24.3667, 92.1667] },
      { id: "hs_003", name: "Forest Dwelling - Bilaspur", area: "6.7 hectares", coordinates: [22.0797, 82.1409] },
    ],
  },
}

const assetIcons = {
  agriculture: "🌾",
  forest: "🌲",
  water: "💧",
  homesteads: "🏘️",
}

const assetColors = {
  agriculture: "bg-yellow-100 text-yellow-800 border-yellow-200",
  forest: "bg-green-100 text-green-800 border-green-200",
  water: "bg-blue-100 text-blue-800 border-blue-200",
  homesteads: "bg-purple-100 text-purple-800 border-purple-200",
}

export default function AssetsPage() {
  const [selectedAssetType, setSelectedAssetType] = useState("all")
  const [selectedState, setSelectedState] = useState("all")

  const getFilteredAssets = () => {
    if (selectedAssetType === "all") {
      return Object.entries(mockAssetData)
    }
    return [[selectedAssetType, mockAssetData[selectedAssetType]]]
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Mapping</h1>
          <p className="text-gray-600">AI-powered detection and mapping of forest and agricultural assets</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={selectedAssetType} onValueChange={setSelectedAssetType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Asset Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Asset Types</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="forest">Forest Cover</SelectItem>
              <SelectItem value="water">Water Bodies</SelectItem>
              <SelectItem value="homesteads">Homesteads</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
              <SelectItem value="tripura">Tripura</SelectItem>
              <SelectItem value="odisha">Odisha</SelectItem>
              <SelectItem value="telangana">Telangana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Asset Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(mockAssetData).map(([type, data]) => (
            <Card key={type} className={`border-2 ${assetColors[type]}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{assetIcons[type]}</div>
                </div>
                <h3 className="font-semibold text-lg capitalize mb-2">{type.replace("_", " ")}</h3>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{data.count}</p>
                  <p className="text-sm text-gray-600">Total Area: {data.area}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Asset Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getFilteredAssets().map(([type, data]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">{assetIcons[type]}</span>
                  <span className="capitalize">{type.replace("_", " ")} Assets</span>
                </CardTitle>
                <CardDescription>Detected {type} locations with AI analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.locations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{location.name}</p>
                        <p className="text-xs text-gray-600">Area: {location.area}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View on Map
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Asset Map Overlay */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution Map</CardTitle>
            <CardDescription>Geographic visualization of detected assets with polygon overlays</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetMapOverlay selectedAssetType={selectedAssetType} />
          </CardContent>
        </Card>

        {/* Detection Summary */}
        <Card>
          <CardHeader>
            <CardTitle>AI Detection Summary</CardTitle>
            <CardDescription>Overview of asset detection performance and accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">4,926</p>
                <p className="text-sm text-gray-600">Total Assets Detected</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">9,350 km²</p>
                <p className="text-sm text-gray-600">Total Area Mapped</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">4 States</p>
                <p className="text-sm text-gray-600">Coverage Area</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
