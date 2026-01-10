"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Input from "@/components/ui/Input";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    console.log(res);
if (!res) {
    setError("Something went wrong. Please try again.");
    return;
  }

  if (res.error) {
    setError("Invalid email or password");
    return;
  }

  router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
  <div className="text-center space-y-1">
    <h1 className="text-xl font-semibold">Login</h1>
    <p className="text-sm opacity-70">
      Enter your credentials to access your account.
    </p>
  </div>
  {error && (
  <p className="text-sm text-red-500 text-center">
    {error}
  </p>
)}

  <Input
    label="Email"
    placeholder="eg. john@gmail.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <Input
    label="Password"
    type="password"
    placeholder="••••••••"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    type="submit"
    className="
      w-full
      bg-[color:var(--color-contrast)]
      text-[color:var(--color-text-muted)]
      py-3
      rounded-lg
      font-medium
      hover:opacity-90
      cursor-pointer
      disabled:cursor-not-allowed
    "
  >
    Login
  </button>
  <p className="text-sm text-center opacity-70">
        Do not have an account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
</form>

  );
}
