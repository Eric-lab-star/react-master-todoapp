import { atom, selector } from "recoil";

interface ITask {
  [key: string]: { text: string; id: number }[];
}

export const clickState = atom({
  key: "click",
  default: false,
});

export const taskState = atom<ITask>({
  key: "todostate",
  default: {},
});
