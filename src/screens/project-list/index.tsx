import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProject } from "utils/use-project";
import { useUsers } from "utils/use-user";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
export const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchParams();
  const { open } = useProjectModal();

  const debounceParam = useDebounce(param, 500);
  const { error, isLoading, data: list } = useProject(debounceParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <ErrorBox error={error} />
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
