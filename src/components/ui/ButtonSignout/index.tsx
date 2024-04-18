"use client";
import signOutServer from "@/config/signOut";
import { Button } from "../Button";

export const SignOutButton = () => {
  return (
    <Button
      title="Sign out"
      model="square"
      type="button"
      classes="w-[200px] p-0"
      onClick={() => signOutServer()}
    />
  );
};
