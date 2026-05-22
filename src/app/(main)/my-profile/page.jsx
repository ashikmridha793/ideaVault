"use client";

import PageTitle from "@/components/PageTitle";
import { authClient } from "@/lib/auth-client";
import { syncJwtFromSession } from "@/lib/api";
import { Avatar, Button, Form, Input, Label } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MyProfilePage() {
  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
      syncJwtFromSession(user);
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error } = await authClient.updateUser({
      name,
      image,
    });
    if (error) {
      toast.error(error.message || "Profile update failed");
      return;
    }
    toast.success("Profile updated successfully");
    refetch();
    await syncJwtFromSession({ ...user, name, image });
  };

  if (!user) {
    return <p className="text-center py-20">Loading profile...</p>;
  }

  return (
    <div className="w-11/12 max-w-lg mx-auto py-10">
      <PageTitle title="Profile" />
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>

      <div className="flex items-center gap-4 mb-8">
        <Avatar size="lg">
          <Avatar.Image src={image || user.image} alt={name} />
          <Avatar.Fallback>{name?.charAt(0) || "U"}</Avatar.Fallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user.email}</p>
          <p className="text-sm text-gray-500">Update your display name and photo</p>
        </div>
      </div>

      <Form onSubmit={onSubmit} className="space-y-4 border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-900">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>Photo URL</Label>
          <Input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        <Button type="submit" className="w-full bg-indigo-600 text-white">
          Save Profile
        </Button>
      </Form>
    </div>
  );
}
