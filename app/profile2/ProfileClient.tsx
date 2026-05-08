"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserType = {
  _id: string;
  name: string;
  age: number;
  email: string;
  profilePic?: string;
  contact?: string;
  education?: string;
  hobby?: string;
  interest?: string;
  address?: string;
};

export default function ProfileClient() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const getUser = async () => {
      if (!email) return;

      try {
        const res = await fetch(`/api/users?email=${email}`);
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
          setProfilePic(data.user.profilePic || "");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [email]);

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/");
  };

  const handleDelete = async () => {
    if (!user?._id) return;

    if (!confirm("Are you sure?")) return;

    const res = await fetch(`/api/users/${user._id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      router.push("/");
    }
  };

  const handleProfilePic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user?._id) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;

      setProfilePic(base64);

      await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...user,
          profilePic: base64,
        }),
      });
    };

    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Navbar */}
      <nav className="h-16 flex items-center justify-between px-6 border-b border-zinc-800 bg-zinc-950">

        <h1 className="text-cyan-400 font-bold text-xl">
          VishalDev
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-300">
            {user.name}
          </span>

          {profilePic ? (
            <img
              src={profilePic}
              className="w-10 h-10 rounded-full border border-cyan-500 object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-zinc-800" />
          )}
        </div>
      </nav>

      {/* Layout */}
      <div className="flex flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800 p-4 flex md:flex-col gap-3">

          <button className="text-cyan-400">Profile</button>

          <button
            onClick={() => router.push(`/update?id=${user._id}`)}
          >
            Update
          </button>

          <button onClick={handleDelete}>Delete</button>

          <button onClick={handleLogout}>Logout</button>

        </aside>

        {/* Main */}
        <main className="flex-1 p-6">

          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

            <div className="flex items-center gap-6">

              {profilePic ? (
                <img
                  src={profilePic}
                  className="w-24 h-24 rounded-full border-2 border-cyan-500 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-zinc-800" />
              )}

              <label className="cursor-pointer text-cyan-400">
                Change Photo
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePic}
                />
              </label>

            </div>

            <div className="mt-6 space-y-2">

              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
              <p>Contact: {user.contact || "N/A"}</p>
              <p>Education: {user.education || "N/A"}</p>
              <p>Hobby: {user.hobby || "N/A"}</p>
              <p>Interest: {user.interest || "N/A"}</p>
              <p>Address: {user.address || "N/A"}</p>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}