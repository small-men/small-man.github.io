import { User } from "screens";

const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

export const setToken = ({ user }: { user: User }) => {
  localStorage.setItem(localStorageKey, user?.token || "");
  return user;
};

export const login = (param: { username: string; password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      setToken(await response.json());
    }
  });
};

export const register = (param: { username: string; password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      setToken(await response.json());
    }
  });
};

export const logout = () => {
  window.localStorage.removeItem(localStorageKey);
};
