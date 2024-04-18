import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "../ui/Button";
import { Dropdown } from "../ui/DropDown";

export const Navbar = async () => {
  const session = await auth();

  return (
    <div className="w-full h-18 flex justify-center px-[25px] fixed top-4">
      <header className="w-full sm:max-w-[640px] md:max-w-[1024px] lg:max-w-[1728px] rounded-full flex justify-between items-center h-16 px-4 py-2 bg-[#ffffff]">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <Image src="/images/icone.png" alt="B" width={60} height={60} />
          </Link>
          <nav>
            <ul className="flex gap-2">
              <li>a</li>
              <li>b</li>
              <li>c</li>
              <li>d</li>
            </ul>
          </nav>
        </div>

        {session?.user ? (
          <div className="flex items-center gap-4">
            {session.user.image && (
              <Image
                className="rounded-full"
                src={session.user.image}
                width={32}
                height={32}
                alt={session.user.name ? session.user.name : "User profile"}
              />
            )}
            <div>{session.user.name}</div>
            <Dropdown />
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href={"/api/auth/signin"}>
              <Button title="Log in" model="square" type="button" />
            </Link>
            <Link href={"/signup"}>
              <Button title="Sign up free" model="round" type="button" />
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};
