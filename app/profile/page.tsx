"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {

  const params = useSearchParams();
  const email = params.get("email");
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        let res = await fetch(`/api/users?email=${email}`);
        let data = await res.json();
        console.log(data);
        if (data.success) {
          setUser(data.user);
        }
        
      } catch (err) {
        console.log(err);
      }
    };

    if (email) getUser();
  }, [email]);

 const handleLogout = async () => {
  await fetch("/api/logout");

  router.push("/");
};

  if (!user) {
    return <h1 className="text-white text-center mt-10">Loading...</h1>;
  }

  const handleDelete = async () => {
  const confirmDelete = confirm("Are you sure?");
  if (!confirmDelete) return;

  const res = await fetch(`/api/users/${user._id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log("LOGIN RESPONSE:", data);
  if (data.success) {
    alert("Profile deleted");

    // logout + redirect
    localStorage.removeItem("user");
    router.push("/");
  } else {
    alert("Error: " + data.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
     <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md w-[350px] relative">

        {/* 🔴 Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>

        <h1 className="text-2xl mb-4 text-center">User Profile</h1>

        <div className="space-y-2">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Age:</b> {user.age}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>

        {/* 🔵 Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => router.push(`/update?id=${user._id}`)}
            className="bg-blue-500 py-2 rounded"
          >
            Update Profile
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 py-2 rounded"
          >
            Delete Profile
          </button>
        </div>

      </div>


     
    </div>
  );
}