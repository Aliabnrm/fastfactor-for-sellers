import { supabase } from '@/lib/supabase'
import { AuthContext } from '@/hooks/useAuth'
import type { User } from '@supabase/supabase-js'
import { useState, useEffect, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function AuthProviderWrapper({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    loadSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
