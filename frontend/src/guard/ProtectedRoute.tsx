import { useAuth } from '@/hooks/useAuth'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) return <Navigate to="/auth" replace />

  return children
}
