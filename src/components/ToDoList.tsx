import { FormEvent } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ToDosState } from "../atoms";

const ListContainer = styled.div`
  margin-top: 10px;
`;

export default function ToDoList() {
  const [toDos, setToDos] = useRecoilState(ToDosState);
  const onClick = (event: FormEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    const targetTodo = toDos.find((todo) => todo.id === parseInt(id));

    setToDos((oldToDos) =>
      oldToDos.map(function (oldToDo) {
        if (oldToDo === targetTodo && targetTodo) {
          return { ...oldToDo, category: "DOING" };
        }
        return { ...oldToDo };
      })
    );
  };
  return (
    <ListContainer>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button id={String(todo.id)} onClick={onClick}>
              {todo.category}
            </button>
          </li>
        ))}
      </ul>
    </ListContainer>
  );
}
