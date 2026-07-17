import { createContext, useContext } from 'react'

export interface User {
  id: string
  email: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean

  setAuth: (user: User, accessToken: string) => void
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  setAuth: () => {},
  refreshUser: async () => {},
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)
