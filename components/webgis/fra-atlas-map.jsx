"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Rectangle = dynamic(() => import("react-leaflet").then((mod) => mod.Rectangle), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

import "leaflet/dist/leaflet.css"

const mockFRARegions = [
  {
    id: "region_001",
    bounds: [
      [23.2, 77.3],
      [23.4, 77.6],
    ], // Madhya Pradesh region
    pattaHolder: "Ramesh Kumar Bhil",
    ownershipType: "Individual Forest Rights (IFR)",
    claimType: "IFR",
    village: "Khargone",
    district: "Bhopal",
    state: "Madhya Pradesh",
    area: 2.5,
    status: "Approved",
    tribalGroup: "Bhil",
    landFertilityScore: 0.78,
    soilFertilityIndex: "High",
    irrigationFacility: "Moderate",
    cattleGrazingIndex: 0.62,
    pattaNumber: "MP/IFR/2024/001",
    applicationDate: "2024-01-15",
    approvalDate: "2024-03-20",
    surveyNumber: "Survey-123",
    documents: ["Land_Survey_Report.pdf", "Tribal_Certificate.pdf", "Application_Form.pdf"],
  },
  {
    id: "region_002",
    bounds: [
      [23.8, 91.8],
      [24.1, 92.1],
    ], // Tripura region
    pattaHolder: "Tripura Tribal Council",
    ownershipType: "Community Rights (CR)",
    claimType: "CR",
    village: "Agartala",
    district: "West Tripura",
    state: "Tripura",
    area: 15.8,
    status: "Pending",
    tribalGroup: "Tripuri",
    landFertilityScore: 0.65,
    soilFertilityIndex: "Medium",
    irrigationFacility: "Limited",
    cattleGrazingIndex: 0.45,
    pattaNumber: "TR/CR/2024/001",
    applicationDate: "2024-02-20",
    documents: ["Community_Application.pdf", "Village_Resolution.pdf"],
  },
  {
    id: "region_003",
    bounds: [
      [20.8, 85.0],
      [21.1, 85.3],
    ], // Odisha region
    pattaHolder: "Kondh Forest Committee",
    ownershipType: "Community Forest Resource (CFR)",
    claimType: "CFR",
    village: "Rayagada",
    district: "Khordha",
    state: "Odisha",
    area: 45.2,
    status: "Approved",
    tribalGroup: "Kondh",
    landFertilityScore: 0.85,
    soilFertilityIndex: "High",
    irrigationFacility: "Good",
    cattleGrazingIndex: 0.72,
    pattaNumber: "OD/CFR/2024/001",
    applicationDate: "2024-01-10",
    approvalDate: "2024-02-15",
    documents: ["Forest_Management_Plan.pdf", "CFR_Certificate.pdf", "Boundary_Survey.pdf"],
  },
  {
    id: "region_004",
    bounds: [
      [18.0, 78.9],
      [18.3, 79.2],
    ], // Telangana region
    pattaHolder: "Lakshmi Devi Gond",
    ownershipType: "Individual Forest Rights (IFR)",
    claimType: "IFR",
    village: "Warangal",
    district: "Hyderabad",
    state: "Telangana",
    area: 1.8,
    status: "Restricted",
    tribalGroup: "Gond",
    landFertilityScore: 0.45,
    soilFertilityIndex: "Low",
    irrigationFacility: "None",
    cattleGrazingIndex: 0.25,
    pattaNumber: "TG/IFR/2024/002",
    applicationDate: "2024-03-05",
    documents: ["Rejection_Notice.pdf"],
  },
  {
    id: "region_005",
    bounds: [
      [22.5, 88.2],
      [22.8, 88.5],
    ], // No claim region
    pattaHolder: null,
    ownershipType: "No Claim Filed",
    claimType: "No Claim",
    village: "Sundarbans",
    district: "South 24 Parganas",
    state: "West Bengal",
    area: 12.3,
    status: "No Claim",
    tribalGroup: null,
    landFertilityScore: 0.55,
    soilFertilityIndex: "Medium",
    irrigationFacility: "Seasonal",
    cattleGrazingIndex: 0.35,
    documents: [],
  },
]

const getStatusColor = (status) => {
  switch (status) {
    case "Approved":
      return "#16a34a" // Green
    case "Pending":
      return "#eab308" // Yellow
    case "Restricted":
      return "#dc2626" // Red
    case "No Claim":
      return "#3b82f6" // Blue
    default:
      return "#6b7280" // Gray
  }
}

const getSuggestedSchemes = (region) => {
  const schemes = []

  if (region.landFertilityScore > 0.6) {
    schemes.push({
      name: "PM-Kisan",
      description: "Individual claim with good land fertility suitable for direct farmer support.",
      eligible: true,
    })
  }

  if (region.irrigationFacility === "Limited" || region.irrigationFacility === "None") {
    schemes.push({
      name: "Jal Jeevan Mission (JJM)",
      description: "Limited irrigation facilities indicate water access improvement is needed.",
      eligible: true,
    })
  }

  if (region.tribalGroup && region.status === "Approved") {
    schemes.push({
      name: "Pradhan Mantri Aadi Adarsh Gram Yojana (PMAAGY)",
      description: "Approved tribal claim eligible for model village development.",
      eligible: true,
    })
  }

  if (region.soilFertilityIndex === "Low" || region.soilFertilityIndex === "Medium") {
    schemes.push({
      name: "National Mission on Sustainable Agriculture (NMSA)",
      description: "Soil fertility improvement needed for sustainable agriculture.",
      eligible: true,
    })
  }

  schemes.push({
    name: "PMAY-G (Pradhan Mantri Awas Yojana – Gramin)",
    description: "Rural housing scheme for eligible tribal families.",
    eligible: region.tribalGroup !== null,
  })

  schemes.push({
    name: "PMGSY (Pradhan Mantri Gram Sadak Yojana)",
    description: "Rural road connectivity for remote tribal areas.",
    eligible: true,
  })

  return schemes
}

export default function FRAAtlasMap({ activeLayers, filters, onClaimClick, useSatellite = true }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filterRegions = (regions) => {
    return regions.filter((region) => {
      if (filters.state !== "All States" && region.state !== filters.state) return false
      if (filters.district !== "All Districts" && region.district !== filters.district) return false
      if (filters.village && !region.village.toLowerCase().includes(filters.village.toLowerCase())) return false
      if (filters.tribalGroup !== "All Tribal Groups" && region.tribalGroup !== filters.tribalGroup) return false
      return true
    })
  }

  if (!isClient) {
    return (
      <div className="h-full bg-blue-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading Satellite Map...</p>
        </div>
      </div>
    )
  }

  const filteredRegions = filterRegions(mockFRARegions)

  return (
    <div className="h-full rounded-lg overflow-hidden">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        />

        {filteredRegions.map((region) => {
          const statusColor = getStatusColor(region.status)

          return (
            <Rectangle
              key={region.id}
              bounds={region.bounds}
              pathOptions={{
                fillColor: statusColor,
                fillOpacity: 0.4,
                color: statusColor,
                weight: 3,
                opacity: 0.8,
              }}
              eventHandlers={{
                click: () => {
                  const enhancedClaim = {
                    ...region,
                    suggestedSchemes: getSuggestedSchemes(region),
                  }
                  onClaimClick(enhancedClaim)
                },
              }}
            />
          )
        })}
      </MapContainer>
    </div>
  )
}
