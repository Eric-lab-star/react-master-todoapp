export interface IForm {
  todo: string;
}
export enum categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  category: categories;
  id: number;
}
