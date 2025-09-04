"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const CircleMarker = dynamic(() => import("react-leaflet").then((mod) => mod.CircleMarker), { ssr: false })
const Tooltip = dynamic(() => import("react-leaflet").then((mod) => mod.Tooltip), { ssr: false })

import "leaflet/dist/leaflet.css"

// Mock district-level data for FRA claim density
const districtData = [
  { name: "Bhopal", coordinates: [23.2599, 77.4126], claims: 2340, density: "high" },
  { name: "Indore", coordinates: [22.7196, 75.8577], claims: 1890, density: "high" },
  { name: "Jabalpur", coordinates: [23.1815, 79.9864], claims: 1560, density: "medium" },
  { name: "Gwalior", coordinates: [26.2183, 78.1828], claims: 1230, density: "medium" },
  { name: "Raipur", coordinates: [21.2514, 81.6296], claims: 2100, density: "high" },
  { name: "Bilaspur", coordinates: [22.0797, 82.1409], claims: 1670, density: "medium" },
  { name: "Hyderabad", coordinates: [17.385, 78.4867], claims: 2890, density: "high" },
  { name: "Warangal", coordinates: [17.9689, 79.5941], claims: 1450, density: "medium" },
  { name: "Agartala", coordinates: [23.8315, 91.2868], claims: 980, density: "low" },
  { name: "Dharmanagar", coordinates: [24.3667, 92.1667], claims: 560, density: "low" },
]

const getDensityColor = (density) => {
  switch (density) {
    case "high":
      return "#dc2626" // red
    case "medium":
      return "#eab308" // yellow
    case "low":
      return "#16a34a" // green
    default:
      return "#6b7280" // gray
  }
}

const getDensityRadius = (density) => {
  switch (density) {
    case "high":
      return 12
    case "medium":
      return 8
    case "low":
      return 5
    default:
      return 3
  }
}

export default function MiniMapPreview() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-64 bg-blue-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">Loading Map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-64 rounded-lg overflow-hidden">
      <MapContainer
        center={[21.7679, 78.8718]} // Center of India
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        />

        {districtData.map((district, index) => (
          <CircleMarker
            key={index}
            center={district.coordinates}
            radius={getDensityRadius(district.density)}
            fillColor={getDensityColor(district.density)}
            color={getDensityColor(district.density)}
            weight={2}
            opacity={0.8}
            fillOpacity={0.6}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
              <div className="text-center">
                <div className="font-medium text-sm">{district.name}</div>
                <div className="text-xs">{district.claims} claims</div>
                <div className="text-xs capitalize">{district.density} density</div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow-lg text-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span>High Density</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Medium Density</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span>Low Density</span>
          </div>
        </div>
      </div>
    </div>
  )
}
