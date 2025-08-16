"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

interface AuthPageProps {
  onAuthenticated: (user: any) => void
}

export default function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Login attempt:", credentials)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data based on role
      const mockUser = {
        id: "1",
        username: credentials.username,
        role: credentials.username.includes("admin")
          ? "admin"
          : credentials.username.includes("manager")
            ? "manager"
            : credentials.username.includes("supplier")
              ? "supplier"
              : credentials.username.includes("central")
                ? "staff-central"
                : "staff-department",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      }

      onAuthenticated(mockUser)
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (userData: any) => {
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Registration attempt:", userData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newUser = {
        id: Date.now().toString(),
        username: userData.employeeId,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      }

      onAuthenticated(newUser)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Central Stores</h1>
          <p className="text-gray-600">Management System</p>
        </div>

        {isLogin ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setIsLogin(false)}
            loading={loading}
            error={error}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setIsLogin(true)}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  )
}
