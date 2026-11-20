import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import type { ReactNode } from 'react'
import LoadingState from '@/components/global/LoadingState'

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return <LoadingState />
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  return children
}
