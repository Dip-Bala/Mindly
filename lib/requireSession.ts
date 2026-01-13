import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function requireSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
