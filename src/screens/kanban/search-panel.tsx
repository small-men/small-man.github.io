import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskSelect } from "components/task-select";
import { UserSelect } from "components/user-select";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const [param, setParam] = useTasksSearchParams();
  const reset = () =>
    setParam({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  return (
    <Row marginBottom={2} gap={2}>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        value={param.name}
        onChange={(e) => setParam({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={param.processorId}
        onChange={(value) => setParam({ processorId: value })}
      />
      <TaskSelect
        defaultOptionName="类型"
        value={param.typeId}
        onChange={(value) => setParam({ typeId: value })}
      />
      <Button onClick={reset}>清空筛选器</Button>
    </Row>
  );
};
