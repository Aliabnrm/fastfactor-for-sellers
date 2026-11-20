import { useAuth } from '@/hooks/useAuth'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import LoadingState from '@/components/global/LoadingState'

interface Props {
  children: ReactNode
}

export default function PublicAuthRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingState title="در حال بررسی ورود شما" />

  if (user) return <Navigate to="/" replace />

  return children
}
