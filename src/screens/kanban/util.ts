import { useMemo } from "react";
import { useLocation } from "react-router";
import { useDebounce } from "utils";
import { useUrlQueryParam } from "utils/url";
import { useGetProject } from "utils/use-project";

// 提取url中projectId
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/project\/(\d+)/)?.[1];
  return Number(id);
};

// 获取project
export const useProjectInUrl = () => useGetProject(useProjectIdInUrl());

// 获取queryKey
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () =>
      [
        {
          projectId,
          typeId: Number(param.typeId) || undefined,
          processorId: Number(param.processorId) || undefined,
          tagId: Number(param.tagId) || undefined,
          name: param.name,
        },
        setParam,
      ] as const,
    [projectId, param]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()[0]];
