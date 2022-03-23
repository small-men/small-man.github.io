import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/use-kanban";
import { useTasks } from "utils/use-task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams()[0]);
  const { isLoading: kanbanLoading } = useKanbans(useKanbanSearchParams());
  const isLoading = taskLoading || kanbanLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnContainer>
          {kanbans?.map((item) => (
            <KanbanColumn key={item.id} kanban={item} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};
export const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`;
