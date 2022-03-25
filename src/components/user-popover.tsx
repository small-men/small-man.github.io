import styled from "@emotion/styled";
import { List, Popover, Typography, Divider } from "antd";
import { useProjectModal } from "screens/project-list/util";
import { useProject } from "utils/use-project";
import { useUsers } from "utils/use-user";
import { ButtonNoPadding } from "./lib";

export const UserPopover = () => {
  // 获取项目数据
  const { data: users, refetch } = useUsers();

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
