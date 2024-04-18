"use client";
import { Button } from "../Button";
import { signIn } from "next-auth/react";

interface IGoogleButton {
  title: string;
}

export const GoogleButton = ({ ...props }: IGoogleButton) => {
  return (
    <Button
      title={props.title}
      model="square"
      type="button"
      classes="w-full"
      onClick={() => signIn("google")}
    />
  );
};
