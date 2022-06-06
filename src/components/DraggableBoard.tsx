import { Draggable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { taskState } from "../atom";
import DroppableArea from "./DroppableArea";

interface IBoardprops {
  category: string;
  index: number;
}

const Board = styled.div`
  margin: 10px;
`;

export default function DraggableBoard({ category, index }: IBoardprops) {
  const task = useRecoilValue(taskState);
  return (
    <Draggable draggableId={"Board:" + category} index={index}>
      {(provided) => (
        <Board
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DroppableArea value={task[category]} category={category} />
        </Board>
      )}
    </Draggable>
  );
}
