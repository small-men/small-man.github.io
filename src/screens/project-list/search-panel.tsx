/*@jsxImportSource @emotion/react */
import { User } from "types/user";
import { Project } from "types/project";
import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form>
      <Form.Item css={{ marginBottom: "2rem" }}>
        <Input
          type="text"
          placeholder={"项目名称"}
          value={param.name}
          onChange={(evt) => {
            setParam({ ...param, name: evt.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};
