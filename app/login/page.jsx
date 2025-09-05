"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [ngoFormOpen, setNgoFormOpen] = useState(false)
  const [ngoForm, setNgoForm] = useState({
    organizationName: "",
    registrationId: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    workingAreas: "",
    experience: "",
    documents: null,
  })

  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(email, password, "admin")

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const handleNGOApplication = (e) => {
    e.preventDefault()
    // Here you would typically send the application to a backend
    alert("NGO application submitted successfully! You will be contacted within 5-7 business days.")
    setNgoFormOpen(false)
    setNgoForm({
      organizationName: "",
      registrationId: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      workingAreas: "",
      experience: "",
      documents: null,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Image
                src="/fra-atlas-logo.png"
                alt="FRA Atlas Logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Sign in to access the FRA Atlas & DSS platform</CardDescription>
            <p className="text-sm text-green-600 font-medium mt-2">वन अधिकारी दृष्टि</p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Demo Credentials Box */}
              <div className="p-2 bg-gradient-to-r from-orange-200 via-yellow-200 to-pink-200 border border-orange-400 rounded shadow-md">
                <div className="text-center">
                  <p className="text-sm font-bold text-orange-800 mb-1">🔐 DEMO CREDENTIALS</p>
                  <p className="text-xs font-bold text-white mb-1 bg-gradient-to-r from-red-600 to-pink-600 px-2 py-1 rounded border border-red-800 animate-pulse">
                    ⚠️ Sign in below using ONLY these credentials:
                  </p>
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-2 rounded border border-yellow-400">
                    <p className="font-bold text-sm text-orange-900 mb-0.5">📧 Email: admin@fra.gov.in</p>
                    <p className="font-bold text-sm text-orange-900">🔑 Password: admin123</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? "Signing In..." : "Sign In as Admin"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">NGO Access</h4>
              <p className="text-sm text-blue-800 mb-3">
                Are you an NGO working with tribal communities? Apply for platform access.
              </p>
              <Button 
                variant="outline" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                onClick={() => setNgoFormOpen(true)}
              >
                Click to Apply
              </Button>

              {ngoFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">NGO Access Application</h2>
                        <button 
                          onClick={() => setNgoFormOpen(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Please fill out this form to request access to the FRA Atlas platform
                      </p>

                  <form onSubmit={handleNGOApplication} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="orgName">Organization Name *</Label>
                        <Input
                          id="orgName"
                          value={ngoForm.organizationName}
                          onChange={(e) => setNgoForm({ ...ngoForm, organizationName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="regId">NGO Registration ID *</Label>
                        <Input
                          id="regId"
                          value={ngoForm.registrationId}
                          onChange={(e) => setNgoForm({ ...ngoForm, registrationId: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          value={ngoForm.contactPerson}
                          onChange={(e) => setNgoForm({ ...ngoForm, contactPerson: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ngoEmail">Email *</Label>
                        <Input
                          id="ngoEmail"
                          type="email"
                          value={ngoForm.email}
                          onChange={(e) => setNgoForm({ ...ngoForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={ngoForm.phone}
                        onChange={(e) => setNgoForm({ ...ngoForm, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={ngoForm.address}
                        onChange={(e) => setNgoForm({ ...ngoForm, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workingAreas">Working Areas/Districts *</Label>
                      <Input
                        id="workingAreas"
                        placeholder="e.g., Khargone, Rayagada, Agartala"
                        value={ngoForm.workingAreas}
                        onChange={(e) => setNgoForm({ ...ngoForm, workingAreas: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience with Tribal Communities *</Label>
                      <Input
                        id="experience"
                        placeholder="Brief description of your work experience"
                        value={ngoForm.experience}
                        onChange={(e) => setNgoForm({ ...ngoForm, experience: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documents">Supporting Documents</Label>
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        onChange={(e) => setNgoForm({ ...ngoForm, documents: e.target.files })}
                      />
                      <p className="text-xs text-gray-500">Upload NGO registration certificate, work portfolio, etc.</p>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setNgoFormOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                        Submit Application
                      </Button>
                    </div>
                  </form>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Back to Home
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
