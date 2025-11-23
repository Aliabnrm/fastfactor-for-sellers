import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { mobileRules } from "@/lib/validation/mobileRuls";
import { passwordRules } from "@/lib/validation/password";

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <Form layout="vertical" requiredMark={false} autoComplete="off">
      <Form.Item label="شماره موبایل" name="mobile" rules={mobileRules}>
        <Input size="large" placeholder="مثال: 09123456789" inputMode="numeric" />
      </Form.Item>

      <Form.Item label="رمز عبور" name="password" rules={passwordRules}>
        <Input.Password size="large" placeholder="رمز عبور" />
      </Form.Item>

      <Button
        onClick={() => navigate("/")}
        type="primary"
        htmlType="submit"
        block
        className="mt-2"
      >
        ورود
      </Button>
    </Form>
  );
};

export default LoginForm;
