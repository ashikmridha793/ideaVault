"use client";

import { authClient } from "@/lib/auth-client";
import { syncAuthAfterLogin } from "@/lib/api";
import { Card } from "@heroui/react";
import { Button, Form, Input, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signIn.email({ email, password });

    if (error) {
      toast.error(error.message || "Login failed. Check your credentials.");
      return;
    }
    if (data) {
      await syncAuthAfterLogin(authClient);
      toast.success("Welcome back to IdeaVault!");
      router.push(redirectPath);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });
    if (error) {
      toast.error(error.message || "Google sign-in failed. Check OAuth settings.");
    }
  };

  return (
    <div className="container mx-auto max-w-md md:mb-20 my-10 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg bg-white dark:bg-slate-900">
      <PageTitle title="Login" />
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold">Welcome Back</h1>
        <p className="text-gray-500 mt-2">Sign in to share and validate startup ideas</p>
      </div>
      <Card className="p-4">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type={isShowPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => setIsShowPassword(!isShowPassword)}
            className="text-sm text-indigo-600 flex items-center gap-1"
          >
            {isShowPassword ? (
              <>
                Hide Password <FaEye />
              </>
            ) : (
              <>
                Show Password <FaEyeSlash />
              </>
            )}
          </button>
          <Link href="#" className="text-sm text-indigo-600 hover:underline">
            Forgot Password?
          </Link>
          <Button type="submit" className="w-full bg-indigo-600 text-white">
            Login
          </Button>
          <p className="text-center text-sm">
            New here?{" "}
            <Link href="/register" className="text-indigo-600 font-semibold">
              Create an account
            </Link>
          </p>
          <Button type="button" variant="outline" className="w-full" onPress={handleGoogleSignIn}>
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
}
