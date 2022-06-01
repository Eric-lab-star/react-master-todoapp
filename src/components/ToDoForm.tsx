import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoArrayState } from "../atoms";
import { ITodo } from "../interfaces";

const Title = styled.h1`
  font-size: 25px;
  font-family: forma-djr-micro;
`;

export default function ToDoForm() {
  const [todoArray, setToDoArray] = useRecoilState(toDoArrayState);
  const { register, handleSubmit } = useForm<ITodo>();

  const onSubmit: SubmitHandler<ITodo> = ({ todo }) => {
    setToDoArray((pre) => [{ todo }, ...pre]);
  };

  console.log(todoArray);
  return (
    <>
      <Title>Your Personal Manager</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("todo")} />
        <button>ADD</button>
      </form>
    </>
  );
}
