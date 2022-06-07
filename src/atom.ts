import { atom } from "recoil";

export interface ITask {
  [key: string]: { text: string; id: number }[];
}

const myStorage = localStorage.getItem("task");

export const taskState = atom<ITask[]>({
  key: "todostate",
  default: JSON.parse(myStorage as string),
});
