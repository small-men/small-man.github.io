import { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Project } from "screens";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useQueryClient } from "react-query";
import { useProjectSearchParams } from "screens/project-list/util";

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
  const [searchParam] = useProjectSearchParams();
  const queryKey = ["projects", searchParam];
  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      async onMutate(target) {
        // 获取缓存列表
        const previousItems = queryClient.getQueryData(queryKey);
        // 重新设置缓存数据
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });
        // 将原始缓存返回
        return previousItems;
      },
      // 当 useMutation 发生异常回滚数据
      onError(error, newItem, context) {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: Project[] }).previousItems
        );
      },
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
