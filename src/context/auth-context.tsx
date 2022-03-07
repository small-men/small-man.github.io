import React, { useState } from "react";
import * as auth from "auth_provider";
import { User } from "screens";

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

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);

  const login = (form: Form) => auth.login(form).then(setUser);
  const register = (form: Form) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

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
