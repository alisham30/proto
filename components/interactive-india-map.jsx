"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Tooltip = dynamic(() => import("react-leaflet").then((mod) => mod.Tooltip), { ssr: false })

// Import Leaflet CSS
import "leaflet/dist/leaflet.css"

const createCustomIcon = async () => {
  if (typeof window !== "undefined") {
    const L = await import("leaflet")

    // Fix default icon issue
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    })

    // Create custom green icon for FRA states
    return new L.Icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }
  return null
}

const statesData = {
  "Madhya Pradesh": {
    claims: 45230,
    coordinates: [23.2599, 77.4126],
    districts: 52,
    approvedClaims: 32150,
    pendingClaims: 13080,
  },
  Tripura: {
    claims: 12450,
    coordinates: [23.9408, 91.9882],
    districts: 8,
    approvedClaims: 8920,
    pendingClaims: 3530,
  },
  Odisha: {
    claims: 38920,
    coordinates: [20.9517, 85.0985],
    districts: 30,
    approvedClaims: 27840,
    pendingClaims: 11080,
  },
  Telangana: {
    claims: 28760,
    coordinates: [18.1124, 79.0193],
    districts: 33,
    approvedClaims: 20330,
    pendingClaims: 8430,
  },
}

export default function InteractiveIndiaMap({ onStateClick }) {
  const [isClient, setIsClient] = useState(false)
  const [customIcon, setCustomIcon] = useState(null)

  useEffect(() => {
    setIsClient(true)
    createCustomIcon().then(setCustomIcon)
  }, [])

  if (!isClient) {
    return (
      <div className="h-96 bg-blue-50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading Interactive Map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-96 rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        />

        {Object.entries(statesData).map(([state, data]) => (
          <Marker
            key={state}
            position={data.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                if (onStateClick) {
                  onStateClick(state)
                }
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-48">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{state}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Claims:</span>
                    <span className="font-medium text-green-600">{data.claims.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved:</span>
                    <span className="font-medium text-green-600">{data.approvedClaims.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-medium text-yellow-600">{data.pendingClaims.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Districts:</span>
                    <span className="font-medium">{data.districts}</span>
                  </div>
                </div>
                <button
                  className="mt-3 w-full bg-green-600 text-white text-xs py-1 px-2 rounded hover:bg-green-700 transition-colors"
                  onClick={() => onStateClick && onStateClick(state)}
                >
                  View State Dashboard →
                </button>
              </div>
            </Popup>

            <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
              <div className="text-center">
                <div className="font-medium">{state}</div>
                <div className="text-xs">{data.claims.toLocaleString()} FRA Claims</div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
