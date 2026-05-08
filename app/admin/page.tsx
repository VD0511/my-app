"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserType = {
  _id: string;
  name: string;
  age: number;
  email: string;
  profilePic?: string;
};

export default function AdminDashboard() {

  const [users, setUsers] = useState<UserType[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        }
      });
  }, []);

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this user?")) return;

    const res = await fetch("/api/admin/users/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {

      alert("User deleted");

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-800 p-4 md:p-6 flex md:flex-col justify-between md:justify-start gap-4 md:gap-6">

        <div className="text-2xl md:text-3xl font-bold text-cyan-400">
          AdminPanel
        </div>

        <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-visible">

          <button className="px-4 py-2 md:py-3 rounded-xl bg-cyan-500/10 border border-cyan-500 text-cyan-400 whitespace-nowrap">
            📊 Dashboard
          </button>

          <button className="px-4 py-2 md:py-3 rounded-xl bg-zinc-900 border border-zinc-800 whitespace-nowrap">
            👥 Users
          </button>

          <button className="px-4 py-2 md:py-3 rounded-xl bg-zinc-900 border border-zinc-800 whitespace-nowrap">
            ⚙️ Settings
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 md:py-3 rounded-xl bg-red-500/10 border border-red-500 text-red-400 whitespace-nowrap"
          >
            🚪 Logout
          </button>

        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">

          <div>
            <h1 className="text-2xl md:text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-zinc-400 text-sm md:text-base">
              Manage users and monitor platform.
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">

            <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 md:px-5 md:py-3 rounded-2xl">
              <p className="text-xs md:text-sm text-zinc-400">
                Users
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-cyan-400">
                {users.length}
              </h2>
            </div>

            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-cyan-500"
            />

          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 md:p-6">
            <p className="text-zinc-400 text-sm">
              Total Users
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mt-2">
              {users.length}
            </h2>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 md:p-6">
            <p className="text-zinc-400 text-sm">
              Status
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mt-2">
              Active
            </h2>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 md:p-6">
            <p className="text-zinc-400 text-sm">
              Access
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mt-2">
              Granted
            </h2>
          </div>

        </div>

        {/* Table */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-x-auto">

          <div className="p-4 md:p-6 border-b border-zinc-800">
            <h2 className="text-xl md:text-2xl font-bold">
              All Users
            </h2>
          </div>

          {users.length === 0 ? (

            <div className="p-6 md:p-10 text-center text-zinc-400">
              No users found
            </div>

          ) : (

            <table className="w-full min-w-[600px]">

              <thead className="bg-zinc-900">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Age</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-b border-zinc-800"
                  >

                    <td className="p-4 flex items-center gap-3">

                      <img
                        src={
                          user.profilePic ||
                          "https://i.pravatar.cc/100"
                        }
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />

                      <span className="text-sm">
                        {user.name}
                      </span>

                    </td>

                    <td className="p-4">
                      {user.age}
                    </td>

                    <td className="p-4 text-sm text-zinc-300">
                      {user.email}
                    </td>

                    <td className="p-4">
                      <span className="text-green-400 text-sm">
                        Active
                      </span>
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-400 text-sm border border-red-500/30 px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}
        </div>

      </main>
    </div>
  );
}