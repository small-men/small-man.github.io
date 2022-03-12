import { User } from "screens";
import { useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUser = () => {
  const client = useHttp();

  /**
   * 获取处理Promise 函数
   */
  const { run, ...result } = useAsync<User[]>();

  // 当 param 参数发生变化时，发送异步请求查询项目列表
  useMount(() => {
    run(client(`users`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return result;
};
