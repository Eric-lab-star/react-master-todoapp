import { atom, selector } from "recoil";
import { Categories, ITodo } from "./interfaces";

export const toDoArrayState = atom<ITodo[]>({
  key: "toDoArray",
  default: [],
});

export const toDoSelector = selector<ITodo[]>({
  key: "todoSelector",
  get: ({ get }) => {
    const toDoArray = get(toDoArrayState);
    return toDoArray.filter((toDo) => toDo.category === Categories.TODO);
  },
});

export const DoingSelector = selector<ITodo[]>({
  key: "doingSelector",
  get: ({ get }) => {
    const toDoArray = get(toDoArrayState);
    return toDoArray.filter((toDo) => toDo.category === Categories.DOING);
  },
});

export const DoneSelector = selector<ITodo[]>({
  key: "doneSelector",
  get: ({ get }) => {
    const toDoArray = get(toDoArrayState);
    return toDoArray.filter((toDo) => toDo.category === Categories.DONE);
  },
});
