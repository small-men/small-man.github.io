import { useLocation } from "react-router";
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

export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
