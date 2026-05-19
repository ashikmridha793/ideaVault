import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='py-3 border mb-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='text-xl font-bold'>My App</div>
                <ul className='flex space-x-4'>
                    <li><Link href='/' className='hover:text-blue-300'>Home</Link></li>
                    <li><Link href='/about' className='hover:text-blue-300'>About</Link></li>
                    <li><Link href='/contact' className='hover:text-blue-300'>Contact</Link></li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;