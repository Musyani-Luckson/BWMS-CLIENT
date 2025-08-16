export interface User {
  id: string
  username: string
  role: "admin" | "manager" | "staff-central" | "staff-department" | "supplier"
  firstName: string
  lastName: string
  email: string
  employeeId?: string
  department?: string
}

export interface AuthContextType {
  user: User | null
  login: (credentials: { username: string; password: string }) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  email: string
  nrc: string
  employeeId: string
  role: string
}
