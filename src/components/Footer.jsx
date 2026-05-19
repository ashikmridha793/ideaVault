import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-slate-800 text-slate-300 border-t border-slate-700 pt-12 pb-6 mt-10'>
            <div className='w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>

                    <div>
                        <Link
                            href='/'
                            className='md:text-3xl text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text tracking-tighter'>
                            IdeaVault
                        </Link>
                        <p className='text-sm text-slate-400 leading-relaxed'>
                            IdeaVault is a platform for sharing and discovering innovative ideas. Join our community to explore, share, and collaborate on exciting projects.
                        </p>
                    </div>

                    <div>
                        <h3 className='text-sm font-semibold text-white uppercase tracking-wider mb-4'>Platform</h3>
                        <ul className='space-y-2 text-sm'>
                            <li>
                                <Link
                                    href='/ideas'
                                    className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>
                                    Explore Ideas
                                </Link>
                            </li>
                            <li>
                                <Link href='/categories' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href='/concepts' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>
                                    Trending Concepts
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-sm font-semibold text-white uppercase tracking-wider mb-4'>
                            Contact Us
                        </h3>
                        <ul className='space-y-2 text-sm text-slate-400'>
                            <li>Email: ashikmridha@gmail.com</li>
                            <li>Phone: 019*******49</li>
                            <li>Location: Dhaka, Bangladesh</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-sm font-semibold text-white uppercase tracking-wider mb-4'>
                            Follow Us
                        </h3>
                        <div>
                            <Link href='/twitter' className='flex items-center gap-2 p-2 rounded-full'>
                                <FaTwitter /> Twitter
                            </Link>
                            <Link href='/linkedin' className='flex items-center gap-2 p-2 rounded-full'>
                                <FaLinkedin />Linkedin
                            </Link>
                            <Link href='/github' className='flex items-center gap-2 p-2 rounded-full'>
                                <FaGithub /> GitHub
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='border-t border-slate-700 my-6'></div>


                <div className='flex flex-col sm:flex-row justify-between items-center text-slate-500 space-y-4 sm:space-y-0'>
                    <p className='text-sm'>&copy; {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
                    <div>
                        <Link href='/privacy' className='hover:text-slate-300 transition-colors'>
                            Privacy Policy
                        </Link>
                        <Link href='/terms' className='hover:text-slate-300 transition-colors'>
                            Terms of Service
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;