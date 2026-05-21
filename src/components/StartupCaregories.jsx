import React from 'react';
import { FaGraduationCap, FaHeartbeat, FaLaptopCode, FaLeaf, FaRobot, FaShoppingCart } from 'react-icons/fa';

const StartupCaregories = () => {
    return (
        <section className='w-11/12 mx-auto py-10 sm:py-12 md:py-16'>
            <div className='text-centetr mb-10 md:mb-14'>
                <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold flex justify-center flex-wrap items-center gap-2 md:gap-2 text-indigo-600'>
                    <FaRobot className='text-pink-500 text-xl sm:text-2xl md:text-4xl' />
                    Startup Categories
                </h2>
                <p className='text-sm sm:text-base text-gray-500 mt-3 md:mt-4 max-w-2xl mx-auto leading-relaxed px-2'>
                    Explore trending startup categories and discover innovative opportunities  <br />across multiple industries.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:-gap-7'>

                <div className='bg-white rounded-2xl shadow-md p-5 sm:p-9 hover:shadow-xl transition duration-400 '>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5'>
                        <FaLaptopCode className="text-xl sm:text-2xl text-indigo-500" />
                    </div>
                    <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-indigo-500'>Technology</h2>

                    <p className='text-sm sm:text-base text-gray-500 leading-relaxed'>
                        Innovative software, AI, SaaS, and web platforms shaping <br /> the future of technology.
                    </p>
                </div>
                
                <div className='bg-white rounded-2xl shadow-md p-5 sm:p-9 hover:shadow-xl transition duration-400 '>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5'>
                        <FaHeartbeat className="text-xl sm:text-2xl text-red-600" />
                    </div>
                    <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-red-600'>
                        Healthcare
                    </h2>

                    <p className='text-sm sm:text-base text-gray-500 leading-relaxed'>
                        Digital healthcare, telemedicine, wellness, and smart medical support solutions.
                    </p>
                </div>
                
                <div className='bg-white rounded-2xl shadow-md p-5 sm:p-9 hover:shadow-xl transition duration-400 '>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5'>
                        <FaShoppingCart className="text-xl sm:text-2xl text-yellow-500" />
                    </div>
                    <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-yellow-500'>E-Comerce</h2>

                    <p className='text-sm sm:text-base text-gray-500 leading-relaxed'>
                        Online shopping platforms, delivery services, and digital marketplaces.
                    </p>
                </div>

                <div className='bg-white rounded-2xl shadow-md p-5 sm:p-9 hover:shadow-xl transition duration-400 '>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5'>
                        <FaGraduationCap className="text-xl sm:text-2xl text-blue-600" />
                    </div>
                    <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-blue-600'>
                        Education
                    </h2>

                    <p className='text-sm sm:text-base text-gray-500 leading-relaxed'>
                         E-learning platforms, online courses, and student-focused smart solutions.
                    </p>
                </div>

                <div className='bg-white rounded-2xl shadow-md p-5 sm:p-9 hover:shadow-xl transition duration-400 '>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5'>
                        <FaLeaf className="text-xl sm:text-2xl text-green-500" />
                    </div>
                    <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-green-500'>Green Energy</h2>

                    <p className='text-sm sm:text-base text-gray-500 leading-relaxed'>
                        Sustainable ideas, renewable energy, and eco-friendly startup innovations.
                    </p>
                </div>

                <div className='bg-white rounded-2xl shadow-md p-5 sm:p-9 hover:shadow-xl transition duration-400 '>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5'>
                        <FaRobot className="text-xl sm:text-2xl text-pink-500" />
                    </div>
                    <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-pink-500'>Ai Artificial Intelligence</h2>

                    <p className='text-sm sm:text-base text-gray-500 leading-relaxed'>
                        AI-powered tools, automation systems, and next-generation smart applications.
                    </p>
                </div>


            </div>

        </section>
    );
};

export default StartupCaregories;