export interface IForm {
  todo: string;
}
export interface IToDo {
  text: string;
  category: "TODO" | "DOING" | "DONE";
  id: number;
}
