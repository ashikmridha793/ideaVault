"use client";

import LoadingSpiner from "@/components/LoadingSpiner";
import PageTitle from "@/components/PageTitle";
import { apiFetch, syncJwtFromSession } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function MyInteractionsPage() {
  const myRef = useRef(null)

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        await syncJwtFromSession(user);
        const res = await apiFetch("/my-interactions");
        const data = await res.json();
        setInteractions(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load interactions");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.email]);

  return (
    <div className="w-11/12 mx-auto py-8 min-h-screen">
      <PageTitle title="My Interactions" />
      <h1 className="text-3xl font-bold mb-2">My Interactions</h1>
      <p className="text-gray-500 mb-8">Ideas you have commented on</p>

      {loading ? (
        <LoadingSpiner />
      ) : interactions.length === 0 ? (
        <p className="text-gray-500">You have not commented on any ideas yet.</p>
      ) : (
        <div className="grid gap-4">
          {interactions.map((item) => (
            <div
              key={String(item.commentId)}
              className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm"
            >
              {item.idea?.imgUrl && (
                <div className="relative w-full md:w-40 h-32 shrink-0">
                  <Image
                    src={item.idea.imgUrl}
                    alt={item.idea.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {item.idea ? (
                    <Link href={`/idea/${item.ideaId}`} className="text-indigo-600 hover:underline">
                      {item.idea.title}
                    </Link>
                  ) : (
                    "Idea unavailable"
                  )}
                </h2>
                <p className="text-gray-600 mt-2">{item.text}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
