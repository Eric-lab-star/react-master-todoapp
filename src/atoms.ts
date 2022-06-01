import { atom, selector } from "recoil";
import ToDo from "./components/ToDo";
import { categories, IToDo } from "./Interfaces";

export const ToDosState = atom<IToDo[]>({
  key: "toDosState",
  default: [],
});

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TODO,
});

export const ToDoselector = selector({
  key: "ToDoSelector",
  get: ({ get }) => {
    const ToDos = get(ToDosState);
    const category = get(categoryState);

    return ToDos.filter((todo) => todo.category === category);
  },
});
