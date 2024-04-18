"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { api } from "@/app/api/api";
import { zodResolver } from "@hookform/resolvers/zod";

import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { toast, ToastContainer } from "react-toastify";

export interface IFormSignUp {
  step: number;
  setStep: string;
}

export type Inputs = {
  email: string;
  password?: string;
  username: string;
};

const FormSchema = zod.object({
  email: zod.string().email(),
  username: zod.string().min(3),
  password: zod.string().min(8),
});

export const FormSignUp = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    control,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await api.post("/users", data);

      console.log(response);
      toast.success("Conta criada com sucesso!");
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextStep = () => {
    if (step <= 1 && isSubmitted && !errors.email && !errors.username) {
      setStep((step) => step + 1);
    }
  };

  const handleBackStep = () => {
    clearErrors("password");
    setValue("password", undefined);
    setStep((step) => step - 1);
  };

  useEffect(() => {
    if (step === 2) {
      clearErrors("password");
    }
  }, [clearErrors, step]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      {step === 1 ? (
        <FirstStep
          control={control}
          register={register}
          step={step}
          setStep={setStep}
          errors={errors}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          handleNextStep={handleNextStep}
        />
      ) : (
        <>
          <SecondStep
            register={register}
            step={step}
            setStep={setStep}
            errors={errors}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
          />
        </>
      )}
    </form>
  );
};
