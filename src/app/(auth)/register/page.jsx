"use client"
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { toast, ToastContainer } from "react-toastify";


const RegisterPage = () => {

     const [isShowPassword, setIsShowPassword] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()

        const form = e.currentTarget

        const formData = new FormData(form)
        const user = Object.fromEntries(formData.entries())
        console.log(user)

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image,
        });
        if (error) {
            console.log(error)
            toast.error(error.message || 'Somthing wants wrong')
        }else {
            console.log(data)
            toast.success('Register sucessfull')
            redirect('/')
        }

    }
    const handleGoogleSignIn = async () => {
            const data = await authClient.signIn.social({
                provider: "google",
            });
            console.log(data)
        };

    return (
        <div className="conetiner mx-auto md:mb-20 m-10 space-y-2 border p-2 border-gray-200 shadow-md">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-bold">Creat an account</h1>
            </div>
            <Card>
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        name="name"
                        type="text"

                    >
                        <Label>Name</Label>
                        <Input placeholder="Enter Your name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        name="image"
                        type="url"

                    >
                        <Label>Photo Url</Label>
                        <Input placeholder="pleas enter your img url" />
                        <FieldError />
                    </TextField>
                    <TextField
                        minLength={8}
                        name="password"
                        type={isShowPassword ? "text" : "password"}
                    >
                        <Label>Password</Label>
                        <Input 
                        placeholder="Enter your password" />
                        <FieldError />
                        <span onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ?
                                <p className="flex items-center gap-1 text-sm">Hide Password <FaEye /></p> :
                                <p className="flex items-center gap-1 text-sm">Show Password <FaEyeSlash /></p>}
                        </span>
                    </TextField>
                    <div className="flex gap-2">
                        <Button type="submit" className='w-full bg-slate-500 text-white'>
                            <Check />
                            Confarm
                        </Button>
                    </div>
                    <div className="w-full bg-slate-200 my-3"></div>
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

export default RegisterPage;