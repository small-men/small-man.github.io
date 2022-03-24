import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/use-task";
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import { useTaskTypes } from "utils/task-type";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/use-kanban";
import { Row } from "components/lib";
import React from "react";

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

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const [param] = useTasksSearchParams();
  // 获取所有任务详情
  const { data: allTasks } = useTasks(param);
  // 通过任务kanbanId 配置 看板
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  const { startEdit } = useTaskModal();

  // 从url中获取关键字
  const { name: keyword } = useTasksSearchParams()[0];

  return (
    <Container {...props} ref={ref}>
      <Row between={true}>
        <h2>{kanban.name}</h2>
        <More kanban={kanban} key={kanban.id} />
      </Row>
      <TaskContainer>
        {tasks?.map((task) => {
          return (
            <Card
              onClick={() => startEdit(task.id)}
              style={{ marginBottom: "0.5rem", cursor: "pointer" }}
              key={task.id + task.name}
            >
              <Mark name={task.name} keyword={keyword} />
              <TaskTypeIcon id={task.typeId} />
            </Card>
          );
        })}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
});

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());

  const startEdit = () => {
    Modal.confirm({
      title: "确认删除吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => mutateAsync({ id: kanban.id }),
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item key={kanban.name}>
        <Button type={"link"} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
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
