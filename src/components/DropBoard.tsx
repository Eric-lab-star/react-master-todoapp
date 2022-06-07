import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { taskState } from "../atom";
import DraggableBoard from "./DraggableBoard";

const BoardDropArea = styled.div`
  display: flex;
  width: 100%;
  overflow: scroll;
`;

export default function DropBoards() {
  const task = useRecoilValue(taskState);
  return (
    <Droppable droppableId="boards" direction="horizontal" type="Board">
      {(provided) => (
        <BoardDropArea ref={provided.innerRef} {...provided.droppableProps}>
          {task.map((boardObj, index) => {
            const category = Object.keys(boardObj)[0];
            return (
              <DraggableBoard
                key={category}
                category={category}
                index={index}
              />
            );
          })}
          {provided.placeholder}
        </BoardDropArea>
      )}
    </Droppable>
  );
}
