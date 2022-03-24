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

import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams()[0]);
  const { isLoading: kanbanLoading } = useKanbans(useKanbanSearchParams());
  const isLoading = taskLoading || kanbanLoading;

  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
            <ColumnContainer>
              {kanbans?.map((item, index) => (
                <Drag
                  key={item.id}
                  draggableId={"kanban" + item.id}
                  index={index}
                >
                  <KanbanColumn key={item.id} kanban={item} />
                </Drag>
              ))}
              <CreateKanban />
            </ColumnContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};
export const ColumnContainer = styled(DropChild)`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`;
