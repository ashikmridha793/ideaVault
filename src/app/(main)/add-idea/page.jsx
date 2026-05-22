"use client";

import PageTitle from "@/components/PageTitle";
import { authClient } from "@/lib/auth-client";
import { apiFetch, syncJwtFromSession } from "@/lib/api";
import {
  Input,
  TextArea,
  Select,
  Button,
  label,
  TextField,
  ListBox,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const categories = [
  "Tech",
  "Health",
  "AI",
  "Education",
  "Finance",
  "Business",
  "Environment",
  "Lifestyle",
];

export default function AddIdeaPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget
    const user = session?.user;
    if (!user) {
      toast.error("Please log in to add an idea");
      return;
    }

    const formData = new FormData(form);
    const idea = Object.fromEntries(formData.entries());

    await syncJwtFromSession(user);

    try {
      const res = await apiFetch("/ideas", {
        method: "POST",
        body: JSON.stringify(idea),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Failed to add idea");
        return;
      }
      toast.success("Idea published successfully!");
      e.currentTarget.reset();
      router.push("/my-ideas");
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <PageTitle title="Add Idea" />
      <div className="min-h-screen flex items-center justify-center py-6 px-3 sm:p-6">
        <div className="w-full max-w-4xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden p-6 bg-white dark:bg-slate-900">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">Add New Idea</h1>
            <p className="text-sm sm:text-lg text-gray-500">
              Share your startup concept with the IdeaVault community
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <TextField name="title" isRequired>
                  <label>Idea Title</label>
                  <Input placeholder="AI study assistant for students" />
                </TextField>
              </div>

              <Select name="category" isRequired placeholder="Select category">
                <label>Category</label>
                <Select.Trigger className="w-full min-h-12 rounded-xl border border-slate-300">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {categories.map((cat) => (
                      <ListBox.Item key={cat} id={cat} textValue={cat}>
                        {cat}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <TextField name="tags">
                <label>Tags (optional)</label>
                <Input placeholder="AI, Education, SaaS" />
              </TextField>

              <div className="md:col-span-2">
                <TextField name="imgUrl" isRequired>
                  <label>Image URL</label>
                  <Input placeholder="https://images.unsplash.com/..." />
                </TextField>
              </div>

              <TextField name="sortDescription" isRequired>
                <label>Short Description</label>
                <TextArea rows={3} placeholder="One-line pitch for your idea" />
              </TextField>

              <TextField name="description" isRequired>
                <label>Detailed Description</label>
                <TextArea rows={3} placeholder="Full overview of the startup idea" />
              </TextField>

              <TextField name="estimatedBudget">
                <label>Estimated Budget (optional)</label>
                <Input type="number" placeholder="5000" />
              </TextField>

              <TextField name="targetAudience" isRequired>
                <label>Target Audience</label>
                <Input placeholder="Students, founders, SMEs..." />
              </TextField>

              <div className="md:col-span-2">
                <TextField name="problemStatement" isRequired>
                  <label>Problem Statement</label>
                  <TextArea rows={3} placeholder="What problem does this solve?" />
                </TextField>
              </div>

              <div className="md:col-span-2">
                <TextField name="proposedSolution" isRequired>
                  <label>Proposed Solution</label>
                  <TextArea rows={3} placeholder="How does your idea solve it?" />
                </TextField>
              </div>
            </div>

            <Button type="submit" className="w-full bg-indigo-600 text-white py-3">
              Submit Idea
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
