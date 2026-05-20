import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const IdeaCard = ({ idea }) => {
    const { title, targetAudience, estimatedBudget, category, imgUrl, _id } = idea
    return (
        <div className='border border-gray-300 rounded-lg p-4 flex flex-col gap-4'>

            <Image className='rounded-lg w-full h-[32vh]'
                alt={idea.title}
                src={idea.imgUrl}
                width={400}
                height={300}
            />
            <div className='mt-3'>
                <h2 className='text-xl font-bold'>{idea.title}</h2>
                <p className='text-sm text-gray-500'>{idea.category}</p>
                <h1 className='text-lg font-semibold'>Estimated Budget: ${idea.estimatedBudget}</h1>
                <p className='text-sm text-gray-500'>Target Audience: {idea.targetAudience}</p>
                <Button variant="solid" size="sm"
                    className='mt-3 w-full bg-slate-500 text-white flex justify-center items-center'
                >
                    <Link className='block w-full flex justify-center items-center gap-2' href={`/ideas/${_id}`}>
                        View Details<FaArrowRight />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default IdeaCard;