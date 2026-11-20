import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Card, Button } from 'antd'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const AccountActionsCard = () => {
  const { logout } = useAuth()
  const { toast } = useToast()
  const [pending, setPending] = useState(false)
  const handleLogout = async () => {
    setPending(true)
    try {
      await logout()
    } catch {
      toast({
        variant: 'destructive',
        title: 'خروج از حساب انجام نشد',
        description: 'اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.',
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="!rounded-xl !border-border !shadow-[var(--shadow-sm)]">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">حساب کاربری</h2>
        <p className="mt-1 text-xs text-slate-500">
          با خروج از حساب، اطلاعات فروشگاه شما حذف نمی‌شود.
        </p>
      </div>
      <Button
        block
        danger
        size="large"
        onClick={handleLogout}
        loading={pending}
        icon={<LogOut className="h-5 w-5" />}
        className="!h-12"
      >
        خروج از حساب
      </Button>
    </Card>
  )
}

export default AccountActionsCard
