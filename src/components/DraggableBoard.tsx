import { Draggable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ITask, taskState } from "../atom";
import DroppableArea from "./DroppableArea";

interface IBoardprops {
  category: string;
  index: number;
}

const Board = styled.div`
  margin: 5px;
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
          <DroppableArea
            value={task[index][category]}
            category={category}
            index={index}
          />
        </Board>
      )}
    </Draggable>
  );
}
