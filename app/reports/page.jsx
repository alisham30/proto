"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, BarChart3, Calendar, HardDrive, RefreshCw, TrendingUp, Shield, MapPin, FileSpreadsheet, FileCheck, Clock, Zap } from "lucide-react"
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
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Reports & Analytics
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Generate and download comprehensive FRA implementation reports with real-time insights
            </p>
          </div>

          {/* Report Filters */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Report Configuration</CardTitle>
                  <CardDescription>Configure parameters for report generation and filtering</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FileCheck className="h-4 w-4" />
                    <span>Category</span>
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500">
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

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date Range</span>
                  </label>
                  <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                    <SelectTrigger className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500">
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

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>State</span>
                  </label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500">
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
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">FRA Progress by Administrative Level</CardTitle>
                  <CardDescription>Village → District → State level progress visualization</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FRAProgressChart />
            </CardContent>
          </Card>

          {/* Available Reports */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Available Reports</CardTitle>
                    <CardDescription>
                      Showing {filteredReports.length} of {availableReports.length} reports
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                  {filteredReports.length} Reports
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => {
                  const getCategoryIcon = (category) => {
                    switch (category) {
                      case "Summary": return <FileCheck className="h-4 w-4" />
                      case "Analysis": return <TrendingUp className="h-4 w-4" />
                      case "Progress": return <Clock className="h-4 w-4" />
                      case "Assets": return <MapPin className="h-4 w-4" />
                      case "DSS": return <Zap className="h-4 w-4" />
                      case "Compliance": return <Shield className="h-4 w-4" />
                      default: return <FileText className="h-4 w-4" />
                    }
                  }

                  const getCategoryColor = (category) => {
                    switch (category) {
                      case "Summary": return "bg-blue-100 text-blue-800 border-blue-200"
                      case "Analysis": return "bg-purple-100 text-purple-800 border-purple-200"
                      case "Progress": return "bg-green-100 text-green-800 border-green-200"
                      case "Assets": return "bg-orange-100 text-orange-800 border-orange-200"
                      case "DSS": return "bg-indigo-100 text-indigo-800 border-indigo-200"
                      case "Compliance": return "bg-red-100 text-red-800 border-red-200"
                      default: return "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  }

                  const getTypeIcon = (type) => {
                    return type === "PDF" ? (
                      <FileText className="h-5 w-5 text-red-500" />
                    ) : (
                      <FileSpreadsheet className="h-5 w-5 text-green-500" />
                    )
                  }

                  return (
                    <Card key={report.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                              {getTypeIcon(report.type)}
                            </div>
                            <Badge variant="outline" className="text-xs font-medium px-2 py-1">
                              {report.type}
                            </Badge>
                          </div>
                          <Badge className={`text-xs font-medium px-3 py-1 ${getCategoryColor(report.category)}`}>
                            <div className="flex items-center space-x-1">
                              {getCategoryIcon(report.category)}
                              <span>{report.category}</span>
                            </div>
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-tight">
                          {report.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed">{report.description}</p>

                        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Last Generated</span>
                            </div>
                            <span className="font-medium text-gray-900">{report.lastGenerated}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <HardDrive className="h-4 w-4" />
                              <span>File Size</span>
                            </div>
                            <span className="font-medium text-gray-900">{report.size}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadReport(report.id)}
                            className="flex-1 bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 transition-all duration-200"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          {hasPermission("write") && (
                            <Button
                              size="sm"
                              onClick={() => handleGenerateReport(report.id)}
                              disabled={generatingReport === report.id}
                              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                            >
                              {generatingReport === report.id ? (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Regenerate
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-blue-700">24</p>
                    <p className="text-sm font-medium text-blue-600">Reports Generated</p>
                    <p className="text-xs text-blue-500 mt-1">This Month</p>
                  </div>
                  <div className="p-3 bg-blue-200 rounded-full group-hover:bg-blue-300 transition-colors">
                    <FileText className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-700">156</p>
                    <p className="text-sm font-medium text-green-600">Total Downloads</p>
                    <p className="text-xs text-green-500 mt-1">All Time</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-full group-hover:bg-green-300 transition-colors">
                    <Download className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-purple-700">89%</p>
                    <p className="text-sm font-medium text-purple-600">Data Accuracy</p>
                    <p className="text-xs text-purple-500 mt-1">Latest Reports</p>
                  </div>
                  <div className="p-3 bg-purple-200 rounded-full group-hover:bg-purple-300 transition-colors">
                    <Shield className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-orange-700">2.3s</p>
                    <p className="text-sm font-medium text-orange-600">Avg Generation</p>
                    <p className="text-xs text-orange-500 mt-1">Time</p>
                  </div>
                  <div className="p-3 bg-orange-200 rounded-full group-hover:bg-orange-300 transition-colors">
                    <Zap className="h-6 w-6 text-orange-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
