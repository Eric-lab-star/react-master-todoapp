import styled, { createGlobalStyle } from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { toDoState } from "./atom";
import { useRecoilState } from "recoil";
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
  background-color: #304990;
  font-family: santorini-210;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 20px;
  border-radius: 3px;
  min-height: 300px;
`;
const Board = styled.div`
  background-color: #7f8fa6;
  padding: 20px;
  border-radius: 3px;
  width: 200px;
`;

const Cards = styled.div`
  background-color: #273c75;
  padding: 20px;
  border-radius: 3px;
  margin-bottom: 3px;
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
    if (!draggableId) return;

    setToDos((prev) => {
      const newArray = prev.slice();
      newArray.splice(source.index, 1);
      newArray.splice(destination?.index as number, 0, draggableId);
      return newArray;
    });
  };
  return (
    <Main>
      <GlobalCss />

      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((todo, index) => (
                  <Draggable key={todo} draggableId={todo} index={index}>
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
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </DragDropContext>
    </Main>
  );
}
