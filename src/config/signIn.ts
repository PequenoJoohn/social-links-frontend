"use server";

import { signIn } from "@/auth";

async function signInServer() {
  await signIn("google");
}

export default signInServer;
