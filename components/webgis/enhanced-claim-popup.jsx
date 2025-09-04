"use client"

import {
  X,
  MapPin,
  User,
  Leaf,
  Droplets,
  Cog as Cow,
  Award,
  Download,
  Phone,
  FileText,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"

export default function EnhancedClaimPopup({ claim, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "restricted":
        return "bg-red-100 text-red-800 border-red-200"
      case "no claim":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getScoreColor = (score) => {
    if (typeof score === "string") {
      if (score.toLowerCase() === "high") return "text-green-600"
      if (score.toLowerCase() === "medium" || score.toLowerCase() === "moderate") return "text-yellow-600"
      if (score.toLowerCase() === "low" || score.toLowerCase() === "limited") return "text-orange-600"
      if (score.toLowerCase() === "none") return "text-red-600"
      return "text-gray-600"
    }
    if (score >= 0.8) return "text-green-600"
    if (score >= 0.6) return "text-yellow-600"
    if (score >= 0.4) return "text-orange-600"
    return "text-red-600"
  }

  const getEnhancedSchemes = () => {
    if (!claim.suggestedSchemes) return []

    return claim.suggestedSchemes.map((scheme) => ({
      ...scheme,
      priority: scheme.eligible ? "high" : "low",
    }))
  }

  const handleDocumentDownload = (docName) => {
    const link = document.createElement("a")
    link.href = `/documents/${claim.pattaNumber}/${docName}`
    link.download = docName
    link.click()
  }

  const handleContactOwner = () => {
    alert(`Contacting ${claim.pattaHolder || "claim holder"}...`)
  }

  const enhancedSchemes = getEnhancedSchemes()

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 backdrop-blur-md" onClick={onClose} />
      <div className="relative flex items-center justify-center min-h-full p-4">
        <div className="bg-white rounded-lg shadow-xl border max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b bg-green-50">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Claim Details</h3>
                <p className="text-sm text-gray-600">{claim.pattaNumber || "No Patta Number"}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Patta Holder</p>
                  <p className="font-semibold text-lg">{claim.pattaHolder || "No Claim Filed"}</p>
                </div>
                {claim.pattaHolder && (
                  <Button size="sm" variant="outline" onClick={handleContactOwner}>
                    <Phone className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Claim Type</p>
                  <p className="font-medium">{claim.ownershipType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-medium">{claim.area} ha</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Village</p>
                  <p className="font-medium">{claim.village}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">District</p>
                  <p className="font-medium">{claim.district}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium">{claim.state}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={`${getStatusColor(claim.status)} mt-1`}>{claim.status}</Badge>
                </div>
                {claim.tribalGroup && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Tribal Group</p>
                    <p className="font-medium">{claim.tribalGroup}</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                INDICES
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Land fertility score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(claim.landFertilityScore)}`}>
                    {claim.landFertilityScore}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Soil fertility index</p>
                  <p className={`text-2xl font-bold ${getScoreColor(claim.soilFertilityIndex)}`}>
                    {claim.soilFertilityIndex}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Irrigation facility</p>
                    <p className={`font-semibold ${getScoreColor(claim.irrigationFacility)}`}>
                      {claim.irrigationFacility}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <Cow className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Cattle grazing index</p>
                    <p className={`font-semibold ${getScoreColor(claim.cattleGrazingIndex)}`}>
                      {claim.cattleGrazingIndex}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                {claim.status === "Restricted" ? "RESTRICTED AREA" : "ELIGIBLE SCHEMES"}
              </h4>

              {claim.status === "Restricted" ? (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-800 font-medium">RESTRICTED AREA</p>
                  <p className="text-red-600 text-sm mt-1">
                    Settlement is not permitted in this marked zone. This area is not eligible for schemes.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {enhancedSchemes.map((scheme, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        scheme.eligible ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={scheme.eligible ? "default" : "secondary"} className="text-xs">
                              {scheme.name}
                            </Badge>
                            {scheme.eligible && (
                              <Badge variant="outline" className="text-xs text-green-600">
                                Eligible
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{scheme.description}</p>
                        </div>
                        {scheme.eligible && (
                          <Button size="sm" variant="outline" className="ml-2 bg-transparent">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Apply
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {claim.documents && claim.documents.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Documents
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {claim.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">{doc}</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDocumentDownload(doc)}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-800">
                    <strong>Application Date:</strong> {claim.applicationDate || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-green-800">
                    <strong>Survey Number:</strong> {claim.surveyNumber || "N/A"}
                  </p>
                </div>
              </div>
              {claim.approvalDate && (
                <p className="text-green-800 mt-2">
                  <strong>Approval Date:</strong> {claim.approvalDate}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
