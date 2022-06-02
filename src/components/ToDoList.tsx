import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { DoingSelector, DoneSelector, toDoSelector } from "../atoms";
import ToDo from "./ToDo";

const Wrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-between;
  margin: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 20px;
`;
export default function ToDoList() {
  const doing = useRecoilValue(DoingSelector);
  const done = useRecoilValue(DoneSelector);
  const todo = useRecoilValue(toDoSelector);
  return (
    <Wrapper>
      <Item>
        <Title>To Do Section</Title>
        {todo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Item>

      <Item>
        <Title>Doing Section</Title>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Item>

      <Item>
        <Title>Done Section</Title>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Item>
    </Wrapper>
  );
}
