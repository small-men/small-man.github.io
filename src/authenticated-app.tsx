import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens";
import styled from "@emotion/styled";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <Left>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </Left>
        <Right>
          <button onClick={logout}>登出</button>
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Main = styled.main``;
