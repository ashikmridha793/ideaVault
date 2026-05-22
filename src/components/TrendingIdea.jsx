"use client";

import IdeaCard from "@/components/IdeaCard";
import LoadingSpiner from "@/components/LoadingSpiner";
import { API_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";

const TrendingIdea = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API_URL}/ideas/trending?limit=6`);
        const data = await res.json();
        setIdeas(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <section className="md:w-11/12 mx-auto shadow-md p-5 my-10 rounded-2xl border border-slate-100 dark:border-slate-800">
      <div className="text-center mb-8">
        <h2 className="font-bold text-2xl md:text-5xl flex justify-center items-center gap-4">
          <FaRegLightbulb className="text-yellow-400" />
          Trending Ideas
        </h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mt-3">
          Six of the most discussed startup concepts on IdeaVault right now
        </p>
      </div>

      {loading ? (
        <LoadingSpiner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingIdea;
