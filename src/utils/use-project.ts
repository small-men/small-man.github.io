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

  const fetchProjects = () =>
    client(`projects`, {
      data: cleanObject(param || {}),
    });

  // 当 param 参数发生变化时，发送异步请求查询项目列表
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

/**
 * 编辑用户收藏状态
 */
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
