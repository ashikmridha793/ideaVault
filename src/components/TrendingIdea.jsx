"use client"
import IdeaCard from '@/components/IdeaCard';
import { useEffect, useState } from 'react';
import { FaRegLightbulb } from 'react-icons/fa';

const TrendingIdeas = () => {
    const [ideas, setIdeas] = useState([])
    const [filteredIdeas, setFilterdIdeas] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const res = await fetch('http://localhost:8000/ideas')
            const data = await res.json()
            setIdeas(data)
            setFilterdIdeas(data)
        }
        loadData()
    }, [])

    return (
        <div className='md:w-11/12 mx-auto  shadow-md p-5'>

            <div className='shadow-md p-5 my-2'>
                <h2 className='text-center font-bold text-2xl md:text-5xl flex justify-center items-center gap-4'>
                    <FaRegLightbulb className='text-yellow-400 drop-shadow-md '/>
                    Trending ideas is here
                </h2>
                <p className='text-center text-gray-500 max-w-2xl mx-auto mt-3'>
                    Explore the most creative and innovatiove staartup ideas creaded to inspire<br />  your next big Project
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {

                    filteredIdeas.slice(0, 6).map(idea => (
                        <IdeaCard key={idea._id} idea={idea} />
                    ))
                }
            </div>

        </div>
    );
};

export default TrendingIdeas;