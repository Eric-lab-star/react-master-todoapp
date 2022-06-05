import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./Draggable";
import styled from "styled-components";
import { FormEvent, memo } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { taskState } from "../atom";

const Board = styled.div`
  background-color: #badc58;
  padding: 20px;
  border-radius: 3px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 15px;
  margin-bottom: 10px;
`;

interface IArea {
  isdraggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IArea>`
  margin-top: 20px;
  background: ${(props) =>
    props.isDraggingOver
      ? "#cbef5e"
      : props.isdraggingFromThisWith
      ? "#6ab04c"
      : "#badc58"};
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  & input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    border-style: none;
    border-bottom: 1px solid white;
    background-color: inherit;
    color: gray;
  }
  & input[type="submit"] {
    border-style: none;
    border-radius: 3px;
    color: white;
    background-color: gray;
    border: 1px solid white;
    &:hover {
      cursor: pointer;
    }
  }
`;

interface ITask {
  value: { text: string; id: number }[];
  category: string;
}

export default memo(function DroppableArea({ value, category }: ITask) {
  const { register, setValue, handleSubmit } = useForm<{ task: string }>();
  const setTask = useSetRecoilState(taskState);
  const onValid = (data: { task: string }) => {
    const newTodo = { text: data.task, id: Date.now() };
    setTask((prev) => {
      return { ...prev, [category]: [...prev[category], newTodo] };
    });
    setValue("task", "");
  };
  return (
    <Board>
      <Title>{category}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("task", { required: true })}
          placeholder={`Write your "${category}"`}
          type="text"
        />
        <input type={"submit"} value="+" />
      </Form>
      <Droppable droppableId={category}>
        {(magic, { isDraggingOver, draggingFromThisWith }) => (
          <Area
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingOver={isDraggingOver}
            isdraggingFromThisWith={Boolean(draggingFromThisWith)}
          >
            {value.map((todo, index) => (
              <DraggableCard
                key={todo.id}
                todoText={todo.text}
                todoId={todo.id}
                index={index}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Board>
  );
});
