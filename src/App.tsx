import styled from "styled-components";
import ToDoForm from "./components/ToDoForm";
import { Helmet } from "react-helmet";
import ToDoList from "./components/ToDoList";
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default function App() {
  return (
    <Main>
      <Helmet>
        <link rel="stylesheet" href="https://use.typekit.net/vrx3cgh.css" />
        <title>Your Personal Manager</title>
      </Helmet>
      <ToDoForm />
      <ToDoList />
    </Main>
  );
}
