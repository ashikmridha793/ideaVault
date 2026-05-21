"use client"
import { authClient } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import { Button, FieldError, Form, Input, Label, } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";


const LoginPage = () => {
    const router = useRouter()
    const serchParams = useSearchParams()

    const redirectPath = serchParams.get("redirect") || "/"

    const [isShowPassword, setIsShowPassword] = useState(false)

    const onSubmit = async (e) => {

        e.preventDefault()
        const form = e.currentTarget

        const formData = new FormData(form)
        const user = Object.fromEntries(formData.entries())
        console.log(user)

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (error) {
            toast.error(error.message || 'Somthing wants wrong')

        }
        if (data) {
            console.log(data)
            toast.success('Login successfull')
            setTimeout(() => {
                router.push(redirectPath)
            }, 1000)
        }

    }


    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: redirectPath,
        });
        console.log(data)
    };

    return (
        <div className="conetiner mx-auto md:mb-20 m-10 space-y-2 border p-2 border-gray-200 shadow-md">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-bold">Wellcome</h1>
            </div>
            <Card>
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                    <Label>Email</Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com" />
                    <FieldError />
                    <Label>Password</Label>
                    <Input
                        name="password"
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Enter your password" />
                    <FieldError />
                    <span onClick={() => setIsShowPassword(!isShowPassword)}>
                        {isShowPassword ?
                            <p className="flex items-center gap-1 text-sm">Hide Password <FaEye /></p> :
                            <p className="flex items-center gap-1 text-sm">Show Password <FaEyeSlash /></p>}
                    </span>

                    <div className="flex gap-2">
                        <Button type="submit" className='w-full bg-slate-500 text-white'>
                            login
                        </Button>
                    </div>

                    <p>You dont have an account go <Link href='/register' className="text-blue-600">register</Link> </p>

                    <div>
                        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                            <FcGoogle /> Continue with google
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;