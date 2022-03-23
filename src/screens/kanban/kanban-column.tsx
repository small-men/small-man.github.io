import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/use-task";
import { useTaskModal, useTasksSearchParams } from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import { useTaskTypes } from "utils/task-type";
import { Card } from "antd";
import { CreateTask } from "./create-task";

// icon 组件
const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: allTasks } = useTaskTypes();
  const name = allTasks?.find((task) => task.id === id)?.name;

  if (!name) {
    return null;
  }
  return (
    <img
      src={name === "task" ? taskIcon : bugIcon}
      style={{ width: "1.5rem" }}
      alt={"task-icon"}
    />
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const [param] = useTasksSearchParams();
  // 获取所有任务详情
  const { data: allTasks } = useTasks(param);
  // 通过任务kanbanId 配置 看板
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  const { startEdit } = useTaskModal();

  return (
    <Container>
      <h2>{kanban.name}</h2>
      <TaskContainer>
        {tasks?.map((task) => {
          return (
            <Card
              onClick={() => startEdit(task.id)}
              style={{ marginBottom: "0.5rem", cursor: "pointer" }}
              key={task.id + task.name}
            >
              <div>{task.name}</div>
              <TaskTypeIcon id={task.typeId} />
            </Card>
          );
        })}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
