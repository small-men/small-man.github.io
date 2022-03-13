import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/use-project";
import { useUser } from "utils/use-User";
// import { Helmet } from "react-helmet";

// 声明接口
export interface User {
  name: string;
  id: string;
  token: string;
}
export interface Project {
  id: number;
  name: string;
  personId: string;
  organization: string;
  created: number;
}

export const ProjectListScreen = () => {
  /**
   * param: 保存搜索面板参数
   */
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  /**
   * 使用 useDebounce 自定义hook,对搜索组件进行防抖处理
   */
  const debounceParam = useDebounce(param, 500);

  /**
   * 获取处理Promise 函数
   */
  const { error, isLoading, data: list } = useProject(debounceParam);
  const { data: users } = useUser();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <h1>项目列表</h1>
      {error ? (
        <Typography.Text type={"danger"}>{error}</Typography.Text>
      ) : null}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
