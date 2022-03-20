import { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Project } from "screens";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useQueryClient } from "react-query";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () => {
    return client(`projects`, {
      data: cleanObject(param || {}),
    });
  });
};

/**
 * 编辑用户收藏状态
 */
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects/`, {
        data: params,
        method: "POST",
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useGetProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
