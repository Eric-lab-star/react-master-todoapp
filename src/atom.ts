import { atom, selector } from "recoil";

interface ITask {
  [key: string]: string[];
}

export const taskState = atom<ITask>({
  key: "todostate",
  default: {
    "To Do": ["a", "b", "d"],
    Doing: ["c", "e", "f"],
    Done: ["g", "h", "i"],
  },
});
