import styled, { createGlobalStyle } from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { taskState } from "./atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TrashBox } from "./components/TrashBox";
import { useForm } from "react-hook-form";
import DropBoards from "./components/DropBoard";
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: #dff9fb;
  font-family: santorini-210;
`;

const CategoryForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #badc58;
  border-radius: 4px;
  padding: 20px;
  color: white;
`;

const Form = styled.form`
  margin-top: 10px;
  & input[type="text"] {
    color: gray;
    border-style: none;
    background-color: transparent;
    border-bottom: 1px solid white;
  }
  & input[type="submit"] {
    background-color: gray;
    border-style: none;
    border: 1px solid white;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  }
`;

export default function App() {
  const setTask = useSetRecoilState(taskState);

  const { register, setValue, handleSubmit } = useForm<{ category: string }>();
  const onValid = ({ category }: { category: string }) => {
    setTask((prev) => {
      const newArray = [...prev, { [category]: [] }];
      localStorage.setItem("task", JSON.stringify(newArray));
      return newArray;
    });

    setValue("category", "");
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log("source:", source);
    console.log("destination:", destination);
    if (
      destination &&
      destination.droppableId === source.droppableId &&
      source.droppableId === "boards"
    ) {
      setTask((prev) => {
        const newArray = [...prev];
        const targetBoard = { ...newArray[source.index] };
        newArray.splice(source.index, 1);
        newArray.splice(destination.index, 0, targetBoard);
        localStorage.setItem("task", JSON.stringify(newArray));
        return newArray;
      });
    }

    if (
      destination &&
      destination.droppableId === source.droppableId &&
      source.droppableId !== "boards"
    ) {
      setTask((prev) => {
        const newArray = [...prev];
        const [targetObj] = newArray.filter((boardObj) => {
          return Object.keys(boardObj)[0] === source.droppableId;
        });
        const targetIndex = newArray.indexOf(targetObj);
        const copyCards = targetObj[source.droppableId].slice();
        const targetCard = copyCards[source.index];
        copyCards.splice(source.index, 1);
        copyCards.splice(destination.index, 0, targetCard);
        const copyTargetObj = { ...targetObj };
        copyTargetObj[source.droppableId] = copyCards;
        newArray[targetIndex] = copyTargetObj;
        localStorage.setItem("task", JSON.stringify(newArray));
        return newArray;
      });
    }

    if (
      destination &&
      destination.droppableId !== source.droppableId &&
      destination.droppableId !== "trashBox"
    ) {
      setTask((prev) => {
        const newArray = [...prev];
        const [sourceObj] = newArray.filter((boardObj) => {
          return Object.keys(boardObj)[0] === source.droppableId;
        });
        const sourceIndex = newArray.indexOf(sourceObj);
        const allSourceCard = sourceObj[source.droppableId].slice();
        const sourceCard = allSourceCard[source.index];
        allSourceCard.splice(source.index, 1);
        const copySourceObj = { ...sourceObj };
        copySourceObj[source.droppableId] = allSourceCard;
        newArray[sourceIndex] = copySourceObj;

        const [destObj] = newArray.filter((boardObj) => {
          return Object.keys(boardObj)[0] === destination.droppableId;
        });
        const destIndex = newArray.indexOf(destObj);
        const allDestCard = destObj[destination.droppableId].slice();
        allDestCard.splice(destination.index, 0, sourceCard);
        const copyDestObj = { ...destObj };
        copyDestObj[destination.droppableId] = allDestCard;
        newArray[destIndex] = copyDestObj;
        localStorage.setItem("task", JSON.stringify(newArray));
        return newArray;
      });
    }
    if (destination && destination.droppableId === "trashBox") {
      setTask((prev) => {
        const newArray = [...prev];
        const sourceObjIndex = newArray.findIndex((v) => v[source.droppableId]);
        const copySourceObj = { ...newArray[sourceObjIndex] };

        const allSourceCard = copySourceObj[source.droppableId].slice();
        allSourceCard.splice(source.index, 1);
        copySourceObj[source.droppableId] = allSourceCard;

        newArray[sourceObjIndex] = copySourceObj;
        localStorage.setItem("task", JSON.stringify(newArray));
        return newArray;
      });
    }

    return null;
  };
  return (
    <Main>
      <GlobalCss />
      <CategoryForm>
        <h1>Create Your Boards</h1>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            type="text"
            placeholder="Write your Category"
            {...register("category", { required: true })}
          />
          <input type="submit" value="+" />
        </Form>
      </CategoryForm>
      <DragDropContext onDragEnd={onDragEnd}>
        <DropBoards />
        <TrashBox />
      </DragDropContext>
    </Main>
  );
}
