import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject } from "utils";
import * as qs from "qs";

// 获取请求URL路径
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
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

  // 当 param 参数发生变化时，发送异步请求查询项目列表
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);

  // 页面装载时获取下拉列表用户
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
