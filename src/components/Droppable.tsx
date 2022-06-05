import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./Draggable";
import styled from "styled-components";
import { memo } from "react";
import { useForm } from "react-hook-form";

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
  }
`;

interface ITask {
  value: string[];
  id: string;
}

export default memo(function DroppableArea({ value, id }: ITask) {
  const { register, setValue, handleSubmit } = useForm<{ task: string }>();
  const onValid = (data: { task: string }) => {
    console.log(data);
    setValue("task", "");
  };
  return (
    <Droppable droppableId={id}>
      {(magic, { isDraggingOver, draggingFromThisWith }) => (
        <Board ref={magic.innerRef} {...magic.droppableProps}>
          <Title>{id}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("task", { required: true })}
              placeholder={`write your ${id}`}
              type="text"
            />
            <button>Click</button>
          </Form>
          <Area
            isDraggingOver={isDraggingOver}
            isdraggingFromThisWith={Boolean(draggingFromThisWith)}
          >
            {value.map((todo, index) => (
              <DraggableCard key={todo} todo={todo} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        </Board>
      )}
    </Droppable>
  );
});
