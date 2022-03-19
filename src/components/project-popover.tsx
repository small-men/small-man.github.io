import styled from "@emotion/styled";
import { List, Popover, Typography, Divider } from "antd";
import { useProject } from "utils/use-project";

export const ProjectPopover = (props: { projectModalButton: JSX.Element }) => {
  // 获取项目数据
  const { data: projects } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      {props.projectModalButton}
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
