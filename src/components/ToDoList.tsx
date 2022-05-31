import { FormEvent } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ToDosState } from "../atoms";
import ToDo from "./ToDo";
const ListContainer = styled.div`
  margin-top: 10px;
`;

export default function ToDoList() {
  const [toDos, setToDos] = useRecoilState(ToDosState);

  return (
    <ListContainer>
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </ListContainer>
  );
}
