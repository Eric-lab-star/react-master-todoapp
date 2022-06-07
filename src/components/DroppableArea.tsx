import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCards";
import styled from "styled-components";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { taskState } from "../atom";

interface IArea {
  isdraggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

interface ITask {
  value: { text: string; id: number }[];
  category: string;
  index: number;
}

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

const Area = styled.div<IArea>`
  margin-top: 20px;
  background: ${(props) =>
    props.isDraggingOver
      ? "#cbef5e"
      : props.isdraggingFromThisWith
      ? "#6ab04c"
      : "#badc58"};
  border-radius: 5px;
  min-height: 150px;
  min-width: 100%;
`;

export default memo(function DroppableArea({ value, category, index }: ITask) {
  const { register, setValue, handleSubmit } = useForm<{ task: string }>();
  const setTask = useSetRecoilState(taskState);
  const onValid = (data: { task: string }) => {
    const newTodo = { text: data.task, id: Date.now() };
    setTask((prev) => {
      const newArray = [...prev];
      const targetBorad = { ...newArray[index] };
      const copytarget = targetBorad[category].slice();
      copytarget.push(newTodo);
      targetBorad[category] = copytarget;
      newArray[index] = targetBorad;
      localStorage.setItem("task", JSON.stringify(newArray));
      return newArray;
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
      <Droppable droppableId={category} direction="vertical" type="task">
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
