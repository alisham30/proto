"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Polygon = dynamic(() => import("react-leaflet").then((mod) => mod.Polygon), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

import "leaflet/dist/leaflet.css"

// Mock asset polygons data
const assetPolygons = {
  agriculture: [
    {
      id: "ag_poly_001",
      name: "Paddy Fields - Bhopal",
      coordinates: [
        [23.26, 77.41],
        [23.265, 77.41],
        [23.265, 77.415],
        [23.26, 77.415],
      ],
      area: "45.2 hectares",
      color: "#eab308",
    },
    {
      id: "ag_poly_002",
      name: "Wheat Fields - Indore",
      coordinates: [
        [22.72, 75.855],
        [22.725, 75.855],
        [22.725, 75.86],
        [22.72, 75.86],
      ],
      area: "38.7 hectares",
      color: "#eab308",
    },
  ],
  forest: [
    {
      id: "fr_poly_001",
      name: "Dense Forest - Khordha",
      coordinates: [
        [20.95, 85.095],
        [20.955, 85.095],
        [20.955, 85.1],
        [20.95, 85.1],
      ],
      area: "234.5 hectares",
      color: "#059669",
    },
  ],
  water: [
    {
      id: "wt_poly_001",
      name: "Village Pond - Agartala",
      coordinates: [
        [23.83, 91.285],
        [23.835, 91.285],
        [23.835, 91.29],
        [23.83, 91.29],
      ],
      area: "2.3 hectares",
      color: "#0ea5e9",
    },
  ],
  homesteads: [
    {
      id: "hs_poly_001",
      name: "Tribal Settlement - Khargone",
      coordinates: [
        [21.82, 75.605],
        [21.825, 75.605],
        [21.825, 75.615],
        [21.82, 75.615],
      ],
      area: "12.5 hectares",
      color: "#8b5cf6",
    },
  ],
}

export default function AssetMapOverlay({ selectedAssetType }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-96 bg-blue-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">Loading Asset Map...</p>
        </div>
      </div>
    )
  }

  const getVisiblePolygons = () => {
    if (selectedAssetType === "all") {
      return Object.values(assetPolygons).flat()
    }
    return assetPolygons[selectedAssetType] || []
  }

  return (
    <div className="h-96 rounded-lg overflow-hidden">
      <MapContainer
        center={[21.7679, 78.8718]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        />

        {getVisiblePolygons().map((polygon) => (
          <Polygon
            key={polygon.id}
            positions={polygon.coordinates}
            fillColor={polygon.color}
            color={polygon.color}
            weight={2}
            opacity={0.8}
            fillOpacity={0.4}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">{polygon.name}</h3>
                <p className="text-xs">Area: {polygon.area}</p>
              </div>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  )
}
