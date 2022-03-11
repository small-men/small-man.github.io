import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Dropdown, Menu, Button } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <Left gap={2}>
          <SoftwareLogo width={"18rem"} />
          <h3>项目</h3>
          <h3>用户</h3>
        </Left>
        <Right>
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
        </Right>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
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

const Main = styled.main``;
