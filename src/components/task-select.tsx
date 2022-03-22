import React from "react";
import { useTaskTypes } from "utils/task-type";
import { useTasks } from "utils/use-task";
import { IdSelect } from "./id-select";

export const TaskSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
