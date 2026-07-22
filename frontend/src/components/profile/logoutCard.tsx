import { Card, Button } from 'antd'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth';

export const AccountLogoutCard = () => {
  const { logout, loading } = useAuth();

  return (
    <Card>
      <Button
        block
        danger
        size="large"
        onClick={logout}
        loading={loading}
        icon={<LogOut className="mt-2 h-5 w-5" />}
      >
        خروج از حساب
      </Button>
    </Card>
  )
}
