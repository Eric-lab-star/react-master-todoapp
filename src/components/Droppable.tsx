import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./Draggable";
import styled from "styled-components";
import { memo } from "react";

const Board = styled.div`
  background-color: #203abe;
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
  background: ${(props) => (props.isdraggingFromThisWith ? "red" : "blue")};
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

interface ITask {
  value: string[];
  id: string;
}

export default memo(function DroppableArea({ value, id }: ITask) {
  return (
    <Droppable droppableId={id}>
      {(magic, { isDraggingOver, draggingFromThisWith }) => (
        <Board ref={magic.innerRef} {...magic.droppableProps}>
          <Title>{id}</Title>
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
