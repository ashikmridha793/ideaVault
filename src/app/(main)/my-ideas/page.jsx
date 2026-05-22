"use client";

import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import EditIdeaModal from "@/components/EditIdeaModal";
import LoadingSpiner from "@/components/LoadingSpiner";
import MyIdeaCard from "@/components/MyIdeacard";
import PageTitle from "@/components/PageTitle";
import { apiFetch, syncJwtFromSession } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MyIdeaPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState([]);
  const [editIdea, setEditIdea] = useState(null);
  const [deleteIdea, setDeleteIdea] = useState(null);

  const loadIdeas = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await syncJwtFromSession(user);
      const res = await apiFetch("/my-ideas");
      const data = await res.json();
      setIdeas(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load your ideas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, [user?.email]);

  const handleSave = async (id, updates) => {
    try {
      const res = await apiFetch(`/idea/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error();
      toast.success("Idea updated");
      setEditIdea(null);
      loadIdeas();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteIdea) return;
    try {
      const res = await apiFetch(`/idea/${deleteIdea._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Idea deleted");
      setDeleteIdea(null);
      loadIdeas();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto py-8">
      <PageTitle title="My Ideas" />
      <h1 className="text-3xl font-bold mb-6">My Ideas</h1>

      {loading ? (
        <LoadingSpiner />
      ) : ideas.length === 0 ? (
        <p className="text-xl text-gray-500">You have not posted any ideas yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <MyIdeaCard
              key={idea._id}
              idea={idea}
              onEdit={() => setEditIdea(idea)}
              onDelete={() => setDeleteIdea(idea)}
            />
          ))}
        </div>
      )}

      <EditIdeaModal
        idea={editIdea}
        isOpen={!!editIdea}
        onClose={() => setEditIdea(null)}
        onSave={handleSave}
      />
      <DeleteConfirmModal
        isOpen={!!deleteIdea}
        title={deleteIdea?.title}
        onClose={() => setDeleteIdea(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
