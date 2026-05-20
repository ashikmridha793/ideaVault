
import IdeaCard from '@/components/IdeaCard';

const AllIdeaPage = async () => {
    const res = await fetch('http://localhost:8000/ideas')
    const data = await res.json()
    console.log(data)
    

    return (


        <div className='min-h-screen'>
            <main className='w-full md:w-10/12 mx-auto py-10 px-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {
                        data.map(idea => (
                            <IdeaCard key={idea._id} idea={idea} />
                        ))
                    }
                </div>
            </main>
        </div>
    );
};

export default AllIdeaPage;