import * as auth from "auth_provider";
import * as qs from "qs";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

// 声明请求参数
interface Config extends RequestInit {
  token?: string;
  data?: unknown;
}

/**
 * endpoint：统一资源定位符
 * {
 *  token: JWT 标识
 *  data:请求参数
 *  headers:请求头
 * }
 */
export const http = (
  endpoint: string,
  { token, data, headers, ...customConfig }: Config = {}
) => {
  // 默认请求配置
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    // 自定义请求配置，并覆盖默认配置
    ...customConfig,
  };

  // 判断请求类型，并添加参数
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // 发送请求，并返回请求结果
  return fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject("请重新登录");
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

// 封装 http 函数，使其自动传入token
// Parameters<typeof http> 参数类型定义
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token || "" });
};
