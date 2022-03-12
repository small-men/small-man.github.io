import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: React.Dispatch<React.SetStateAction<Error | null>>;
}) => {
  // 使用 useAuth 获取用户
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    cpassword: string;
    username: string;
    password: string;
  }) => {
    // 发送网络请求
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }

    try {
      await run(register(values));
    } catch (error) {
      const e = error as Error;
      onError(e);
    }
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"请确认密码"} type={"password"} id={"cpassword"} />
      </Form.Item>
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        注册
      </LongButton>
    </Form>
  );
};
