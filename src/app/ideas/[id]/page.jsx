import Image from 'next/image';
import React from 'react';

const IdeaDetailsPage = async ({ params }) => {
    const { id } = await params

    const res = await fetch(`http://localhost:8000/idea/${id}`)
    const idea = await res.json()
    const { title, targetAudience, estimatedBudget, category, imgUrl, tags, description, problemStatement, proposedSolution  } = idea

    console.log(idea)
    return (
        <div>
            <Image 
            src={imgUrl}
            alt={title}
            width={600}
            height={500}
            />
        </div>
    );
};

export default IdeaDetailsPage;