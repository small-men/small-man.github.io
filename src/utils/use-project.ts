import { useCallback, useEffect } from "react";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "screens";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useQueryClient } from "react-query";
import { useProjectSearchParams } from "screens/project-list/util";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

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
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: Partial<Project>) => {
    return client(`projects/${params.id}`, {
      data: params,
      method: "PATCH",
    });
  }, useEditConfig(queryKey));
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: Partial<Project>) => {
    return client(`projects/`, {
      data: params,
      method: "POST",
    });
  }, useAddConfig(queryKey));
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(({ id }: { id: number }) => {
    return client(`projects/${id}`, {
      method: "DELETE",
    });
  }, useDeleteConfig(queryKey));
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
