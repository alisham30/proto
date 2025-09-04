"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const mockRecommendations = [
  {
    id: "DSS_001",
    village: "Khargone",
    issueDetected: "Low Water Index",
    recommendedScheme: "Jal Jeevan Mission",
    priority: "High",
    status: "Pending Approval",
  },
  {
    id: "DSS_002",
    village: "Rayagada",
    issueDetected: "Poor Connectivity",
    recommendedScheme: "PM Gati Shakti",
    priority: "Medium",
    status: "Under Review",
  },
  {
    id: "DSS_003",
    village: "Agartala",
    issueDetected: "Lack of Healthcare",
    recommendedScheme: "Ayushman Bharat",
    priority: "High",
    status: "Approved",
  },
  {
    id: "DSS_004",
    village: "Warangal",
    issueDetected: "Educational Gap",
    recommendedScheme: "Samagra Shiksha",
    priority: "Medium",
    status: "Implementation",
  },
  {
    id: "DSS_005",
    village: "Dharmanagar",
    issueDetected: "Livelihood Issues",
    recommendedScheme: "MGNREGA Plus",
    priority: "High",
    status: "Pending Approval",
  },
]

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
}

const statusColors = {
  "Pending Approval": "bg-yellow-100 text-yellow-800",
  "Under Review": "bg-blue-100 text-blue-800",
  Approved: "bg-green-100 text-green-800",
  Implementation: "bg-purple-100 text-purple-800",
  Completed: "bg-gray-100 text-gray-800",
}

export default function DSSPage() {
  const [recommendations, setRecommendations] = useState(mockRecommendations)
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterState, setFilterState] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesPriority = filterPriority === "all" || rec.priority === filterPriority
    const matchesState = filterState === "all" || rec.state === filterState
    const matchesSearch =
      searchTerm === "" ||
      rec.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.issueDetected.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.recommendedScheme.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesPriority && matchesState && matchesSearch
  })

  const handleStatusUpdate = (id, newStatus) => {
    setRecommendations(recommendations.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec)))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Decision Support System</h1>
          <p className="text-gray-600">AI-powered recommendations for FRA villages and development schemes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{recommendations.length}</p>
                <p className="text-sm text-gray-600">Total Recommendations</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {recommendations.filter((r) => r.priority === "High").length}
                </p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {recommendations.filter((r) => r.status === "Approved").length}
                </p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search villages, issues, or schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Showing {filteredRecommendations.length} of {recommendations.length} recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Village</TableHead>
                    <TableHead>Issue Detected</TableHead>
                    <TableHead>Recommended Scheme</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecommendations.map((rec) => (
                    <TableRow key={rec.id}>
                      <TableCell>
                        <p className="font-medium">{rec.village}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{rec.issueDetected}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{rec.recommendedScheme}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityColors[rec.priority]}>{rec.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[rec.status]}>{rec.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {rec.status === "Pending Approval" && (
                            <Button size="sm" onClick={() => handleStatusUpdate(rec.id, "Approved")}>
                              Approve
                            </Button>
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

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Insights & Trends</CardTitle>
            <CardDescription>Key patterns and recommendations from AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Top Issues Identified</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Water Scarcity</span>
                    <Badge variant="outline">35%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Poor Connectivity</span>
                    <Badge variant="outline">28%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Healthcare Access</span>
                    <Badge variant="outline">22%</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recommended Schemes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Jal Jeevan Mission</span>
                    <Badge variant="outline">8 villages</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">PM Gati Shakti</span>
                    <Badge variant="outline">6 villages</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">MGNREGA Plus</span>
                    <Badge variant="outline">5 villages</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
