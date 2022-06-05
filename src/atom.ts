import { atom, selector } from "recoil";

interface ITask {
  [key: string]: { text: string; id: number }[];
}

export const taskState = atom<ITask>({
  key: "todostate",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
