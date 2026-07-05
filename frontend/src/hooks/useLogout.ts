import { message } from 'antd'
import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const navigate = useNavigate()
  const [logoutLoading, setLogoutLoading] = useState(false)

  const logout = useCallback(async () => {
    setLogoutLoading(true)

    const { error } = await supabase.auth.signOut()

    setLogoutLoading(false)

    if (error) {
      console.error('Logout error:', error)
      message.error('خطا در خروج از حساب')
      return false
    }

    message.success('با موفقیت خارج شدید')
    navigate('/auth')
    return true
  }, [navigate])

  return { logout, logoutLoading }
}

export default useLogout
