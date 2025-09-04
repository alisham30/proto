"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const statusColors = {
  Approved: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
  "Under Review": "bg-blue-100 text-blue-800",
}

export default function PattaDetailsPopup({ patta, onClose }) {
  if (!patta) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Patta Details</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Patta Number</p>
              <p className="text-sm">{patta.pattaNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <Badge className={statusColors[patta.status] || "bg-gray-100 text-gray-800"}>{patta.status}</Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Holder Name</p>
            <p className="text-sm">{patta.holderName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Village</p>
              <p className="text-sm">{patta.village}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">District</p>
              <p className="text-sm">{patta.district}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Claim Type</p>
              <p className="text-sm">{patta.claimType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Area</p>
              <p className="text-sm">{patta.area} hectares</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Tribal Group</p>
            <p className="text-sm">{patta.tribalGroup}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Application Date</p>
              <p className="text-sm">{patta.applicationDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Survey Number</p>
              <p className="text-sm">{patta.surveyNumber}</p>
            </div>
          </div>

          {patta.remarks && (
            <div>
              <p className="text-sm font-medium text-gray-600">Remarks</p>
              <p className="text-sm text-gray-700">{patta.remarks}</p>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Button size="sm" className="flex-1">
              View Documents
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
