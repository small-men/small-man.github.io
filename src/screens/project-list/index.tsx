import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/use-project";
import { useUsers } from "utils/use-User";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, Row } from "components/lib";
// import { Helmet } from "react-helmet";

// 声明接口
export interface User {
  name: string;
  id: number;
  token: string;
}
export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchParams();
  const { open } = useProjectModal();

  /**
   * 使用 useDebounce 自定义hook,对搜索组件进行防抖处理
   */
  const debounceParam = useDebounce(param, 500);

  /**
   * 获取处理Promise 函数
   */
  const { error, isLoading, data: list, retry } = useProject(debounceParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      {error ? (
        <Typography.Text type={"danger"}>{error}</Typography.Text>
      ) : null}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
