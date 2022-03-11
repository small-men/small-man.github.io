import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

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
}

export const ProjectListScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  /**
   * param: 保存搜索面板参数
   */
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  /**
   * users: 保存下拉列表参数
   */
  const [users, setUsers] = useState([]);

  /**
   * 保存异步请求查询项目列表参数
   */
  const [list, setList] = useState([]);

  /**
   * 使用 useDebounce 自定义hook,对搜索组件进行防抖处理
   */
  const debounceParam = useDebounce(param, 2000);

  /**
   * 获取请求函数
   */
  const client = useHttp();

  // 当 param 参数发生变化时，发送异步请求查询项目列表
  useEffect(() => {
    setIsLoading(true);
    client(`projects`, {
      data: cleanObject(debounceParam),
    })
      .then(setList)
      .catch((data) => {
        setError(data.message);
        setList([]);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  // 页面装载时获取下拉列表用户
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      {error ? (
        <Typography.Text type={"danger"}>{error}</Typography.Text>
      ) : null}
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List loading={isLoading} dataSource={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
