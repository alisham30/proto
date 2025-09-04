"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function UnauthorizedPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">!</span>
          </div>
          <CardTitle className="text-2xl text-red-700">Access Denied</CardTitle>
          <CardDescription>You don't have permission to access this resource</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <div className="p-4 bg-gray-50 rounded-lg text-left">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Current User:</span> {user.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Role:</span> {user.role}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Link href="/dashboard">
              <Button className="w-full bg-transparent" variant="outline">
                Return to Dashboard
              </Button>
            </Link>
            <Button className="w-full" variant="destructive" onClick={logout}>
              Logout & Switch User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
