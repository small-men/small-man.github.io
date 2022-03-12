import { useEffect } from "react";
import { Project } from "screens";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();

  /**
   * 获取处理Promise 函数
   */
  const { run, ...result } = useAsync<Project[]>();

  // 当 param 参数发生变化时，发送异步请求查询项目列表
  useEffect(() => {
    run(
      client(`projects`, {
        data: cleanObject(param || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
