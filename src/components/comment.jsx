"use client";

import { authClient } from "@/lib/auth-client";
import { apiFetch, syncJwtFromSession } from "@/lib/api";
import { Button, TextArea } from "@heroui/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaComment } from "react-icons/fa6";
import { toast } from "react-toastify";

const Comment = () => {
  const { id: ideaId } = useParams();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/comments/${ideaId}`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [ideaId]);

  useEffect(() => {
    if (ideaId)
      loadComments();
  }, [ideaId, loadComments]);

  const ensureToken = async () => {
    if (!user) {
      toast.error("Please log in to comment");
      return false;
    }
    await syncJwtFromSession(user);
    return true;
  };

  const handlePost = async () => {
    if (!text.trim()) {
      toast.error("Write a comment first");
      return;
    }
    if (!(await ensureToken())) return;

    try {
      const res = await apiFetch("/comment", {
        method: "POST",
        body: JSON.stringify({ ideaId, text: text.trim() }),
      });
      if (!res.ok) throw new Error();
      toast.success("Comment posted");
      setText("");
      loadComments();
    } catch {
      toast.error("Failed to post comment");
    }
  };

  const handleUpdate = async (commentId) => {
    if (!editText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    if (!(await ensureToken())) return;

    try {
      const res = await apiFetch(`/comment/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({ text: editText.trim() }),
      });
      if (!res.ok) throw new Error();
      toast.success("Comment updated");
      setEditingId(null);
      setEditText("");
      loadComments();
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const handleDelete = async (commentId) => {
    if (!(await ensureToken())) return;
    try {
      const res = await apiFetch(`/comment/${commentId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Comment deleted");
      loadComments();
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-xl px-2 flex items-center gap-2 mb-4">
        <FaComment /> Comments ({comments.length})
      </h2>

      {
        user && (
          <div className="mb-6 space-y-3">
            <TextArea
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
              placeholder="Share your feedback on this idea..."
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type="button"
              onPress={handlePost}
              className="w-full bg-indigo-600 text-white"
            >
              Post Comment
            </Button>
          </div>
        )
      }

      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first to share feedback.</p>
      ) : (
        <div className="space-y-4">
          {
            comments.map((comment) => (
              <div
                key={comment._id}
                className="border rounded-lg p-4 shadow-sm bg-white/50 dark:bg-slate-900/50"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold">{comment.userName}</p>
                  <p className="text-xs text-gray-400 shrink-0">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>

                {editingId === comment._id ? (
                  <div className="mt-2 space-y-2">
                    <TextArea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onPress={() => handleUpdate(comment._id)}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onPress={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 mt-2">{comment.text}</p>
                )
                }

                {
                  user?.email === comment.userEmail && editingId !== comment._id && (
                    <div className="flex gap-3 mt-3 text-sm">
                      <Button
                        size="sm"
                        variant="outline"
                        onPress={() => {
                          setEditingId(comment._id);
                          setEditText(comment.text);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onPress={() => handleDelete(comment._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      )
      }
    </div>
  );
};

export default Comment;
