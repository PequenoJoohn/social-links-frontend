"use client";
import { signOut } from "next-auth/react";
import { Button } from "../Button";
import { signIn } from "@/auth";
import { useState } from "react";
import signInServer from "@/config/signIn";
import Link from "next/link";
import { GoogleButton } from "../ButtonGoogle";
import signOutServer from "../../../config/signOut";
import { SignOutButton } from "../ButtonSignout";
import { BsArrowDown } from "react-icons/bs";
import { CgArrowDown } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";

// function SignOut() {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signOut();
//       }}
//     >
//       <Button title="Sign out" model="round" type="submit" />
//     </form>
//   );
// }

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none"
        onClick={toggleDropdown}
      >
        <IoIosArrowDown />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <Link
            href={"/profile"}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Profile
          </Link>

          <a
            href="#"
            onClick={() => signOutServer()}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};
