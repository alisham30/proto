"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext({})

// Mock user database for demonstration
const mockUsers = {
  "admin@fra.gov.in": {
    id: "1",
    email: "admin@fra.gov.in",
    password: "admin123",
    role: "admin",
    name: "System Administrator",
    department: "Ministry of Tribal Affairs",
    permissions: ["read", "write", "delete", "manage_users", "view_reports", "export_data"],
  },
  "officer@mp.gov.in": {
    id: "2",
    email: "officer@mp.gov.in",
    password: "officer123",
    role: "department",
    name: "Rajesh Kumar",
    department: "Madhya Pradesh Forest Department",
    state: "Madhya Pradesh",
    permissions: ["read", "write", "view_reports"],
  },
  "ngo@tribal.org": {
    id: "3",
    email: "ngo@tribal.org",
    password: "ngo123",
    role: "ngo",
    name: "Priya Sharma",
    organization: "Tribal Rights Foundation",
    permissions: ["read", "view_reports"],
  },
  "viewer@public.in": {
    id: "4",
    email: "viewer@public.in",
    password: "viewer123",
    role: "public",
    name: "Public User",
    permissions: ["read"],
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("fra_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("fra_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password, role) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = mockUsers[email]

      if (!user || user.password !== password || user.role !== role) {
        throw new Error("Invalid credentials or role mismatch")
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = user

      setUser(userWithoutPassword)
      localStorage.setItem("fra_user", JSON.stringify(userWithoutPassword))

      return { success: true, user: userWithoutPassword }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fra_user")
    router.push("/login")
  }

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false
  }

  const isRole = (role) => {
    return user?.role === role
  }

  const value = {
    user,
    login,
    logout,
    loading,
    hasPermission,
    isRole,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
