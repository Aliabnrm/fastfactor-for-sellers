import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { passwordRules } from '@/lib/validation/password'

const LoginForm = () => {
  const navigate = useNavigate()

  const handleLogin = async values => {
    const email = values.email
    const password = values.password

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      message.error(error.message)
      return
    }
    message.success('ورود موفقیت آمیز بود!')
    navigate('/')
  }

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
      onFinish={handleLogin}
    >
      <Form.Item
        label="ایمیل"
        name="email"
        rules={[
          { required: true, message: 'لطفا ایمیل خود را وارد کنید' },
          { type: 'email', message: 'ایمیل معتبر وارد کنید' },
        ]}
      >
        <Input size="large" placeholder="مثال: email@example.com" />
      </Form.Item>

      <Form.Item label="رمز عبور" name="password" rules={passwordRules}>
        <Input.Password size="large" placeholder="رمز عبور" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block className="mt-2">
        ورود
      </Button>
    </Form>
  )
}

export default LoginForm
