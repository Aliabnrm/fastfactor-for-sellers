import { supabase } from "@/supabase";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { mobileRules } from "@/lib/validation/mobileRuls";
import { passwordRules } from "@/lib/validation/password";

const SignupForm = () => {
  const navigate = useNavigate();

  // because its to better we get email from user in login instead phone number and im converted phone number to fake email 
  const phoneToEmail = (mobile) => `${mobile}@seller.app`;

  const handleSignup = async (values) => {
    const email = phoneToEmail(values.mobile);
    const password = values.password;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { mobile: values.mobile },
      },
    });

    if (error) return message.error(error.message);

    message.success("ثبت‌نام با موفقیت انجام شد");
    navigate("/");
  };

  return (
    <Form
      onFinish={handleSignup}
      layout="vertical"
      requiredMark={false}
      autoComplete="off"
    >
      <Form.Item label="شماره موبایل" name="mobile" rules={mobileRules}>
        <Input size="large" placeholder="مثال: 09123456789" inputMode="numeric" />
      </Form.Item>

      <Form.Item label="رمز عبور" name="password" rules={passwordRules}>
        <Input.Password size="large" placeholder="یک رمز امن انتخاب کنید" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block className="mt-2">
        ثبت‌نام رایگان
      </Button>
    </Form>
  );
};

export default SignupForm;
