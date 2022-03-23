import { useAuth } from "context/auth-context";
import { ProjectListScreen, ProjectScreen } from "screens";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Dropdown, Menu, Button } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { useState } from "react";
import { ProjectPopover } from "components/project-popover";
import { useProjectModal } from "screens/project-list/util";

export const AuthenticatedApp = () => {
  // const { open } = useProjectModal();

  return (
    <BrowserRouter>
      <Container>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/project"} element={<ProjectListScreen />} />
            <Route path={"/project/:projectId/*"} element={<ProjectScreen />} />
            <Route index element={<ProjectListScreen />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Container>
    </BrowserRouter>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <Left gap={2}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </Left>
      <Right>
        <User />
      </Right>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>Hi,{user?.name}</Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 0;
`;

const Left = styled(Row)``;
const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
