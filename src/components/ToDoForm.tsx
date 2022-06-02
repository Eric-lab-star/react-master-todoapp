import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoArrayState } from "../atoms";
import { Categories, ITodo } from "../interfaces";

const Form = styled.form`
  width: 50vw;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  & input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: 700;
    border-style: none;
    background-color: inherit;
    border-bottom: 1px solid white;
    margin-right: 10px;
    color: white;
  }
  & button {
    height: 1.8em;
    background-color: #0097e6;
    border-style: none;
    border-radius: 5px;
    color: white;
  }
`;

export default function ToDoForm() {
  const setToDoArray = useSetRecoilState(toDoArrayState);
  const { register, handleSubmit, setValue } = useForm<ITodo>();

  const onSubmit: SubmitHandler<ITodo> = ({ todo }) => {
    setToDoArray((pre) => [
      { todo: todo, id: Date.now(), category: "TODO" as Categories },
      ...pre,
    ]);
    setValue("todo", "");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("todo")} type="text" autoComplete="off" />
        <button>ADD</button>
      </Form>
    </div>
  );
}
