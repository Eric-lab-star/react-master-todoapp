import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { memo } from "react";
const Cards = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "red" : "#f0932b")};
  padding: 20px;
  border-radius: 3px;
  margin-bottom: 3px;
  color: white;
  box-shadow: ${(props) =>
    props.isDragging ? "2px 2px 10px rgba(0,0,0, 0.5)" : null};
`;

interface ITodo {
  todo: string;
  index: number;
}

export default memo(function DraggableCard({ todo, index }: ITodo) {
  return (
    <Draggable draggableId={todo} index={index}>
      {(magic, snapshot) => (
        <Cards
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todo}
        </Cards>
      )}
    </Draggable>
  );
});
