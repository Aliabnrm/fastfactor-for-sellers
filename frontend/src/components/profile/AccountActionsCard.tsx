import { Card, Button } from 'antd'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const AccountActionsCard = () => {
  const { logout, loading } = useAuth()

  return (
    <Card className="!rounded-2xl !border-border !shadow-[var(--shadow-sm)]">
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
        onClick={logout}
        loading={loading}
        icon={<LogOut className="mt-1 h-5 w-5" />}
        className="!h-12"
      >
        خروج از حساب
      </Button>
    </Card>
  )
}

export default AccountActionsCard
