"use client";

import { useCurrentUser } from "@/config/currentUser";

export const CurrentUserComponent = () => {
  const { data: session, status, update } = useCurrentUser();

  console.log(session, status);

  return <p>user</p>;
};
