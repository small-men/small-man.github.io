import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

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
