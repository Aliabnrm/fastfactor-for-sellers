import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { passwordRules } from '@/lib/validation/password'

const SignupForm = () => {
  const navigate = useNavigate()

  const handleSignup = async values => {
    const email = values.email
    const password = values.password

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth?verified=true`,
        data: { mobile: values.mobile },
      },
    })

    if (error) return message.error(error.message)

    const newUserId = data.user?.id

    if (newUserId) {
      const { error: profileError } = await supabase
        .from('sellers')
        .insert({
          id: newUserId,
        })
        .select()
        .single()

      if (profileError) {
        console.error('Error creating seller profile:', profileError)
      }
    }

    message.success('ثبت‌نام با موفقیت انجام شد')
    navigate('/')
  }

  return (
    <Form
      onFinish={handleSignup}
      layout="vertical"
      requiredMark={false}
      autoComplete="off"
    >
      <Form.Item
        label="ایمیل"
        name="email"
        rules={[
          { type: 'email', message: 'ایمیل معتبر وارد کنید' },
          { required: true, message: 'لطفا ایمیل خود را وارد کنید' },
        ]}
      >
        <Input size="large" placeholder="مثال: email@example.com" />
      </Form.Item>

      <Form.Item label="رمز عبور" name="password" rules={passwordRules}>
        <Input.Password size="large" placeholder="یک رمز امن انتخاب کنید" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block className="mt-2">
        ثبت‌نام رایگان
      </Button>
    </Form>
  )
}

export default SignupForm
