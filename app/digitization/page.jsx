"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"

// Mock extracted data from uploaded documents
const mockExtractedData = [
  {
    id: "DOC_001",
    fileName: "FRA_Claim_MP_001.pdf",
    pattaHolder: "Ramesh Kumar Bhil",
    village: "Khargone",
    district: "Bhopal",
    state: "Madhya Pradesh",
    claimType: "Individual Forest Rights",
    area: "2.5 hectares",
    status: "Pending Review",
    uploadDate: "2024-01-15",
    extractedDate: "2024-01-16",
    confidence: 95,
  },
  {
    id: "DOC_002",
    fileName: "Community_Rights_TR_001.jpg",
    pattaHolder: "Tripura Tribal Council",
    village: "Agartala",
    district: "West Tripura",
    state: "Tripura",
    claimType: "Community Rights",
    area: "15.8 hectares",
    status: "Approved",
    uploadDate: "2024-01-20",
    extractedDate: "2024-01-21",
    confidence: 88,
  },
  {
    id: "DOC_003",
    fileName: "CFR_Claim_OD_001.pdf",
    pattaHolder: "Kondh Forest Committee",
    village: "Rayagada",
    district: "Khordha",
    state: "Odisha",
    claimType: "Community Forest Resource",
    area: "45.2 hectares",
    status: "Needs Correction",
    uploadDate: "2024-01-25",
    extractedDate: "2024-01-26",
    confidence: 76,
  },
]

const statusColors = {
  "Pending Review": "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  "Needs Correction": "bg-orange-100 text-orange-800",
}

export default function DigitizationPage() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [extractedData, setExtractedData] = useState(mockExtractedData)
  const [editingRow, setEditingRow] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const { hasPermission } = useAuth()

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
  }

  const processUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload and processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    // Simulate adding new extracted data
    const newData = selectedFiles.map((file, index) => ({
      id: `DOC_${Date.now()}_${index}`,
      fileName: file.name,
      pattaHolder: "Processing...",
      village: "Processing...",
      district: "Processing...",
      state: "Processing...",
      claimType: "Processing...",
      area: "Processing...",
      status: "Processing",
      uploadDate: new Date().toISOString().split("T")[0],
      extractedDate: new Date().toISOString().split("T")[0],
      confidence: Math.floor(Math.random() * 20) + 80,
    }))

    setExtractedData([...newData, ...extractedData])
    setSelectedFiles([])
    setIsUploading(false)
    setUploadProgress(0)
  }

  const handleStatusChange = (id, newStatus) => {
    setExtractedData(extractedData.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
  }

  const handleEdit = (id) => {
    setEditingRow(id)
  }

  const handleSave = (id) => {
    setEditingRow(null)
    // In a real app, this would save to the backend
  }

  const handleReject = (id) => {
    handleStatusChange(id, "Rejected")
  }

  const handleApprove = (id) => {
    handleStatusChange(id, "Approved")
  }

  return (
    <ProtectedRoute requiredPermission="write">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Digitization</h1>
            <p className="text-gray-600">Upload and process FRA documents using AI-powered extraction</p>
          </div>

          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Upload scanned FRA documents (PDF, JPG, PNG) for automated data extraction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="documents">Select Documents</Label>
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected Files:</p>
                  <div className="space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing documents...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <Button onClick={processUpload} disabled={selectedFiles.length === 0 || isUploading} className="w-full">
                {isUploading ? "Processing..." : "Upload & Extract Data"}
              </Button>
            </CardContent>
          </Card>

          {/* Extracted Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Extracted Data</CardTitle>
              <CardDescription>Review and validate AI-extracted information from uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Patta Holder</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>Claim Type</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extractedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{item.fileName}</p>
                            <p className="text-xs text-gray-500">Uploaded: {item.uploadDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {editingRow === item.id ? (
                            <Input defaultValue={item.pattaHolder} className="w-full" />
                          ) : (
                            item.pattaHolder
                          )}
                        </TableCell>
                        <TableCell>
                          {editingRow === item.id ? (
                            <Input defaultValue={item.village} className="w-full" />
                          ) : (
                            <div>
                              <p>{item.village}</p>
                              <p className="text-xs text-gray-500">
                                {item.district}, {item.state}
                              </p>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingRow === item.id ? (
                            <Select defaultValue={item.claimType}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Individual Forest Rights">Individual Forest Rights</SelectItem>
                                <SelectItem value="Community Rights">Community Rights</SelectItem>
                                <SelectItem value="Community Forest Resource">Community Forest Resource</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            item.claimType
                          )}
                        </TableCell>
                        <TableCell>
                          {editingRow === item.id ? <Input defaultValue={item.area} className="w-full" /> : item.area}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[item.status] || "bg-gray-100 text-gray-800"}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {editingRow === item.id ? (
                              <>
                                <Button size="sm" onClick={() => handleSave(item.id)}>
                                  Save
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingRow(null)}>
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                {hasPermission("write") && (
                                  <Button size="sm" variant="outline" onClick={() => handleEdit(item.id)}>
                                    Edit
                                  </Button>
                                )}
                                {hasPermission("write") && item.status !== "Approved" && (
                                  <Button size="sm" onClick={() => handleApprove(item.id)}>
                                    Approve
                                  </Button>
                                )}
                                {hasPermission("write") && item.status !== "Rejected" && (
                                  <Button size="sm" variant="destructive" onClick={() => handleReject(item.id)}>
                                    Reject
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{extractedData.length}</p>
                  <p className="text-sm text-gray-600">Total Documents</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {extractedData.filter((item) => item.status === "Approved").length}
                  </p>
                  <p className="text-sm text-gray-600">Approved</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {extractedData.filter((item) => item.status === "Pending Review").length}
                  </p>
                  <p className="text-sm text-gray-600">Pending Review</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
