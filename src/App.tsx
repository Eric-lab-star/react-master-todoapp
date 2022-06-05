import styled, { createGlobalStyle } from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { taskState } from "./atom";
import { useRecoilState } from "recoil";

import DroppableArea from "./components/Droppable";
const GlobalCss = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input:focus{
  outline: none;
}

`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: #dff9fb;
  font-family: santorini-210;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  border-radius: 3px;
  min-height: 300px;
  gap: 20px;
`;

export default function App() {
  const [task, setTask] = useRecoilState(taskState);

  const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
    if (destination) {
      if (destination.droppableId === source.droppableId) {
        setTask((prev) => {
          const newTaskObj = { ...prev };
          const sourceCopy = newTaskObj[source.droppableId].slice();
          const TaskObjItem = sourceCopy[source.index];
          sourceCopy.splice(source.index, 1);
          sourceCopy.splice(destination?.index, 0, TaskObjItem);

          newTaskObj[source.droppableId] = sourceCopy;

          return newTaskObj;
        });
      } else {
        setTask((prev) => {
          const newTaskObj = { ...prev };
          const sourceCopy = newTaskObj[`${source.droppableId}`].slice();
          const destinationCopy =
            newTaskObj[`${destination?.droppableId}`].slice();
          const TaskObjItem = sourceCopy[source.index];
          sourceCopy.splice(source.index, 1);
          destinationCopy.splice(destination?.index, 0, TaskObjItem);

          newTaskObj[`${source.droppableId}`] = sourceCopy;
          newTaskObj[`${destination?.droppableId}`] = destinationCopy;
          return newTaskObj;
        });
      }
    }

    return null;
  };
  return (
    <Main>
      <GlobalCss />
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          {Object.entries(task).map((value) => (
            <DroppableArea
              key={value[0]}
              category={value[0]}
              value={value[1]}
            />
          ))}
        </Boards>
      </DragDropContext>
    </Main>
  );
}
