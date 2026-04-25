"use client";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔁 Two-way binding
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden text-white">

      {/* 🔥 Animated Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-3xl animate-pulse bottom-[-100px] right-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-3xl animate-pulse top-[50%] left-[50%]" />

      {/* ✨ Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 🌟 Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h1>

        <p className="text-gray-400 text-center mb-6 text-sm">
          {isLogin ? "Login to continue" : "Signup to get started"}
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
            />
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition active:scale-95"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-white font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
}