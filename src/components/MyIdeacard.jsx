import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MyIdeaCard = ({ idea, onEdit, onDelete }) => {
  const { title, targetAudience, estimatedBudget, category, imgUrl, _id } = idea;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col h-full bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition">
      <div className="relative w-full h-48 mb-3">
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
        <p className="text-sm text-indigo-600 font-medium">{category}</p>
        <p className="text-sm text-gray-500 mt-1">
          Budget: ${estimatedBudget || "N/A"}
        </p>
        <p className="text-sm text-gray-500 line-clamp-1">Audience: {targetAudience}</p>

        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" onPress={onEdit}>
            <FaEdit /> Edit
          </Button>
          <Button size="sm" variant="danger" onPress={onDelete}>
            <MdDelete /> Delete
          </Button>
        </div>

        <Button size="sm" className="mt-3 w-full bg-indigo-600 text-white">
          <Link
            className="flex w-full justify-center items-center gap-2"
            href={`/idea/${_id}`}
          >
            View Details <FaArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MyIdeaCard;
