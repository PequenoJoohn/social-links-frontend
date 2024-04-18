import { signIn } from "@/auth";
import { ReactNode } from "react";

interface IButton {
  title?: string;
  model: "square" | "round";
  type: "submit" | "reset" | "button";
  classes?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export const Button = ({ ...props }: IButton) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`
      ${props.classes}
      ${props.icon && "flex gap-2 items-center"}
      ${
        props.model === "square"
          ? "bg-[#1e2330] text-white px-6 py-3 rounded-md"
          : "bg-[#1e2330] text-white px-6 py-3 rounded-full"
      }
      `}
    >
      {props.icon} {props.title}
    </button>
  );
};
