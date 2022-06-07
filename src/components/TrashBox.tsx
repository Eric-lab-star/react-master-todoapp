import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

export const Trash = styled.div<{ isDraggingOver: boolean }>`
  line-height: 6em;
  text-align: center;
  width: 6em;
  height: 6em;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isDraggingOver ? "#27461a" : "#6ab04c"};
`;

export function TrashBox() {
  return (
    <Droppable droppableId={"trashBox"} type="task">
      {(provided, snapshot) => {
        return (
          <Trash
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            Delete
          </Trash>
        );
      }}
    </Droppable>
  );
}
