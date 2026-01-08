"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { api } from "../../lib/api";

const BaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpValuesType = z.infer<typeof BaseSchema>;

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpValuesType>({
    resolver: zodResolver(BaseSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: (data: SignUpValuesType) =>
      api.post("/auth/register", data),

    onSuccess: async (_, variables) => {
      // ✅ LOGIN USING NEXTAUTH (correct)
      const result = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });

      if (result?.error) {
        // signup succeeded but login failed (rare)
        router.push("/login");
        return;
      }

      router.push("/dashboard");
    },

    onError: (error: any) => {
      alert(error?.response?.data?.message || "Signup failed");
    },
  });

  const onSubmit: SubmitHandler<SignUpValuesType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-sm rounded-2xl shadow-md px-6 py-8"
    >
      <p className="text-lg font-medium flex gap-2">
        <LogIn />
        Register
      </p>

      <div>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={!isValid || mutation.isPending}
      >
        {mutation.isPending ? "Creating account..." : "Sign Up"}
      </button>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link href="/login">Login</Link>
      </p>
    </form>
  );
}
