import { atom, selector } from "recoil";

export const toDoState = atom({
  key: "todostate",
  default: ["a", "b", "c", "d", "e"],
});
