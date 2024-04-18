"use server";

import { signOut } from "@/auth";

async function signOutServer() {
  await signOut();
}

export default signOutServer;
