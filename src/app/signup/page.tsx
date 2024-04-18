import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { FormSignUp } from "@/components/FormSignup";

async function getSession() {
  const session = await auth();
  return {
    session,
  };
}

export default async function Signup() {
  const { session } = await getSession();

  if (session) return redirect("/");

  return (
    <main className="flex h-[100vh]">
      <div className="bg-[#984222] hidden sm:hidden md:max-w-[880px] lg:flex w-full justify-center items-center">
        <Link href={"/"}>
          <Image src="/images/icone.png" alt="B" width={60} height={60} />
        </Link>
      </div>

      <div className="flex justify-center flex-col items-center bg-[#FEFEFA] w-full px-4">
        <FormSignUp />
      </div>
    </main>
  );
}
