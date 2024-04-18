import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/Button";
import { FormSignIn } from "@/components/FormSignin";
import { GoogleButton } from "@/components/ui/ButtonGoogle";

async function getSession() {
  const session = await auth();
  return {
    session,
  };
}

export default async function Signin() {
  // const { session } = await getSession();
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
        <Link
          href={"/"}
          className="absolute top-[120px] block sm:block md:hidden"
        >
          <Image src="/images/icone.png" alt="B" width={60} height={60} />
        </Link>
        <div className="max-w-[400px] w-full">
          <h2 className="text-[24px] font-[600] mb-2">Welcome back!</h2>

          <p className="mb-6">Start your portfolio ready now!</p>

          <FormSignIn />

          <div className="flex items-center justify-center my-4">
            <div className="border-b border-[#010B13] w-full"></div>
            <div className="mx-4 text-[#010B13]">or</div>
            <div className="border-b border-[#010B13] w-full"></div>
          </div>

          <GoogleButton title="SignIn with Google" />
        </div>

        <p className="text-md mt-8">
          {" "}
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <span className="text-[#984222]">Sign up</span>
          </Link>
        </p>
      </div>
    </main>
  );
}
