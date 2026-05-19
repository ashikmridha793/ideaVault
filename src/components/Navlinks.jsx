import Link from 'next/link';
import React from 'react';

const Navlinks = ({ href, children }) => {
    const pathname = usePathname();
    const isActive = href === pathname;

    return (
        <Link href={href} className={isActive ? 'text-blue-300' : 'hover:text-blue-300'}>
            {children}
        </Link>
    );
};

export default Navlinks;