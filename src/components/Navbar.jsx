"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMoonOutline } from 'react-icons/io5';

const Navbar = () => {
    const [open, setOpen] = useState(false);
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
                            <Link href='/' className='hover:text-blue-300'>Home
                            </Link>
                        </li>
                        <li>
                            <Link href='/ideas' className='hover:text-blue-300'>Ideas
                            </Link>
                        </li>

                        <li>
                            <Link href='/my-ideas' className='hover:text-blue-300'>My Ideas
                            </Link>
                        </li>
                        <li>
                            <Link href='/add-idea' className='hover:text-blue-300'>Add Idea
                            </Link>
                        </li>
                    </li>
                    <li>
                        <div className='flex items-center space-x-4'>
                            <span>
                                <IoMoonOutline />
                            </span>
                            <Link
                                className='font-semibold hover:text-blue-700'
                                href='/login'>Login
                            </Link>
                            <Link
                                className='font-semibold hover:text-blue-700'
                                href='/register'>Register
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;