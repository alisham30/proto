"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import dynamic from "next/dynamic"

// Dynamically import WebGIS components
const FRAAtlasMap = dynamic(() => import("@/components/webgis/fra-atlas-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading Satellite Map...</p>
    </div>
  ),
})

const EnhancedClaimPopup = dynamic(() => import("@/components/webgis/enhanced-claim-popup"), { ssr: false })

export default function AtlasPage() {
  const [activeLayers, setActiveLayers] = useState([
    "Individual Rights (IFR)",
    "Community Rights (CR)",
    "CFR",
    "Asset Layers",
  ])
  const [filters, setFilters] = useState({
    state: "All States",
    district: "All Districts",
    village: "",
    tribalGroup: "All Tribal Groups",
  })
  const [selectedClaim, setSelectedClaim] = useState(null)

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleLayerToggle = (layer) => {
    setActiveLayers((prev) => (prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]))
  }

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim)
  }

  const closeClaimDetails = () => {
    setSelectedClaim(null)
  }

  const clearAllFilters = () => {
    setFilters({
      state: "All States",
      district: "All Districts",
      village: "",
      tribalGroup: "All Tribal Groups",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">FRA Atlas (WebGIS)</h1>

          {/* Horizontal Filters */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">State</label>
                  <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All States">All</SelectItem>
                      <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                      <SelectItem value="Tripura">Tripura</SelectItem>
                      <SelectItem value="Odisha">Odisha</SelectItem>
                      <SelectItem value="Telangana">Telangana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">District</label>
                  <Select value={filters.district} onValueChange={(value) => handleFilterChange("district", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Districts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Districts">All</SelectItem>
                      <SelectItem value="Balaghat">Balaghat</SelectItem>
                      <SelectItem value="Dindori">Dindori</SelectItem>
                      <SelectItem value="Khargone">Khargone</SelectItem>
                      <SelectItem value="Mayurbhanj">Mayurbhanj</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Village</label>
                  <Input
                    placeholder="Search village..."
                    value={filters.village}
                    onChange={(e) => handleFilterChange("village", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Tribal Group</label>
                  <Select
                    value={filters.tribalGroup}
                    onValueChange={(value) => handleFilterChange("tribalGroup", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Tribal Groups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Tribal Groups">All</SelectItem>
                      <SelectItem value="Gond">Gond</SelectItem>
                      <SelectItem value="Baiga">Baiga</SelectItem>
                      <SelectItem value="Bhil">Bhil</SelectItem>
                      <SelectItem value="Santhal">Santhal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Layer Toggle Buttons */}
              <div className="flex flex-wrap gap-2">
                {["Individual Rights (IFR)", "Community Rights (CR)", "CFR", "Asset Layers"].map((layer) => (
                  <Button
                    key={layer}
                    variant={activeLayers.includes(layer) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLayerToggle(layer)}
                    className="text-xs"
                  >
                    {layer}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-[700px]">
          <CardContent className="p-0 h-full">
            <FRAAtlasMap
              activeLayers={activeLayers}
              filters={filters}
              onClaimClick={handleClaimClick}
              useSatellite={true}
            />
          </CardContent>
        </Card>
      </div>

      {selectedClaim && <EnhancedClaimPopup claim={selectedClaim} onClose={closeClaimDetails} />}
    </DashboardLayout>
  )
}
