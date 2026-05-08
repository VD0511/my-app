"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProAuthUI() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔵 LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);

      let res = await fetch("/api/login", {
        method: "POST",

        body: JSON.stringify({
          email,
          password,
        }),

        headers: {
          "content-type": "application/json",
        },

        credentials: "include",
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        if (data.role === "admin") {
          router.push("/admin");
        } else {
          router.push(`/profile2?email=${email}`);
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 SIGNUP
  const handleSignup = async () => {
    if (!name || !age || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      let response = await fetch("/api/users", {
        method: "POST",

        body: JSON.stringify({
          name,
          age,
          email,
          password,
        }),

        headers: {
          "content-type": "application/json",
        },
      });

      response = await response.json();

      if (response.success) {
        alert("Account created successfully!");

        setIsLogin(true);

        setName("");
        setAge("");
        setEmail("");
        setPassword("");
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center px-4">
      
      {/* Background Blur */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

      {/* Card */}
     <div className="relative w-full max-w-lg">
        
        {/* Glow Border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-40 blur-xl"></div>

        {/* Main Box */}
        <div className="relative bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-6 shadow-2xl">
          
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
  <p className="font-bold">Testing Phase</p>
  <p>Please do not enter any real personal information. This is for demonstration purposes only.</p>
</div>

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold shadow-lg shadow-cyan-500/20">
              V
            </div>

            <h1 className="text-3xl font-bold text-white mt-5">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="text-zinc-400 text-sm mt-2">
              {isLogin
                ? "Login to continue your journey"
                : "Build your professional profile"}
            </p>
          </div>

          {/* Signup */}
          {!isLogin ? (
            <div className="space-y-3">
              
              <div>
                <label className="text-sm text-zinc-400">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-500 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  Age
                </label>

                <input
                  type="number"
                  placeholder="Enter your age"
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-500 transition"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all py-3 rounded-2xl text-white font-semibold shadow-lg shadow-cyan-500/20"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              <p className="text-center text-zinc-400 text-sm">
                Already have an account?
                <span
                  onClick={() => setIsLogin(true)}
                  className="ml-2 text-cyan-400 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </div>
          ) : (
            /* Login */
            <div className="space-y-5">
              
              <div>
                <label className="text-sm text-zinc-400">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all py-4 rounded-2xl text-white font-semibold shadow-lg shadow-cyan-500/20"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-zinc-400 text-sm">
                New here?
                <span
                  onClick={() => setIsLogin(false)}
                  className="ml-2 text-cyan-400 cursor-pointer hover:underline"
                >
                  Signup
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}