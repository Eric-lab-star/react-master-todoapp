import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ToDosState } from "../atoms";
import { IToDo, categories } from "../Interfaces";

export default function ToDo({ id, text, category }: IToDo) {
  const [toDos, setToDos] = useRecoilState(ToDosState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    const targetIndex = toDos.findIndex((toDos) => toDos.id === id);
    const newToDo = { id, text, category: name as IToDo["category"] };

    setToDos((pre) => [
      ...pre.slice(0, targetIndex),
      newToDo,
      ...pre.slice(targetIndex + 1),
    ]);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== categories.DOING && (
        <button name={categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== categories.DONE && (
        <button name={categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
      {category !== categories.TODO && (
        <button name={categories.TODO} onClick={onClick}>
          TODO
        </button>
      )}
    </li>
  );
}
