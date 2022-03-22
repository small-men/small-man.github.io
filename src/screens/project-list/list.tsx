import { User } from "types/user";
import { Project } from "types/project";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/use-project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectQueryKey } from "./util";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "项目名",
          sorter: (pre, cur) => pre.name.localeCompare(cur.name),
          render(value, project) {
            return (
              <Link to={`project/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More {...project} />;
          },
        },
      ]}
      {...props}
      rowKey={"id"}
    />
  );
};

// 抽取编辑项目组件
const More = (project: Project) => {
  const { mutate: deleteMutate } = useDeleteProject(useProjectQueryKey());
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  // 抽象删除项目提示
  const confirmDeleteProject = (id: number) => () => {
    Modal.confirm({
      title: "确认删除这个项目吗?",
      content: "点击确认删除",
      okText: "确认",
      onOk: () => {
        deleteMutate({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={editProject(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item key={"delete"} onClick={confirmDeleteProject(project.id)}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
