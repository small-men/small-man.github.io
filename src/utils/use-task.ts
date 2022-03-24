import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "./http";
import { SortProps } from "./use-kanban";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debounceParam = { ...param, name: useDebounce(param?.name, 1000) };

  return useQuery<Task[]>(["tasks", debounceParam], () => {
    return client(`tasks`, {
      data: cleanObject(debounceParam || {}),
    });
  });
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: Partial<Task>) => {
    return client(`tasks`, {
      data: params,
      method: "POST",
    });
  }, useAddConfig(queryKey));
};

export const useGetTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: Partial<Task>) => {
    return client(`tasks/${params.id}`, {
      data: params,
      method: "PATCH",
    });
  }, useEditConfig(queryKey));
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(({ id }: { id: number }) => {
    return client(`tasks/${id}`, {
      method: "DELETE",
    });
  }, useDeleteConfig(queryKey));
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
