import { useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { Project } from "screens";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () => {
    return client(`projects`, {
      data: cleanObject(param || {}),
    });
  });

  /*   const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () =>
      client(`projects`, {
        data: cleanObject(param || {}),
      }),
    [client, param]
  );
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, fetchProjects, run]);
  return result; */
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
