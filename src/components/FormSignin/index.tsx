"use client";

import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import * as zod from "zod";
import { Button } from "../ui/Button";
import { api } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Inputs = {
  email: string;
  password: string;
};

const FormSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

export const FormSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
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
      <label className="w-full bg-gray-100 relative">
        <input
          className="px-2 py-2 bg-gray-100 rounded-md w-full"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="At least 8 characters"
        />

        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <PiEyeBold /> : <PiEyeClosed />}
        </button>
      </label>
      {errors.password && (
        <p className="text-xs text-red-500">{errors.password.message}</p>
      )}

      <Link href={"/forgot-password"} className="w-full text-end">
        <p className="text-[#157aff]">Forgot password?</p>
      </Link>
      <Button model="square" title="login" type="submit" />
    </form>
  );
};
