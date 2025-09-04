"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
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

export default function AddSchemePage() {
  const router = useRouter();
  const [newScheme, setNewScheme] = useState({
    name: "",
    description: "",
    category: "",
    status: "Active",
    department: "",
    progress: 0,
    targetBeneficiaries: "",
    implementationPeriod: "",
    keyObjectives: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    budget: "",
    startDate: "",
    endDate: ""
  });

  const handleAddScheme = () => {
    if (newScheme.name && newScheme.description && newScheme.category && newScheme.department) {
      // Here you would typically save to a database
      console.log('New scheme:', newScheme);
      alert('Scheme added successfully!');
      router.push('/schemes');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.push('/schemes');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/schemes">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Schemes
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Government Scheme</h1>
                <p className="text-gray-600">Create a comprehensive scheme entry</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50">
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button onClick={handleAddScheme} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Scheme
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Scheme Name *</Label>
                  <Input
                    id="name"
                    value={newScheme.name}
                    onChange={(e) => setNewScheme({...newScheme, name: e.target.value})}
                    placeholder="Enter scheme name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department/Ministry *</Label>
                  <Input
                    id="department"
                    value={newScheme.department}
                    onChange={(e) => setNewScheme({...newScheme, department: e.target.value})}
                    placeholder="e.g., Ministry of Tribal Affairs"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newScheme.description}
                  onChange={(e) => setNewScheme({...newScheme, description: e.target.value})}
                  placeholder="Describe the scheme objectives and target beneficiaries"
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="keyObjectives">Key Objectives</Label>
                <Textarea
                  id="keyObjectives"
                  value={newScheme.keyObjectives}
                  onChange={(e) => setNewScheme({...newScheme, keyObjectives: e.target.value})}
                  placeholder="List the main objectives of this scheme"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Classification & Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 border-b pb-2">Classification & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newScheme.category} onValueChange={(value) => setNewScheme({...newScheme, category: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newScheme.status} onValueChange={(value) => setNewScheme({...newScheme, status: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="progress">Initial Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={newScheme.progress}
                    onChange={(e) => setNewScheme({...newScheme, progress: parseInt(e.target.value) || 0})}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 border-b pb-2">Implementation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetBeneficiaries">Target Beneficiaries</Label>
                  <Input
                    id="targetBeneficiaries"
                    value={newScheme.targetBeneficiaries}
                    onChange={(e) => setNewScheme({...newScheme, targetBeneficiaries: e.target.value})}
                    placeholder="e.g., 5 crore tribal people"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="implementationPeriod">Implementation Period</Label>
                  <Input
                    id="implementationPeriod"
                    value={newScheme.implementationPeriod}
                    onChange={(e) => setNewScheme({...newScheme, implementationPeriod: e.target.value})}
                    placeholder="e.g., 2024-2027"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newScheme.startDate}
                    onChange={(e) => setNewScheme({...newScheme, startDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newScheme.endDate}
                    onChange={(e) => setNewScheme({...newScheme, endDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={newScheme.contactPerson}
                    onChange={(e) => setNewScheme({...newScheme, contactPerson: e.target.value})}
                    placeholder="Name of the scheme coordinator"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newScheme.email}
                    onChange={(e) => setNewScheme({...newScheme, email: e.target.value})}
                    placeholder="scheme@ministry.gov.in"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newScheme.phone}
                    onChange={(e) => setNewScheme({...newScheme, phone: e.target.value})}
                    placeholder="+91-11-2345-6789"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={newScheme.website}
                    onChange={(e) => setNewScheme({...newScheme, website: e.target.value})}
                    placeholder="https://scheme.ministry.gov.in"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 border-b pb-2">Financial Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <Label htmlFor="budget">Budget (Optional)</Label>
                <Input
                  id="budget"
                  value={newScheme.budget}
                  onChange={(e) => setNewScheme({...newScheme, budget: e.target.value})}
                  placeholder="e.g., ₹79,156 crore"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pb-8">
            <Button variant="outline" onClick={handleCancel} size="lg" className="px-8 border-green-300 text-green-700 hover:bg-green-50">
              Cancel
            </Button>
            <Button onClick={handleAddScheme} size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8">
              Save Scheme
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
