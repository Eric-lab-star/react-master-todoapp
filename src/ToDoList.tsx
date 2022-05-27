import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  todo: string;
  hello: string;
};

export const ToDoList = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  console.log(watch());
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("todo", { required: true })} />
        <input {...register("hello", { required: true })} />
        <input type={"submit"} />
      </form>
    </div>
  );
};
