import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./Draggable";
import styled from "styled-components";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
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
  background: ${(props) =>
    props.isDraggingOver
      ? "#c7ecee"
      : props.isdraggingFromThisWith
      ? "#6ab04c"
      : "#badc58"};
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Form = styled.form`
  width: 100%;
  & input {
    width: 100%;
    box-sizing: border-box;
  }
`;

interface ITask {
  value: { text: string; id: number }[];
  category: string;
}

export default memo(function DroppableArea({ value, category }: ITask) {
  const { register, setValue, handleSubmit } = useForm<{ task: string }>();
  const [task, setTask] = useRecoilState(taskState);
  const onValid = (data: { task: string }) => {
    console.log(data.task);
    setTask((prev) => {
      const newObj = { ...prev };
      const copyArray = newObj[`${category}`].slice();
      copyArray.push({ text: data.task, id: Math.random() * 100 });
      newObj[`${category}`] = copyArray;
      return newObj;
    });
    setValue("task", "");
  };
  console.log(task[`${category}`]);
  return (
    <Droppable droppableId={category}>
      {(magic, { isDraggingOver, draggingFromThisWith }) => (
        <Board ref={magic.innerRef} {...magic.droppableProps}>
          <Title>{category}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("task", { required: true })}
              placeholder={`write your ${category}`}
              type="text"
            />
            <input type={"submit"} value="Add" />
          </Form>
          <Area
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
        </Board>
      )}
    </Droppable>
  );
});
