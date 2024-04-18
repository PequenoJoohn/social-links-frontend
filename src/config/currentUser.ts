import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  console.log("CURRENT EMAIL", session.data?.user?.email);
  console.log("CURRENT ID", session.data?.user?.id);

  return session;
};
