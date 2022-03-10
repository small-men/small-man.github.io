import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  // 使用 useAuth 获取用户
  const { user, login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // 组织表单默认行为
    e.preventDefault();
    // 获取表单中的用户名和密码
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    // 发送网络请求
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user ? <p>{`欢迎用户：${user.name}`}</p> : undefined}
      <div>
        <label htmlFor="username">用户名</label>
        <input type={"text"} id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type={"password"} id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
