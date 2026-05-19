'use client';
import { Button } from '@heroui/react';
import React, { useEffect, useState } from 'react';

const vaultSlide = [
    {
        "title": "AI Study Vault",
        "description": "An AI-based platform where students can save notes, PDFs, voice lectures, and important resources with smart search and summary features.",
        "image": "/assets/banner-1.webp"
    },
    {
        "title": "Startup Idea Vault",
        "description": "A platform for entrepreneurs to store, categorize, validate, and collaborate on business ideas with their team.",
        "image": "/assets/banner-2.webp"
    },
    {
        "title": "Creative Design Vault",
        "description": "A smart vault system for designers and content creators to save inspirations, templates, color palettes, and project references.",
        "image": "/assets/banner-3.webp"
    },
    {
        "title": "Personal Memory Vault",
        "description": "A secure digital vault where users can archive personal photos, videos, voice memories, and important life moments safely.",
        "image": "/assets/banner-4.webp"
    }
];
const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % vaultSlide.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className='w-full mt-10 flex justify-center'>
            <div className='w-11/12 rounded overflow-hidden h-[60vh] md:h-[80vh]  relative'>

                <div className='flex h-full transition-transform duration-700 ease-in-out'
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`
                    }}>
                    {
                        vaultSlide.map((vault, index) => (
                            <div
                                key={index}
                                className="w-full flex-shrink-0 bg-cover bg-center rounded-lg"
                                style={{ backgroundImage: `url(${vault.image})` }}>

                                <div className="text-white md:pl-20 p-5 h-full flex flex-col justify-center">
                                    <h3 className="text-4xl font-bold mb-2">
                                        {vault.title}</h3>
                                    <p className="">
                                        {vault.description}
                                    </p>
                                    <Button variant="primary" className="mt-4">Learn More</Button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;