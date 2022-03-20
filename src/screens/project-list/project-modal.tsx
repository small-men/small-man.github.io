import { Drawer, Button, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/use-project";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { close, projectModalOpen, editingProject, isLoading } =
    useProjectModal();

  const title = editingProject ? "编辑项目" : "创建项目";

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const onFinish = (value: any) => {
    mutateAsync({ ...editingProject, ...value }).then(() => {
      closeModal();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout={"vertical"}
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label={"名称"}
              name={"name"}
              rules={[{ required: true, message: "请输入项目名" }]}
            >
              <Input placeholder={"请输入项目名"} />
            </Form.Item>
            <Form.Item
              label={"部门"}
              name={"organization"}
              rules={[{ required: true, message: "请输入部门名" }]}
            >
              <Input placeholder={"请输入部门名"} />
            </Form.Item>
            <Form.Item label={"负责人"} name={"personId"}>
              <UserSelect defaultOptionName="负责人" />
            </Form.Item>
            <Form.Item>
              <Button
                type={"primary"}
                htmlType={"submit"}
                loading={mutateLoading}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
