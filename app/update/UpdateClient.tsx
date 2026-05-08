"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserType = {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  address?: string;
  contact?: string;
 education?: string;
  hobby?: string;
  interest?: string;
  profilePic?: string;
};

export default function UpdateUser() {

  const params = useSearchParams();

  const id = params.get("id");

  const router = useRouter();

  // Main Fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Extra Fields
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [education, setEducation] = useState("");
  const [hobby, setHobby] = useState("");
  const [interest, setInterest] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [loading, setLoading] = useState(true);

  // 🟢 Fetch User
  useEffect(() => {

    const getUser = async () => {

      try {

        const res = await fetch(`/api/users/${id}`);

        const data = await res.json();

        console.log(data);

        if (data.success) {

          const user: UserType = data.user;

          setName(user.name || "");

          setAge(user.age?.toString() || "");

          setEmail(user.email || "");

          setAddress(user.address || "");

          setContact(user.contact || "");

          setEducation(user.education || "");

          setHobby(user.hobby || "");

          setInterest(user.interest || "");

          setProfilePic(user.profilePic || "");
        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

    if (id) {

      getUser();
    }

  }, [id]);

  // 🔵 Update User
  const handleUpdate = async () => {

    try {

      const res = await fetch(`/api/users/${id}`, {

        method: "PUT",

        body: JSON.stringify({

          name,
          age,
          email,
          password,
          address,
          contact,
          education,
          hobby,
          interest,
          profilePic,
        }),

        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      console.log(data);

      if (data.success) {

        alert("Profile Updated Successfully!");

        router.push(`/profile2?email=${email}`);

      } else {

        alert(data.message);
      }

    } catch (err) {

      console.log(err);
    }
  };

  // Loading
  if (loading) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl p-10 shadow-2xl">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Update Profile
          </h1>

          <p className="text-zinc-400 mt-2">
            Edit your personal information and account details.
          </p>

        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Name */}
          <div>

            <label className="text-sm text-zinc-400">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Age */}
          <div>

            <label className="text-sm text-zinc-400">
              Age
            </label>

            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Email */}
          <div>

            <label className="text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Password */}
          <div>

            <label className="text-sm text-zinc-400">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Contact */}
          <div>

            <label className="text-sm text-zinc-400">
              Contact Number
            </label>

            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Education */}
          <div>

            <label className="text-sm text-zinc-400">
              Education
            </label>

            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Enter education"
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Hobby */}
          <div>

            <label className="text-sm text-zinc-400">
              Hobby
            </label>

            <input
              type="text"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              placeholder="Enter hobby"
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Interest */}
          <div>

            <label className="text-sm text-zinc-400">
              Interest
            </label>

            <input
              type="text"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="Enter interests"
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            />

          </div>

          {/* Address */}
          <div className="md:col-span-2">

            <label className="text-sm text-zinc-400">
              Address
            </label>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              rows={4}
              className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 resize-none"
            />

          </div>

        </div>

        {/* Button */}
        <div className="mt-10">

          <button
            onClick={handleUpdate}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] transition duration-300 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-cyan-500/20"
          >
            Update Profile
          </button>

        </div>

      </div>

    </div>
  );
}