"use client";

import Link from "next/link";
import { FormSignUp, IFormSignUp, Inputs } from "..";
import { GoogleButton } from "@/components/ui/ButtonGoogle";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import { Button } from "@/components/ui/Button";

interface IFirstStep {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleNextStep: () => void;
  control: Control<Inputs, any>;
}

export const FirstStep = ({
  step,
  setStep,
  register,
  errors,
  showPassword,
  togglePasswordVisibility,
  handleNextStep,
  control,
}: IFirstStep) => {
  return (
    <div className="max-w-[400px] flex flex-col">
      <Link
        href={"/"}
        className="absolute top-[120px] block sm:block md:hidden"
      >
        <Image src="/images/icone.png" alt="B" width={60} height={60} />
      </Link>
      <div className="flex flex-col w-full gap-2 w-[345px] md:w-[400px]">
        <h2 className="text-[24px] font-[600] mb-2">Register now!</h2>

        <p className="mb-6">Start your portfolio ready now!</p>

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email é obrigatório" }}
          render={({ field, fieldState, formState }) => (
            <input
              {...field}
              className="px-2 py-2 bg-gray-100 rounded-md w-full"
              type="text"
              placeholder="you@example.com"
              onChange={(e) => {
                const value = e.target.value.trim();
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}

        <label className="w-full relative flex items-center ">
          <span className=" absolute px-2">tree.my/</span>
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username é obrigatório",
            }}
            render={({ field, fieldState, formState }) => (
              <input
                {...field}
                className="py-2 pr-2 pl-[70px] bg-gray-100 rounded-md w-full "
                type="text"
                onChange={(e) => {
                  const value = e.target.value;
                  const isValid = /^[a-zA-Z0-9]*$/.test(value);
                  if (isValid) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
        </label>
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username.message}</p>
        )}

        <Button
          model="square"
          classes="w-full"
          title="Continuar"
          type="submit"
          onClick={() => handleNextStep()}
        />

        <div className="flex items-center justify-center my-4">
          <div className="border-b border-[#010B13] w-full"></div>
          <div className="mx-4 text-[#010B13]">or</div>
          <div className="border-b border-[#010B13] w-full"></div>
        </div>

        <GoogleButton title="SignUp with Google" />
      </div>

      <p className="text-md mt-8">
        Do you have an account?{" "}
        <Link href="/signin">
          <span className="text-[#984222]">Sign in</span>
        </Link>
      </p>
    </div>
  );
};
