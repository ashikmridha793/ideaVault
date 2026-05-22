"use client";

import IdeaCard from "@/components/IdeaCard";
import LoadingSpiner from "@/components/LoadingSpiner";
import PageTitle from "@/components/PageTitle";
import SearchBox from "@/components/SearchBox";
import { API_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AllIdeaPage() {
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIdeas = async (search = "", category = "All", startDate = "", endDate = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category && category !== "All") params.set("category", category);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      const res = await fetch(`${API_URL}/ideas?${params.toString()}`);
      const data = await res.json();
      setFilteredIdeas(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load ideas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  return (
    <div className="min-h-screen w-11/12 mx-auto py-8">
      <PageTitle title="Explore Ideas" />
      <h1 className="text-3xl md:text-4xl font-bold mb-2">All Startup Ideas</h1>
      <p className="text-gray-500 mb-6">Search and filter ideas from innovators worldwide</p>

      <SearchBox onFilter={loadIdeas} />

      {loading ? (
        <LoadingSpiner />
      ) : filteredIdeas.length === 0 ? (
        <p className="text-xl font-semibold text-center py-16 text-gray-500">No ideas found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            filteredIdeas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))
          }
        </div>
      )}
    </div>
  );
}
