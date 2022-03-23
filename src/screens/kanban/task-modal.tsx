import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskSelect } from "components/task-select";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useEditTask } from "utils/use-task";
import { useTaskModal, useTasksQueryKey } from "./util";

export const TaskModal = () => {
  const [form] = useForm();
  const { close, editingTask, isLoading, editingTaskId } = useTaskModal();
  const { mutateAsync: editTask } = useEditTask(useTasksQueryKey());
  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={isLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
      forceRender={true}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={editingTask}
        form={form}
      >
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskSelect defaultOptionName="类型" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
