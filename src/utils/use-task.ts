import { useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () => {
    return client(`tasks`, {
      data: cleanObject(param || {}),
    });
  });
};
