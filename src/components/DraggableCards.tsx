import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { memo } from "react";

const Cards = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "#b87120" : "#f0932b")};
  box-sizing: border-box;
  padding: 20px;
  border-radius: 3px;
  margin-bottom: 3px;
  color: white;
  box-shadow: ${(props) =>
    props.isDragging ? "2px 2px 10px rgba(0,0,0, 0.5)" : null};
  font-size: 11px;
`;

interface ITodo {
  todoText: string;
  todoId: number;
  index: number;
}

export default memo(function DraggableCard({ todoText, todoId, index }: ITodo) {
  return (
    <Draggable draggableId={String(todoId)} index={index}>
      {(magic, snapshot) => (
        <Cards
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todoText}
        </Cards>
      )}
    </Draggable>
  );
});
