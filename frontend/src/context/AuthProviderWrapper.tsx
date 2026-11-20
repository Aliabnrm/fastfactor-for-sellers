import axios from 'axios'
import api from '@/services/useApiClient'
import { AuthContext } from '@/hooks/useAuth'
import type { User } from '@/schema/auth.schema'
import { tokenStore } from '@/lib/auth/tokenStore'
import { sessionHint } from '@/lib/auth/sessionHint'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, type ReactNode } from 'react'
import LoadingState from '@/components/global/LoadingState'
import { getMeApi, logoutApi, refreshApi } from '@/services/auth/auth.api'

export default function AuthProviderWrapper({
  children,
}: {
  children: ReactNode
}) {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(() => !sessionHint.isGuest())
  const [bootstrapError, setBootstrapError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const setAuth = (currentUser: User, accessToken: string) => {
    queryClient.clear()
    tokenStore.set(accessToken)
    sessionHint.set('member')
    setUser(currentUser)
  }

  const refreshUser = async () => {
    try {
      setUser(await getMeApi(api))
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        tokenStore.clear()
        sessionHint.set('guest')
        setUser(null)
        queryClient.clear()
      }
      throw error
    }
  }

  const logout = async () => {
    // Keep the session if the server cannot clear its HttpOnly cookie.
    await logoutApi(api)
    tokenStore.clear()
    sessionHint.set('guest')
    setUser(null)
    queryClient.clear()
  }

  useEffect(() => {
    if (sessionHint.isGuest()) {
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    setBootstrapError(false)

    const bootstrap = async () => {
      try {
        // Refresh already returns the user: avoid a second sequential /auth/me call.
        const result = await refreshApi(api, { timeout: 60_000 })
        if (!active) return
        tokenStore.set(result.accessToken)
        sessionHint.set('member')
        setUser(result.user)
      } catch (error) {
        if (!active) return
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          tokenStore.clear()
          sessionHint.set('guest')
          setUser(null)
        } else {
          // A sleeping server or offline connection does not mean the session expired.
          setBootstrapError(true)
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void bootstrap()
    return () => {
      active = false
    }
  }, [attempt])

  if (bootstrapError) {
    return (
      <LoadingState
        error
        title="ارتباط با سرور برقرار نشد"
        description="اتصال اینترنت را بررسی کنید و دوباره تلاش کنید."
        onRetry={() => {
          setBootstrapError(false)
          setLoading(true)
          setAttempt(value => value + 1)
        }}
      />
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        setAuth,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
