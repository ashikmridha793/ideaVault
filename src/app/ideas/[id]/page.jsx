import { Button, TextArea } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaComment } from 'react-icons/fa';
import { FaLeftLong } from 'react-icons/fa6';


const IdeaDetailsPage = async ({ params }) => {
    const { id } = await params

    const res = await fetch(`http://localhost:8000/idea/${id}`)
    const idea = await res.json()
    const {
        title,
        targetAudience,
        estimatedBudget,
        category,
        imgUrl,
        tags,
        description,
        problemStatement,
        proposedSolution
    } = idea

    const comments = []


    const tagsArray = tags
        ? tags.split(",").map((tag) => tag.trim())
        : []

    console.log(idea)
    return (
        <div className='container mx-auto p-5 m-5 border border-gray-200 shadow-sm'>
            <div className='mb-3 '>
                <Link href="/ideas" className='text-lg font-semibold flex items-center gap-2 shadow-sm'>
                    <FaLeftLong/> Back to All Ideas
                </Link>
            </div>



            <div className="flex flex-col md:flex-row md:gap-10 ">
                <div>
                    <Image
                        src={imgUrl}
                        alt={title}
                        width={700}
                        height={600}
                    />
                </div>
                <div className=''>
                    <h1 className='text-3xl md:text-5xl font-bold mb-3'>{title}</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 border bordr-gray-50 p-2 shadow-sm'>
                        <p>
                            <span className='font-semibold'>Category: </span>{category}
                        </p>
                        <p>
                            <span className='font-semibold'>Budget: </span>{estimatedBudget}
                        </p>
                        <p>
                            <span className='font-semibold'>Audience: </span>{targetAudience}
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-2 border bordr-gray-50 p-2 shadow-sm my-2'>
                        {tagsArray?.map((tag, i) => (
                            <span
                                key={i}
                                className='bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs'>
                                #{tags}
                            </span>
                        ))}
                    </div>
                    <div className='mt-5 border bordr-gray-50 p-2 shadow-sm my-2'>
                        <h2 className='text-xl font-semibold'>Prolem Statement</h2>
                        <p className='text-gray-600'>{problemStatement}</p>
                    </div>

                    <div className='mt-5 border bordr-gray-50 p-2 shadow-sm my-2'>
                        <h2 className='text-xl font-semibold'>Prolem Solution</h2>
                        <p className='text-gray-600'>{proposedSolution}</p>
                    </div>
                </div>
            </div>

            <div className='my-5 border bordr-gray-50 p-2 shadow-sm my-2'>
                <h1 className='text-xl font-semibold'>Description</h1>
                <p className='text-gray-700'>{description}</p>
            </div>

            <div className='mb-6'>
                <h2 className='font-semibold text-xl px-2 flex items-center gap-2'><FaComment /> Comment</h2>
                <TextArea
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
                    placeholder='Write your comment.....'
                    rows={6} />
            </div>

            <div className='space-y-4'>
                {
                    comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className='border rounded-lg p-4 shadow-sm'>
                                <div className='flex fustify-between items-center'>
                                    <p className='font-semibold'>{comment.username}</p>
                                    <p className='text-xs text-gray-400'>
                                        {new Date(comment.creaatedAt).toLocaleString()}
                                    </p>
                                </div>
                                <p className='text-gray-700 mt-2'>{comment.text}</p>
                                <div className='flex gap-3 mt-3 text-sm'>
                                    <Button variant='outlate' className="text-white bg-slate-200">Edit</Button>
                                    <Button variant='danger' className="text-red-500">Delate</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-500'>No comments yet.</p>
                    )
                }
            </div>

        </div>
    );
};

export default IdeaDetailsPage;