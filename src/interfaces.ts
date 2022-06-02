export interface ITodo {
  todo: string;
  id: number;
  category: Categories;
}

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
