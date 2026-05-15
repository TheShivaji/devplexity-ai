import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const { handleSignUp, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignUp(form);
      navigate("/");
    } catch (err) {
      console.log("Signup Error:", err);
    }
  };

  if (!loading && user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808]">
      <div className="w-full max-w-sm px-8 py-10 bg-[#0a0a0a] border border-white/[0.07] rounded-[14px]">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-[7px] h-[7px] rounded-full bg-blue-500" />
          <span className="text-[14px] font-semibold tracking-tight text-white/90">
            Devplexity<span className="text-blue-400">AI</span>
          </span>
        </div>

        <h1 className="text-[20px] font-semibold tracking-tight text-white/92 mb-1">
          Create account
        </h1>
        <p className="text-[12.5px] text-white/35 mb-7">Get started for free</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <p className="text-[11px] text-white/30 mb-1.5 tracking-wide uppercase">Full name</p>
            <input
              type="text"
              name="username"
              placeholder="Your name"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-[#111111] border border-white/10 focus:border-blue-500/40 rounded-[9px] px-3.5 py-2.5 text-[13px] text-white/75 placeholder:text-white/22 outline-none transition-colors"
            />
          </div>
          <div>
            <p className="text-[11px] text-white/30 mb-1.5 tracking-wide uppercase">Email</p>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#111111] border border-white/10 focus:border-blue-500/40 rounded-[9px] px-3.5 py-2.5 text-[13px] text-white/75 placeholder:text-white/22 outline-none transition-colors"
            />
          </div>
          <div>
            <p className="text-[11px] text-white/30 mb-1.5 tracking-wide uppercase">Password</p>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-[#111111] border border-white/10 focus:border-blue-500/40 rounded-[9px] px-3.5 py-2.5 text-[13px] text-white/75 placeholder:text-white/22 outline-none transition-colors"
            />
          </div>

          {error && <p className="text-[12px] text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 mt-1 rounded-[9px] bg-white text-black text-[13px] font-semibold hover:bg-white/90 active:scale-[0.98] transition-all"
          >
            Create account
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-[11px] text-white/20">or</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        <button className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-[9px] bg-transparent border border-white/10 text-white/55 hover:bg-white/[0.04] hover:text-white/75 text-[12.5px] transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-[11.5px] text-white/25 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white/55 hover:text-white/80 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

