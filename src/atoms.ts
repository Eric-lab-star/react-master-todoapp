import { atom } from "recoil";
import { ITodo } from "./interfaces";

export const toDoArrayState = atom<ITodo[]>({
  key: "toDoArray",
  default: [],
});
