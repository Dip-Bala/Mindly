import LogoutButton from "@/components/layout/LogoutButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ThemeToggle/>
      <p>Welcome {session.user?.email}</p>
       <LogoutButton />
    </div>
  );
}
