import { FormEvent, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { clickState, taskState } from "../atom";

import DroppableArea from "./Droppable";

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  border-radius: 3px;
  min-height: 300px;
  gap: 20px;
`;

export default function DropBoards() {
  const task = useRecoilValue(taskState);
  const click = useRecoilValue(clickState);

  return (
    <Droppable droppableId="boards">
      {(provided, snapshot) => (
        <Boards ref={provided.innerRef} {...provided.droppableProps}>
          {Object.keys(task).map((board, index) => {
            return (
              <Draggable
                key={board}
                draggableId={board}
                index={index}
                isDragDisabled={click}
              >
                {(draggableProvide) => (
                  <div
                    ref={draggableProvide.innerRef}
                    {...draggableProvide.draggableProps}
                    {...draggableProvide.dragHandleProps}
                  >
                    <DroppableArea category={board} value={[...task[board]]} />
                  </div>
                )}
              </Draggable>
            );
          })}
        </Boards>
      )}
    </Droppable>
  );
}
