import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

const useAuthUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // listen to what happen in login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') setUser(session?.user ?? null)
        if (event === 'SIGNED_OUT') setUser(null)
      },
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  return user
}

export default useAuthUser
