import { SubmitHandler, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, ToDosState } from "../atoms";
import { IForm } from "../Interfaces";

export default function CreateToDo() {
  const { register, handleSubmit, setValue } = useFormContext<IForm>();
  const [toDos, setToDos] = useRecoilState(ToDosState);
  const category = useRecoilValue(categoryState);

  const onSubmit: SubmitHandler<IForm> = ({ todo }) => {
    setToDos((pre) => [{ text: todo, category, id: Date.now() }, ...pre]);
    setValue("todo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("todo", { required: "write your ToDo First" })} />
        <button>Add Todo</button>
        <ErrorMessage
          name="todo"
          render={({ message }) => <div>{message}</div>}
        />
      </form>
    </>
  );
}
