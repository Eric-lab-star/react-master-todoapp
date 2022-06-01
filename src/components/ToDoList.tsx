import { FormEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, ToDoselector } from "../atoms";
import { categories } from "../Interfaces";
import ToDo from "./ToDo";
const ListContainer = styled.div`
  margin-top: 10px;
`;

export default function ToDoList() {
  const toDos = useRecoilValue(ToDoselector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onChange = (event: FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as categories);
  };
  return (
    <>
      <ListContainer>
        <select onInput={onChange} value={category}>
          <option value={categories.TODO}>To Do</option>
          <option value={categories.DOING}>Doing</option>
          <option value={categories.DONE}>Done</option>
        </select>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ListContainer>
    </>
  );
}
