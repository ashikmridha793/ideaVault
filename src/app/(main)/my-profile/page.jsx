"use client";

import PageTitle from "@/components/PageTitle";
import { authClient, useSession } from "@/lib/auth-client";
import { syncJwtFromSession } from "@/lib/api";
import { Avatar, Button, Input } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowDown } from "react-icons/fa6";

export default function MyProfilePage() {
  const myRef = useRef(null)

  const { data: session, refetch } = useSession();
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

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Avatar size="xl" className="w-30 h-30 rounded-full">
          <Avatar.Image src={image || user.image} alt={name} />
          <Avatar.Fallback>{name?.charAt(0) || "U"}</Avatar.Fallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user.email}</p>
          <p className="text-sm text-gray-500">Update your display name and photo</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center ">
        Edit<FaArrowDown />
      </div>

      <form onSubmit={onSubmit} className="space-y-4 border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-900">
        <div>
          <label>Name</label>
          <Input className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
        </div>
        <div>
          <label>Photo URL</label>
          <Input className="w-full"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        <Button type="submit" className="w-full bg-indigo-600 text-white">
          Save Profile
        </Button>
      </form>
    </div>
  );
}
