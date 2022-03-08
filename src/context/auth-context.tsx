import React, { useState } from "react";
import * as auth from "auth_provider";
import { User } from "screens";
import { useMount } from "utils";
import { http } from "utils/http";

const AuthContext = React.createContext<
  | undefined
  | {
      user: User | null;
      login: (form: Form) => Promise<void>;
      register: (form: Form) => Promise<void>;
      logout: () => Promise<void>;
    }
>(undefined);
AuthContext.displayName = "AuthContext";

interface Form {
  username: string;
  password: string;
}

// 定义初始化 User 函数
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);

  const login = (form: Form) => auth.login(form).then(setUser);
  const register = (form: Form) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
