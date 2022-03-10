import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  // 使用 useAuth 获取用户
  const { user, login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    // 发送网络请求
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type={"text"} id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type={"password"} id={"password"} />
      </Form.Item>
      <Button htmlType={"submit"} type={"primary"}>
        登录
      </Button>
    </Form>
  );
};
