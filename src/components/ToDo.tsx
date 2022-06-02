import { ITodo } from "../interfaces";
import styled from "styled-components";
import { Categories } from "../interfaces";
import { FormEvent, useState } from "react";
import { toDoArrayState } from "../atoms";
import { useRecoilState } from "recoil";
const Wrapper = styled.div`
  font-size: 12px;
  margin: 5px 0px;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-auto-rows: auto;
  word-break: break-all;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.button`
  border-style: none;
  margin: 0px 3px;
  background-color: #00a8ff;
  border-radius: 5px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

export default function ToDo({ todo, id, category }: ITodo) {
  const [toDo, setToDo] = useRecoilState(toDoArrayState);
  const [option, setOption] = useState(category);
  const onChange = (event: FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setOption(value as Categories);
    const targetIndex = toDo.findIndex((v) => v.id === id);
    setToDo((pre) => [
      ...pre.slice(0, targetIndex),
      { todo, id, category: value as Categories },
      ...pre.slice(targetIndex + 1),
    ]);
  };
  console.log(option);
  return (
    <Wrapper key={id}>
      <div>{todo}</div>
      <BtnContainer>
        {
          <select onChange={onChange} value={option}>
            <option>Option</option>
            <option value={Categories.TODO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </select>
        }
      </BtnContainer>
    </Wrapper>
  );
}
