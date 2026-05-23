"use client";

import { authClient } from "@/lib/auth-client";
import { syncAuthAfterLogin } from "@/lib/api";
import { validatePassword } from "@/lib/password";
import { Card, Form } from "@heroui/react";
import { Button, Input, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";

function RegisterForm() {
  const myRef = useRef(null)

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || undefined
    });

    if (error) {
      const msg = error.message || "";
      if (msg.toLowerCase().includes("database") || msg.includes("503")) {
        toast.error("somthing woants wrong");
      } else {
        toast.error(msg || "Registration failed.");
      }
      return;
    }
    if (data) {
      await syncAuthAfterLogin(authClient);
      toast.success("Account created successfully!");
      router.push(redirectPath);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });
    if (error) {
      toast.error(error.message || "Google sign-in failed");
    }
  };

  return (
    <div className="container mx-auto max-w-md md:mb-20 my-10 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg bg-white dark:bg-slate-900">
      <PageTitle title="Register" />
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold">Create Account</h1>
        <p className="text-gray-500 mt-2">Join IdeaVault and start sharing ideas</p>
      </div>
      <Card className="p-4">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField name="name" isRequired>
            <label>Name</label>
            <Input placeholder="Your full name" />
          </TextField>
          <TextField name="email" isRequired>
            <label>Email</label>
            <Input type="email" placeholder="you@example.com" />
          </TextField>
          <TextField name="image">
            <label>Photo URL</label>
            <Input type="url" placeholder="https://example.com/photo.jpg" />
          </TextField>
          <TextField name="password" isRequired>
            <label>Password</label>
            <Input
              type={isShowPassword ? "text" : "password"}
              placeholder="Min 6 chars, upper & lower case"
            />
          </TextField>
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
          <Button type="submit" className="w-full bg-indigo-600 text-white">
            Register
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>
          <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading...</p>}>
      <RegisterForm />
    </Suspense>
  );
}
