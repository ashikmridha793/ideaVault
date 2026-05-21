"use client"
import IdeaCard from '@/components/IdeaCard';
import SearchBox from '@/components/SearchBox';
import { useEffect, useState } from 'react';

const AllIdeaPage = () => {
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

    const handleFilter = (search, category) => {
        let result = [...ideas]
        if (search) {
            result = result.filter(idea => idea.title.toLowerCase().includes(
                search.toLowerCase()
            ))
        }
        if (category && category !== 'All') {
            result = result.filter(idea => idea.category === category)
        }
        setFilterdIdeas(result)
    }


    return (
        <div className='min-h-screen md:w-10/12 mx-auto'>
            <SearchBox onFilter={handleFilter} />
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {
                        filteredIdeas.length === 0 ? (<h1 className='text-2xl font-bold'>No Idea founded</h1>

                        ) : (
                       filteredIdeas.map(idea => (
                            <IdeaCard key={idea._id} idea={idea} />
                        ))
                        )
                    }
                </div>
            
        </div>
    );
};

export default AllIdeaPage;