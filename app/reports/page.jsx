"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, BarChart3 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"
import dynamic from "next/dynamic"

// Dynamically import charts
const FRAProgressChart = dynamic(() => import("@/components/charts/fra-progress-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading chart...</p>
    </div>
  ),
})

// Mock report data
const availableReports = [
  {
    id: "monthly_summary",
    title: "Monthly FRA Summary Report",
    description: "Comprehensive overview of FRA claims processed in the selected month",
    type: "PDF",
    lastGenerated: "2024-01-15",
    size: "2.3 MB",
    category: "Summary",
  },
  {
    id: "state_wise_analysis",
    title: "State-wise Implementation Analysis",
    description: "Detailed analysis of FRA implementation across all target states",
    type: "Excel",
    lastGenerated: "2024-01-10",
    size: "5.7 MB",
    category: "Analysis",
  },
  {
    id: "village_progress",
    title: "Village-level Progress Report",
    description: "Village-wise breakdown of FRA claim status and progress",
    type: "PDF",
    lastGenerated: "2024-01-12",
    size: "8.2 MB",
    category: "Progress",
  },
  {
    id: "asset_mapping_report",
    title: "Asset Mapping & Detection Report",
    description: "AI-powered asset detection results and mapping statistics",
    type: "PDF",
    lastGenerated: "2024-01-08",
    size: "12.1 MB",
    category: "Assets",
  },
  {
    id: "dss_recommendations",
    title: "DSS Recommendations Export",
    description: "Complete list of AI-generated recommendations for development schemes",
    type: "Excel",
    lastGenerated: "2024-01-14",
    size: "3.4 MB",
    category: "DSS",
  },
  {
    id: "compliance_audit",
    title: "FRA Compliance Audit Report",
    description: "Compliance status and audit findings across all implementations",
    type: "PDF",
    lastGenerated: "2024-01-05",
    size: "6.8 MB",
    category: "Compliance",
  },
]

const reportCategories = ["All Categories", "Summary", "Analysis", "Progress", "Assets", "DSS", "Compliance"]

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedDateRange, setSelectedDateRange] = useState("last_month")
  const [selectedState, setSelectedState] = useState("all_states")
  const [generatingReport, setGeneratingReport] = useState(null)
  const { hasPermission } = useAuth()

  const filteredReports = availableReports.filter((report) => {
    if (selectedCategory === "All Categories") return true
    return report.category === selectedCategory
  })

  const handleGenerateReport = async (reportId) => {
    setGeneratingReport(reportId)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setGeneratingReport(null)
    // In a real app, this would trigger the download
    alert("Report generated successfully!")
  }

  const handleDownloadReport = (reportId) => {
    // In a real app, this would download the existing report
    alert(`Downloading report: ${reportId}`)
  }

  return (
    <ProtectedRoute requiredPermission="view_reports">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and download comprehensive FRA implementation reports</p>
          </div>

          {/* Report Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Configure parameters for report generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last_week">Last Week</SelectItem>
                      <SelectItem value="last_month">Last Month</SelectItem>
                      <SelectItem value="last_quarter">Last Quarter</SelectItem>
                      <SelectItem value="last_year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_states">All States</SelectItem>
                      <SelectItem value="madhya_pradesh">Madhya Pradesh</SelectItem>
                      <SelectItem value="tripura">Tripura</SelectItem>
                      <SelectItem value="odisha">Odisha</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FRA Progress Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>FRA Progress by Administrative Level</CardTitle>
              <CardDescription>Village → District → State level progress visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <FRAProgressChart />
            </CardContent>
          </Card>

          {/* Available Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                Showing {filteredReports.length} of {availableReports.length} reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReports.map((report) => (
                  <Card key={report.id} className="border-2 hover:border-green-200 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {report.type === "PDF" ? (
                            <FileText className="h-5 w-5 text-red-500" />
                          ) : (
                            <BarChart3 className="h-5 w-5 text-green-500" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                        </div>
                        <Badge className="text-xs">{report.category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{report.description}</p>

                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex justify-between">
                          <span>Last Generated:</span>
                          <span>{report.lastGenerated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>File Size:</span>
                          <span>{report.size}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadReport(report.id)}
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        {hasPermission("write") && (
                          <Button
                            size="sm"
                            onClick={() => handleGenerateReport(report.id)}
                            disabled={generatingReport === report.id}
                            className="flex-1"
                          >
                            {generatingReport === report.id ? "Generating..." : "Regenerate"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">24</p>
                  <p className="text-sm text-gray-600">Reports Generated</p>
                  <p className="text-xs text-gray-500">This Month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">156</p>
                  <p className="text-sm text-gray-600">Total Downloads</p>
                  <p className="text-xs text-gray-500">All Time</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">89%</p>
                  <p className="text-sm text-gray-600">Data Accuracy</p>
                  <p className="text-xs text-gray-500">Latest Reports</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">2.3s</p>
                  <p className="text-sm text-gray-600">Avg Generation</p>
                  <p className="text-xs text-gray-500">Time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
