import { atom } from "recoil";

interface ITask {
  [key: string]: { text: string; id: number }[];
}

export const taskState = atom<ITask>({
  key: "todostate",
  default: {},
});

export const categoryState = atom({
  key: "categorystate",
  default: ["todo", "doing", "done", "1", "2", "3"],
});
