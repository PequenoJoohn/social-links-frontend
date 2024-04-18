"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "../ui/Button";

type Inputs = {
  email: string;
};

const FormSchema = zod.object({
  email: zod.string().email(),
});

export const FormForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="px-2 py-2 bg-gray-100 rounded-md"
        type="text"
        {...register("email")}
        placeholder="you@example.com"
      />
      {errors.email && (
        <p className="text-xs text-red-500">{errors.email.message}</p>
      )}

      <Button model="square" title="Reset password" type="submit" />
    </form>
  );
};
