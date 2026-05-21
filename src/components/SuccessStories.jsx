import React from 'react';
import { FaRocket } from 'react-icons/fa';

const SuccessStories = () => {
    return (
        <section className='md:w-11/12 mx-auto py-9 md:py-16'>
            <div className='shadow-md p-5 mb-5'>
                <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold text-green-600 flex justify-center items-center gap-2 md:gap-3 '>
                    <FaRocket className='text-indigo-500' />
                    Sucess Stories
                </h1>
                <p className='text-sm sm:text-base text-gray-600 mt-3 md:mt-4 max-w-2xl mx-auto px-2 leading-relaxed '>
                    Discover inspiring journeys of entrepreneurs who transformed innovative ideas into successfull businesses.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  md:gap-8 '>

                <div className='bg-white shadow-md p-5 rounded-xl md:p-6 hocer:shadow-xl transition duration-400'>
                    <h1 className='text-xl md:text-2xl font-bold mb-3 text-purple-700'>
                        EcoCart
                    </h1>
                    <p className='text-sm md:text-base text-gray-600 mb-5 leading-relaxed'>
                        Started as a small sustainbility idea and now serves  thusands of aco-consious coustomers worldwide.
                    </p>
                    <span className='text-sm font-semibold text-green-600 flex items-center gap-2'>
                        <FaRocket className='text-indigo-600' />
                        Grew 300% in 1 Year
                    </span>
                </div>
                <div className='bg-white  border border-gray-200 shadow-md p-5 rounded-xl md:p-6 hocer:shadow-xl transition duration-400'>
                    <h1 className='text-xl md:text-2xl font-bold mb-3 text-purple-700'>
                        MediConnect
                    </h1>
                    <p className='text-sm md:text-base text-gray-600 mb-5 leading-relaxed'>
                        Revolutionized online healthcare consultations with smart medical support solutions.
                    </p>
                    <span className='text-sm font-semibold text-green-600 flex items-center gap-2'>
                        <FaRocket className='text-indigo-600' />
                        50K+ active users
                    </span>
                </div>
                <div className='bg-white  border border-gray-200 shadow-md p-5 rounded-xl md:p-6 hocer:shadow-xl transition duration-400'>
                    <h1 className='text-xl md:text-2xl font-bold mb-3 text-purple-700'>
                        LearnSphere
                    </h1>
                    <p className='text-sm md:text-base text-gray-600 mb-5 leading-relaxed'>
                        Empowered students worldwide with affordable and interactive online learning experiences.
                    </p>
                    <span className='text-sm font-semibold text-green-600 flex items-center gap-2'>
                        <FaRocket className='text-indigo-600' />
                        Trusted my 100k students
                    </span>
                </div>

            </div>

        </section>
    );
};

export default SuccessStories;