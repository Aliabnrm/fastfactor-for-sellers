import { useAuth } from "@/hooks/useAuth";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/services/auth/auth.hooks";
import { SignupDTO, SignupSchema } from "@/schema/auth.schema";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();

  const {setAuth} = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupDTO>({
    resolver: zodResolver(SignupSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignupDTO) => {
    console.log("submit", data);

    register(data, {
      onSuccess: (response) => {
        setAuth(response.user, response.accessToken);

        navigate("/");
      },
      onError: (error: any) => {
        alert(error?.message || "Registration failed");
      },
    });
  };

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      autoComplete="off"
      onFinish={handleSubmit(onSubmit)}
    >
      <Form.Item
        label="ایمیل"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              placeholder="مثال: email@example.com"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="رمز عبور"
        validateStatus={errors.password ? "error" : ""}
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
        loading={isPending}
        block
      >
        ثبت‌نام
      </Button>
    </Form>
  );
};

export default SignUpPage;