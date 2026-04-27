import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {handleSignUp , loading , error} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);

    try {
      const response = await handleSignUp(form);
      console.log("Signup Response:", response);
      navigate("/");
    } catch (error) {
      console.log("Signup Error:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden text-white">

      {/* 🔥 Animated BG */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-600/30 rounded-full blur-3xl animate-pulse bottom-[-100px] right-[-100px]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

        <h1 className="text-3xl font-semibold text-center mb-2">
          Create Account 🚀
        </h1>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Signup to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:border-white focus:ring-1 focus:ring-white outline-none transition"
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?
          <Link to="/login" className="ml-2 text-white hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}