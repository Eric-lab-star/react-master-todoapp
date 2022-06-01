import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoArrayState } from "../atoms";

const ToDoContainer = styled.div`
  width: 50vw;
  height: 10vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 100px;
  word-break: break-all;
`;

export default function ToDoList() {
  const toDoArray = useRecoilValue(toDoArrayState);
  return (
    <>
      {toDoArray.map((todo, index) => (
        <ToDoContainer key={index}>
          <div>{todo.todo}</div>
          <div>
            <button>Delete</button>
          </div>
        </ToDoContainer>
      ))}
    </>
  );
}
