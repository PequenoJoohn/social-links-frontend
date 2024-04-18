"use client";

import Link from "next/link";
import { FormSignUp, IFormSignUp, Inputs } from "..";
import { GoogleButton } from "@/components/ui/ButtonGoogle";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import { Button } from "@/components/ui/Button";
import { BsArrowLeft } from "react-icons/bs";

interface IFirstStep {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleNextStep: () => void;
  handleBackStep: () => void;
}

export const SecondStep = ({
  step,
  setStep,
  register,
  errors,
  showPassword,
  togglePasswordVisibility,
  handleBackStep,
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
        {" "}
        <h2 className="text-[24px] font-[600] mb-2">Not long to go...</h2>
        <p className="mb-6">All that remains is to create a secure key</p>
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
        <div className="flex gap-2">
          <Button
            model="square"
            type="button"
            classes="w-1/5"
            onClick={() => handleBackStep()}
            icon={<BsArrowLeft color="#FFFFFF" size={24} />}
          />

          <Button
            model="square"
            classes="w-full"
            title="Finalizar"
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};
