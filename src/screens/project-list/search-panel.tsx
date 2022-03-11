/*@jsxImportSource @emotion/react */
import { User } from ".";
import { Form, Input } from "antd";

interface SearchPanelProps {
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
  users: User[];
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
        <select
          value={param.personId}
          onChange={(evt) => {
            setParam({ ...param, personId: evt.target.value });
          }}
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </Form.Item>
    </Form>
  );
};
