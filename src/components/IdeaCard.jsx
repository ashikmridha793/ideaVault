import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const IdeaCard = ({ idea }) => {
  const { title, targetAudience, estimatedBudget, category, imgUrl, _id, sortDescription } = idea;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col h-full bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition duration-300">
      <div className="relative w-full h-48 mb-4">
        <Image
          className="rounded-lg object-cover"
          alt={title}
          src={imgUrl || "/assets/banner-1.webp"}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h2 className="text-xl font-bold line-clamp-1">{title}</h2>
        <p className="text-sm text-indigo-600 font-medium mt-1">{category}</p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {sortDescription || `For ${targetAudience}`}
        </p>
        <p className="text-sm font-semibold mt-2">
          Budget: ${estimatedBudget || "N/A"}</p>
        <p className="text-xs text-gray-400 mt-1">
          Audience: {targetAudience}</p>
        <Button size="sm" className="mt-2 py-4 w-full bg-indigo-600 text-white">
          <Link
            className="flex w-full justify-center items-center gap-2 py-1"
            href={`/idea/${_id}`}
          >
            View Details <FaArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default IdeaCard;
