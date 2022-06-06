import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { taskState } from "../atom";
import DraggableBoard from "./DraggableBoard";

const BoardDropArea = styled.div`
  display: flex;
`;

export default function DropBoards() {
  const task = useRecoilValue(taskState);

  return (
    <Droppable droppableId="boards" direction="horizontal">
      {(provided) => (
        <BoardDropArea ref={provided.innerRef} {...provided.droppableProps}>
          {Object.keys(task).map((category, index) => (
            <DraggableBoard key={category} category={category} index={index} />
          ))}
          {provided.placeholder}
        </BoardDropArea>
      )}
    </Droppable>
  );
}
