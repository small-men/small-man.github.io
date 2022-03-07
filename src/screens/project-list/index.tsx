import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import * as qs from "qs";

// 声明接口
export interface User {
  name: string;
  id: number;
}
export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

// 获取请求URL路径
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
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

  // 当 param 参数发生变化时，发送异步请求查询项目列表
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  // 页面装载时获取下拉列表用户
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
