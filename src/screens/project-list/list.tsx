import { Project, User } from "./index";
import { Table } from "antd";

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "项目名",
          dataIndex: "name",
          sorter: (pre, cur) => pre.name.localeCompare(cur.name),
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
      ]}
      dataSource={list}
      rowKey={"id"}
    />
  );
};
