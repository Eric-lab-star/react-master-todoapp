import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

type Input = {
  firstName: string;
  gender: GenderEnum;
};

export const ToDoList = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  // console.log(watch());
  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input {...register("firstName")} />
        <label>Gender Selection</label>
        <select {...register("gender")}>
          <option value={"female"}>female</option>
          <option value={"male"}>male</option>
          <option value={"other"}>other</option>
        </select>
      </form>
    </div>
  );
};
