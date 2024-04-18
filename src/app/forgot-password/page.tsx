import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { FormForgotPassword } from "@/components/FormForgotPassword";

async function getSession() {
  const session = await auth();
  return {
    session,
  };
}

export default async function ForgotPassword() {
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
        <div className="max-w-[400px] w-full">
          <h2 className="text-[24px] font-[600] mb-2">Forgot you password?</h2>

          <p className="mb-6 text-xs">
            Enter your email below to receive a password reset link.
          </p>

          <FormForgotPassword />

          <p className="mb-6 text-xs mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <span className="text-[#984222]">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
