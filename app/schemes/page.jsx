"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, TrendingUp, Users, FileText, MapPin, Calendar, Activity, ArrowLeft } from "lucide-react";
import Link from "next/link";

const governmentSchemes = [
  {
    id: 1,
    name: "Dharti Aaba Janjatiya Gram Utkarsh Abhiyan (DAJGUA / PM JUGA)",
    description: "A large-scale convergence mission targeting over 5 crore tribal people across ~63,843 villages, spanning 25 interventions from 17 ministries.",
    status: "Active",
    category: "Tribal Development",
    department: "Ministry of Tribal Affairs",
    progress: 78,
    villages: "63,843",
    ministries: "17",
    interventions: "25",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    name: "Eklavya Model Residential Schools (EMRS)",
    description: "Residential schools providing quality education (Class VI–XII) in tribal-dominated blocks with high ST populations.",
    status: "Active",
    category: "Education",
    department: "Ministry of Tribal Affairs",
    progress: 85,
    schools: "740+",
    students: "3.5L+",
    lastUpdated: "2024-01-12"
  },
  {
    id: 3,
    name: "Jal Jeevan Mission (JJM)",
    description: "Aimed at ensuring tap water supply to rural households—crucial for FRA villages and tribal habitations.",
    status: "Active",
    category: "Water & Sanitation",
    department: "Ministry of Jal Shakti",
    progress: 92,
    households: "19.2Cr",
    villages: "6.4L",
    lastUpdated: "2024-01-14"
  },
  {
    id: 4,
    name: "PM KISAN Samman Nidhi",
    description: "Provides income support to small and marginal farmers, including many FRA landholders.",
    status: "Active",
    category: "Agriculture",
    department: "Ministry of Agriculture",
    progress: 95,
    farmers: "11.5Cr",
    installments: "15",
    lastUpdated: "2024-01-10"
  },
  {
    id: 5,
    name: "DAJGUA-linked FRA Cells",
    description: "District and state-level administrative units set up under DAJGUA to facilitate digitization, mapping, and claim processing under the FRA.",
    status: "Active",
    category: "Administrative",
    department: "Ministry of Tribal Affairs",
    progress: 65,
    districts: "500+",
    states: "28",
    lastUpdated: "2024-01-08"
  },
  {
    id: 6,
    name: "Pradhan Mantri Van Dhan Vikas Yojana (Van Dhan)",
    description: "Promotes value addition for forest produce through tribal self-help groups and Van Dhan Kendras.",
    status: "Active",
    category: "Livelihood",
    department: "Ministry of Tribal Affairs",
    progress: 70,
    kendras: "50,000+",
    shgs: "1.5L+",
    lastUpdated: "2024-01-11"
  },
  {
    id: 7,
    name: "Minimum Support Price for Minor Forest Produce (MSP for MFP)",
    description: "Ensures fair pricing for tribal gatherers, supported by procurement and storage infrastructure.",
    status: "Active",
    category: "Economic Support",
    department: "Ministry of Tribal Affairs",
    progress: 88,
    products: "50+",
    states: "25",
    lastUpdated: "2024-01-09"
  },
  {
    id: 8,
    name: "Tribal Forest Dwellers Empowerment Scheme (under NSTFDC)",
    description: "Offers awareness programs, training, concessional loans (up to ₹2 lakh @4% interest) and market linkages for FRA-recognized forest dwellers.",
    status: "Active",
    category: "Financial Support",
    department: "NSTFDC",
    progress: 60,
    beneficiaries: "2L+",
    loans: "₹400Cr+",
    lastUpdated: "2024-01-07"
  },
  {
    id: 9,
    name: "NSTFDC Loan Schemes",
    description: "Multiple loan schemes including AMSY, SHG microcredit, and ASRY for tribal development.",
    status: "Active",
    category: "Financial Support",
    department: "NSTFDC",
    progress: 75,
    schemes: "4",
    beneficiaries: "5L+",
    lastUpdated: "2024-01-06"
  },
  {
    id: 10,
    name: "TRIFED Initiatives",
    description: "Includes marketing support (Tribes India, Aadi Mahotsav), Van Dhan Kendras, and 'Tech for Tribals' entrepreneurship training.",
    status: "Active",
    category: "Marketing & Training",
    department: "TRIFED",
    progress: 82,
    initiatives: "10+",
    artisans: "1L+",
    lastUpdated: "2024-01-13"
  },
  {
    id: 11,
    name: "Green India Mission / National Afforestation Programme",
    description: "Involves community participation in forest restoration—beneficial for FRA communities managing forest resources.",
    status: "Active",
    category: "Environment",
    department: "Ministry of Environment",
    progress: 68,
    area: "2M+ hectares",
    communities: "50,000+",
    lastUpdated: "2024-01-05"
  },
  {
    id: 12,
    name: "National Social Assistance Programme (NSAP)",
    description: "Pensions for elderly, widows, and persons with disabilities in tribal and FRA areas.",
    status: "Active",
    category: "Social Security",
    department: "Ministry of Rural Development",
    progress: 90,
    beneficiaries: "3.5Cr+",
    pension: "₹200-500",
    lastUpdated: "2024-01-04"
  },
  {
    id: 13,
    name: "Compensatory Afforestation Fund (CAMPA)",
    description: "Provides funding for afforestation to mitigate forest land diversion, indirectly impacting forest regions.",
    status: "Active",
    category: "Environment",
    department: "Ministry of Environment",
    progress: 55,
    fund: "₹54,000Cr+",
    projects: "1000+",
    lastUpdated: "2024-01-03"
  },
  {
    id: 14,
    name: "Madhya Pradesh Rural Livelihoods Project (MPRLP)",
    description: "State-focused initiative in tribal districts, supporting micro-enterprises, biogas, agroforestry, and village funds.",
    status: "Active",
    category: "State Initiative",
    department: "MP Government",
    progress: 72,
    districts: "15",
    villages: "2000+",
    lastUpdated: "2024-01-02"
  }
];

const categories = [
  "All",
  "Tribal Development",
  "Education",
  "Water & Sanitation",
  "Agriculture",
  "Administrative",
  "Livelihood",
  "Economic Support",
  "Financial Support",
  "Marketing & Training",
  "Environment",
  "Social Security",
  "State Initiative"
];

export default function SchemesDashboard() {
  const [schemes, setSchemes] = useState(governmentSchemes);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSchemes(prevSchemes => 
        prevSchemes.map(scheme => ({
          ...scheme,
          progress: Math.min(100, scheme.progress + Math.random() * 2),
          lastUpdated: new Date().toISOString().split('T')[0]
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || scheme.category === filterCategory;
    const matchesStatus = filterStatus === "All" || scheme.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeSchemes = schemes.filter(scheme => scheme.status === "Active").length;
  const totalSchemes = schemes.length;
  const avgProgress = Math.round(schemes.reduce((sum, scheme) => sum + scheme.progress, 0) / schemes.length);


  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-red-100 text-red-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Scheme Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time monitoring of government schemes and initiatives</p>
            </div>
          </div>
          
          {/* Add New Scheme Button */}
          <div className="flex-shrink-0">
            <Link href="/schemes/add">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add New Scheme
              </Button>
            </Link>
          </div>
        </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Schemes</p>
                  <p className="text-3xl font-bold text-blue-900">{totalSchemes}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Schemes</p>
                  <p className="text-3xl font-bold text-green-900">{activeSchemes}</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Avg Progress</p>
                  <p className="text-3xl font-bold text-purple-900">{avgProgress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search schemes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Schemes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {scheme.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(scheme.status)}>
                        {scheme.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {scheme.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {scheme.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{scheme.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(scheme.progress)}`}
                        style={{ width: `${scheme.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{scheme.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{scheme.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Dynamic metrics based on scheme type */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {scheme.villages && (
                      <div className="bg-blue-50 p-2 rounded text-center">
                        <div className="font-semibold text-blue-900">{scheme.villages}</div>
                        <div className="text-blue-600">Villages</div>
                      </div>
                    )}
                    {scheme.schools && (
                      <div className="bg-green-50 p-2 rounded text-center">
                        <div className="font-semibold text-green-900">{scheme.schools}</div>
                        <div className="text-green-600">Schools</div>
                      </div>
                    )}
                    {scheme.households && (
                      <div className="bg-purple-50 p-2 rounded text-center">
                        <div className="font-semibold text-purple-900">{scheme.households}</div>
                        <div className="text-purple-600">Households</div>
                      </div>
                    )}
                    {scheme.farmers && (
                      <div className="bg-orange-50 p-2 rounded text-center">
                        <div className="font-semibold text-orange-900">{scheme.farmers}</div>
                        <div className="text-orange-600">Farmers</div>
                      </div>
                    )}
                    {scheme.kendras && (
                      <div className="bg-indigo-50 p-2 rounded text-center">
                        <div className="font-semibold text-indigo-900">{scheme.kendras}</div>
                        <div className="text-indigo-600">Kendras</div>
                      </div>
                    )}
                    {scheme.beneficiaries && (
                      <div className="bg-pink-50 p-2 rounded text-center">
                        <div className="font-semibold text-pink-900">{scheme.beneficiaries}</div>
                        <div className="text-pink-600">Beneficiaries</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No schemes found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
