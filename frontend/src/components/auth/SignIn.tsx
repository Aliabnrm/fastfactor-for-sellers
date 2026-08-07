import { useAuth } from '@/hooks/useAuth'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { useLogin } from '@/services/auth/auth.hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigninDTO, SigninSchema } from '@/schema/auth.schema'

const SignInPage = () => {
  const navigate = useNavigate()

  const login = useLogin()
  const { setAuth } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninDTO>({
    resolver: zodResolver(SigninSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: SigninDTO) => {
    try {
      const response = await login.mutateAsync(data)
      setAuth(response.user, response.accessToken)
      navigate('/', { replace: true })
    } catch (error: any) {
      alert(error?.response?.data?.message ?? error.message)
    }
  }

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
      onFinish={handleSubmit(onSubmit)}
      className="auth-form pt-5"
    >
      <Form.Item
        label="ایمیل"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              placeholder="email@example.com"
              dir="ltr"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="رمز عبور"
        validateStatus={errors.password ? 'error' : ''}
        help={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              size="large"
              placeholder="یک رمز امن انتخاب کنید"
            />
          )}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        className="mt-3 !h-12"
        loading={login.isPending}
      >
        ورود
      </Button>
    </Form>
  )
}

export default SignInPage
