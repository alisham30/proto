"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const filterData = {
  states: ["All States", "Madhya Pradesh", "Tripura", "Odisha", "Telangana"],
  districts: {
    "Madhya Pradesh": ["All Districts", "Bhopal", "Indore", "Jabalpur", "Gwalior"],
    Tripura: ["All Districts", "West Tripura", "Gomati", "Sepahijala", "South Tripura"],
    Odisha: ["All Districts", "Khordha", "Cuttack", "Puri", "Ganjam"],
    Telangana: ["All Districts", "Hyderabad", "Rangareddy", "Medchal", "Warangal"],
  },
  tribalGroups: ["All Tribal Groups", "Gond", "Bhil", "Santhal", "Oraon", "Mina", "Kondh", "Sahariya", "Korku"],
}

export default function MapFilters({ onFilterChange, filters }) {
  const [localFilters, setLocalFilters] = useState({
    state: "All States",
    district: "All Districts",
    village: "",
    tribalGroup: "All Tribal Groups",
    claimStatus: "All Status",
    ...filters,
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }

    // Reset district when state changes
    if (key === "state" && value !== localFilters.state) {
      newFilters.district = "All Districts"
    }

    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters = {
      state: "All States",
      district: "All Districts",
      village: "",
      tribalGroup: "All Tribal Groups",
      claimStatus: "All Status",
    }
    setLocalFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const getDistrictOptions = () => {
    if (localFilters.state === "All States") {
      return ["All Districts"]
    }
    return filterData.districts[localFilters.state] || ["All Districts"]
  }

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={localFilters.state} onValueChange={(value) => handleFilterChange("state", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterData.states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Select
            value={localFilters.district}
            onValueChange={(value) => handleFilterChange("district", value)}
            disabled={localFilters.state === "All States"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getDistrictOptions().map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="village">Village</Label>
          <Input
            id="village"
            placeholder="Search village..."
            value={localFilters.village}
            onChange={(e) => handleFilterChange("village", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tribalGroup">Tribal Group</Label>
          <Select value={localFilters.tribalGroup} onValueChange={(value) => handleFilterChange("tribalGroup", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterData.tribalGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="claimStatus">Claim Status</Label>
          <Select value={localFilters.claimStatus} onValueChange={(value) => handleFilterChange("claimStatus", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
