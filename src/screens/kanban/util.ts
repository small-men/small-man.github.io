import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useUrlQueryParam } from "utils/url";
import { useGetProject } from "utils/use-project";
import { useGetTask } from "utils/use-task";

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
    [projectId, param, setParam]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()[0]];

// 控制任务编辑模块开关
export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useGetTask(Number(editingTaskId));
  // 打开任务编辑
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  // 关闭任务编辑
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: undefined });
  }, [setEditingTaskId]);

  return {
    editingTaskId, // 编辑任务的id
    editingTask, // 编辑任务
    startEdit, // 开
    close, // 关
    isLoading, // 加载状态
  };
};
