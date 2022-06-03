import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { memo } from "react";
const Cards = styled.div`
  background-color: #273c75;
  padding: 20px;
  border-radius: 3px;
  margin-bottom: 3px;
`;

interface ITodo {
  todo: string;
  index: number;
}

export default memo(function DraggableCard({ todo, index }: ITodo) {
  return (
    <Draggable draggableId={todo} index={index}>
      {(magic) => (
        <Cards
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
