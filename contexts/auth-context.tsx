"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthContextType } from "@/types/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("central-stores-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        console.error("[v0] Failed to parse saved user:", err)
        localStorage.removeItem("central-stores-user")
      }
    }
  }, [])

  const getRegisteredUsers = () => {
    try {
      const users = localStorage.getItem("central-stores-registered-users")
      return users ? JSON.parse(users) : []
    } catch (err) {
      console.error("[v0] Failed to parse registered users:", err)
      return []
    }
  }

  const saveRegisteredUser = (userData: any) => {
    const users = getRegisteredUsers()
    const newUser = {
      username: userData.username,
      password: userData.password, // In production, this should be hashed
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      employeeId: userData.employeeId,
      id: Date.now().toString(),
    }

    // Check if user already exists
    const existingUserIndex = users.findIndex(
      (u: any) => u.username === userData.username || u.employeeId === userData.employeeId,
    )
    if (existingUserIndex >= 0) {
      users[existingUserIndex] = newUser
    } else {
      users.push(newUser)
    }

    localStorage.setItem("central-stores-registered-users", JSON.stringify(users))
    return newUser
  }

  const login = async (credentials: { username: string; password: string }) => {
    console.log("[v0] Starting login process for:", credentials.username)
    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Login attempt:", credentials)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const registeredUsers = getRegisteredUsers()
      console.log("[v0] Retrieved registered users:", registeredUsers.length, "users found")
      console.log("[v0] Looking for user with username:", credentials.username)

      const foundUser = registeredUsers.find(
        (u: any) => u.username === credentials.username && u.password === credentials.password,
      )

      console.log("[v0] User search result:", foundUser ? "User found" : "User not found")

      if (!foundUser) {
        console.log("[v0] Login failed - no matching user found")
        throw new Error("Invalid username or password")
      }

      const authenticatedUser: User = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        employeeId: foundUser.employeeId,
      }

      console.log("[v0] Setting authenticated user:", authenticatedUser)
      setUser(authenticatedUser)
      localStorage.setItem("central-stores-user", JSON.stringify(authenticatedUser))
      console.log("[v0] Login successful, user role:", authenticatedUser.role)
      console.log("[v0] User state should now be set")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid credentials. Please try again."
      console.log("[v0] Login error occurred:", errorMessage)
      setError(errorMessage)
      console.error("[v0] Login failed:", errorMessage)
      throw err
    } finally {
      console.log("[v0] Setting loading to false")
      setLoading(false)
    }
  }

  const register = async (userData: any) => {
    console.log("[v0] Starting registration process for:", userData.username)
    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Registration attempt:", userData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const registeredUsers = getRegisteredUsers()
      console.log("[v0] Current registered users count:", registeredUsers.length)

      const existingUser = registeredUsers.find(
        (u: any) => u.username === userData.username || u.employeeId === userData.employeeId,
      )

      if (existingUser && existingUser.username === userData.username) {
        console.log("[v0] Registration failed - username already exists")
        throw new Error("Username already exists")
      }

      if (existingUser && existingUser.employeeId === userData.employeeId) {
        console.log("[v0] Registration failed - employee ID already exists")
        throw new Error("Employee ID already exists")
      }

      console.log("[v0] Saving new user to localStorage")
      const newUser = saveRegisteredUser(userData)
      console.log("[v0] New user saved:", newUser)

      const authenticatedUser: User = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        employeeId: newUser.employeeId,
      }

      console.log("[v0] Setting authenticated user after registration:", authenticatedUser)
      setUser(authenticatedUser)
      localStorage.setItem("central-stores-user", JSON.stringify(authenticatedUser))
      console.log("[v0] Registration successful, user role:", authenticatedUser.role)
      console.log("[v0] User state should now be set after registration")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again."
      console.log("[v0] Registration error occurred:", errorMessage)
      setError(errorMessage)
      console.error("[v0] Registration failed:", errorMessage)
      throw err
    } finally {
      console.log("[v0] Setting loading to false after registration")
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("central-stores-user")
    console.log("[v0] User logged out")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
