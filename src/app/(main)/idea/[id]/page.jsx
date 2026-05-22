import Comment from "@/components/comment";
import PageTitle from "@/components/PageTitle";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaLeftLong } from "react-icons/fa6";

export default async function IdeaDetailsPage({ params }) {
  const { id } = await params;

  let idea;
  try {
    const res = await fetch(`${API_URL}/idea/${id}`, { cache: "no-store" });
    if (!res.ok) notFound();
    idea = await res.json();
  } catch {
    notFound();
  }

  if (!idea?._id) notFound();

  const {
    title,
    targetAudience,
    estimatedBudget,
    category,
    imgUrl,
    tags,
    description,
    sortDescription,
    problemStatement,
    proposedSolution,
    authorName,
  } = idea;

  const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];

  return (
    <div className="w-11/12 mx-auto py-8">
      <PageTitle title={title} />
      <Link
        href="/ideas"
        className="text-lg font-semibold flex items-center gap-2 mb-6 text-indigo-600 hover:underline"
      >
        <FaLeftLong /> Back to All Ideas
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm">
        <div className="relative w-full lg:w-1/2 h-72 lg:h-96">
          <Image
            src={imgUrl || "/assets/banner-1.webp"}
            alt={title}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{title}</h1>
          {authorName && (
            <p className="text-sm text-gray-500 mb-4">By {authorName}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
            <p>
              <span className="font-semibold">Category: </span>
              {category}
            </p>
            <p>
              <span className="font-semibold">Budget: </span>${estimatedBudget || "N/A"}
            </p>
            <p className="sm:col-span-2">
              <span className="font-semibold">Audience: </span>
              {targetAudience}
            </p>
          </div>
          {sortDescription && (
            <p className="mt-4 text-gray-600">{sortDescription}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {tagsArray.map((tag, i) => (
              <span
                key={i}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <section className="p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
          <p className="text-gray-600 dark:text-gray-300">{problemStatement}</p>
        </section>
        <section className="p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Proposed Solution</h2>
          <p className="text-gray-600 dark:text-gray-300">{proposedSolution}</p>
        </section>
        <section className="p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </section>
      </div>

      <Comment />
    </div>
  );
}
