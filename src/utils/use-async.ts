import { useCallback, useState } from "react";
import { useMountRef } from "utils";

/**
 * error: 错误信息，无或者字符串
 * data: 对象类型或者无
 * stat: state缩写
 *  idle: 无状态
 *  loading: 加载中
 *  error: 加载失败，需要返回错误信息
 *  success: 加载成功，需要返回请求数据
 */
interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

// 预定义状态
const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

// 预定义返回结果类型
const defaultConfig = {
  // 控制返回error,若为true,返回Promise.reject
  throwOnError: false,
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  // 初始化配置
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  // 保存状态,将传入状态替换预定义状态
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  // 保存 retry 状态
  const [retry, setRetry] = useState(() => () => {});

  // 当请求成功时
  const success = useCallback(
    (data: T) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );
  // 当请求失败时
  const fail = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: "error",
        data: null,
      }),
    []
  );

  // 获取 useMountedRef 判断组件状态
  const mountedRef = useMountRef();

  // 处理请求Promise
  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据");
      }
      // 设置状态为 loading
      setState((prev) => ({ ...prev, stat: "loading" }));

      // 保存 retry
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      // 根据 Promise 结果返回数据
      return promise
        .then((data) => {
          // 当请求成功时
          // 判断组件状态
          if (mountedRef.current) success(data);
          return data;
        })
        .catch((error) => {
          fail(error);
          // 当请求失败时
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, mountedRef, success, fail]
  );

  // hook 返回
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    success,
    fail,
    // 重新运行一次run
    retry,
    ...state,
  };
};
