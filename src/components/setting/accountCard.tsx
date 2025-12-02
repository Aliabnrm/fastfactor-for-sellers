import { Card, Button } from 'antd'
import { LogOut } from 'lucide-react'

export const AccountCard = ({ logout, logoutLoading }) => (
  <Card>
    <Button
      danger
      block
      size="large"
      icon={<LogOut />}
      onClick={logout}
      loading={logoutLoading}
    >
      خروج از حساب
    </Button>
  </Card>
)
