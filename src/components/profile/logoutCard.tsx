import { Card, Button } from 'antd'
import { LogOut, LucideLogOut } from 'lucide-react'

export const AccountLogoutCard = ({ logout, logoutLoading }) => (
  <Card>
    <Button
      block
      danger
      size="large"
      onClick={logout}
      loading={logoutLoading}
      icon={<LucideLogOut className='w-5 h-5 mt-2' />}
    >
      خروج از حساب
    </Button>
  </Card>
)
