"use client";
import { authClient } from '@/lib/auth-client';
import { Avatar, Button, Spinner, } from '@heroui/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { theme, setTheme } = useTheme()

    const {
        data: session,
        isPending,
        error,
        refetch
    } = authClient.useSession()

    const user = session?.user
    console.log(user)

    return (
        <nav className='py-3 border mb-4'>
            <div className='w-11/12 mx-auto flex justify-between items-center'>

                <Link
                    href='/'
                    className='md:text-3xl text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text tracking-tighter'>
                    IdeaVault
                </Link>

                <ul className='flex md:gap-10 items-center'>
                    <li className='hidden sm:flex gap-4 items-center'>
                        <li>
                            <Link href='/' className='hover:text-blue-300'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href='/ideas' className='hover:text-blue-300'>
                                Ideas
                            </Link>
                        </li>

                        <li>
                            <Link href='/my-ideas' className='hover:text-blue-300'>
                                My Ideas
                            </Link>
                        </li>
                        <li>
                            <Link href='/add-idea' className='hover:text-blue-300'>
                                Add Idea
                            </Link>
                        </li>
                        <li>
                            <Link href='/my-profile' className='hover:text-blue-300'>
                                My Profile
                            </Link>
                        </li>
                    </li>
                    <li>
                        <div className='flex items-center space-x-4'>
                            <Button
                                variant='outline'
                                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                className="text-xl cursor-pointer"
                            >
                                {theme === "light"
                                    ? <IoMoonOutline />
                                    : <IoSunnyOutline />
                                }
                            </Button>
                            {isPending ? (<div className="flex items-center gap-4">
                                <Spinner />
                            </div>) : user ? <>
                                <li className='flex justify-center items-center gap-2'>
                                    <Avatar>
                                        <Avatar.Image alt="John Doe" src={user?.image} />
                                        <Avatar.Fallback>
                                            {user?.name.charAt(0)}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    {user?.name}
                                </li>
                                <Button variant='outline' className="hidden md:block">
                                    <Link href="/login"
                                        className='font-semibold hover:text-blue-700'
                                        onClick={async () => await authClient.signOut()}
                                    >
                                        LogOut
                                    </Link>
                                </Button>
                            </> : <>
                                <Link
                                    className='font-semibold hover:text-blue-700'
                                    href='/login'>
                                    Login
                                </Link>
                                <Link
                                    className='font-semibold hover:text-blue-700'
                                    href='/register'>
                                    Register
                                </Link>
                            </>}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;