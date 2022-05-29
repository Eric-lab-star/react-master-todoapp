import { atom } from "recoil";
import { IToDo } from "./Interfaces";

export const ToDosState = atom<IToDo[]>({
  key: "toDosState",
  default: [],
});
