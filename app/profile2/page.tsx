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

export default function ProfilePage() {

  const params = useSearchParams();
  const email = params.get("email");

  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);

  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {

    const getUser = async () => {

      const res = await fetch(`/api/users?email=${email}`);

      const data = await res.json();

      if (data.success) {

        setUser(data.user);

        setProfilePic(data.user.profilePic || "");
      }
    };

    if (email) {
      getUser();
    }

  }, [email]);

  const handleLogout = async () => {

    await fetch("/api/logout");

    localStorage.removeItem("user");

    router.push("/");
  };

  const handleDelete = async () => {

    if (!user) return;

    const confirmDelete = confirm("Are you sure?");

    if (!confirmDelete) return;

    const res = await fetch(`/api/users/${user._id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      router.push("/");
    }
  };

  const handleProfilePic = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!user) return;

    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {

      const base64 = reader.result as string;

      setProfilePic(base64);

      await fetch(`/api/users/${user._id}`, {

        method: "PUT",

        headers: {
          "content-type": "application/json",
        },

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
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading...
      </div>
    );
  }

  const currentUser = user;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Navbar */}
      <nav className="h-16 md:h-20 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-4 md:px-8">

        <div className="text-xl md:text-2xl font-bold text-cyan-400">
          VishalDev
        </div>

        <div className="flex items-center gap-3 md:gap-4">

          <p className="text-sm md:text-base text-zinc-300 hidden sm:block">
            Welcome, {currentUser.name}
          </p>

          {profilePic ? (

            <img
              src={profilePic}
              alt="Profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-cyan-500 object-cover"
            />

          ) : (

            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-800 border border-zinc-700" />
          )}
        </div>
      </nav>

      {/* Layout */}
      <div className="flex flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-800 p-4 md:p-6 flex md:flex-col gap-3 md:gap-4 overflow-x-auto">

          <button className="px-4 py-2 md:py-3 rounded-xl bg-cyan-500/10 border border-cyan-500 text-cyan-400 whitespace-nowrap">
            👤 Profile
          </button>

          <button
            onClick={() => router.push(`/update?id=${currentUser._id}`)}
            className="px-4 py-2 md:py-3 rounded-xl bg-zinc-900 border border-zinc-800 whitespace-nowrap"
          >
            ✏️ Update
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 md:py-3 rounded-xl bg-zinc-900 border border-red-500/30 text-red-400 whitespace-nowrap"
          >
            🗑️ Delete
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 md:py-3 rounded-xl bg-zinc-900 border border-yellow-500/30 text-yellow-400 whitespace-nowrap"
          >
            🚪 Logout
          </button>

        </aside>

        {/* Main */}
        <main className="flex-1 p-4 md:p-10">

          <div className="max-w-5xl mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl md:rounded-3xl p-5 md:p-10">

            {/* Top */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 border-b border-zinc-800 pb-6 md:pb-8">

              <div className="relative">

                {profilePic ? (

                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-cyan-500 object-cover"
                  />

                ) : (

                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-zinc-900 border border-zinc-700" />
                )}

                <label className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer">

                  +

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleProfilePic}
                  />

                </label>

              </div>

              <div className="text-center md:text-left">

                <h1 className="text-2xl md:text-4xl font-bold">
                  {currentUser.name}
                </h1>

                <p className="text-cyan-400 mt-2">
                  Full Stack Developer
                </p>

                <p className="text-zinc-400 mt-3 text-sm md:text-base">
                  Profile dashboard page
                </p>

              </div>

            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-10">

              {[
                ["Name", currentUser.name],
                ["Age", currentUser.age],
                ["Email", currentUser.email],
                ["Status", "Active"],
                ["Contact", currentUser.contact],
                ["Education", currentUser.education],
                ["Hobby", currentUser.hobby],
                ["Interest", currentUser.interest],
              ].map(([label, value], i) => (

                <div
                  key={i}
                  className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800"
                >

                  <p className="text-zinc-400 text-sm">
                    {label}
                  </p>

                  <h2 className="text-base md:text-lg font-semibold mt-1">
                    {value || "Not Added"}
                  </h2>

                </div>
              ))}

              <div className="sm:col-span-2 bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800">

                <p className="text-zinc-400 text-sm">
                  Address
                </p>

                <h2 className="text-base md:text-lg font-semibold mt-1">
                  {currentUser.address || "Not Added"}
                </h2>

              </div>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}