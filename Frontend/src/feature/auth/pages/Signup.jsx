import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.isLoading);
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      await handleSignUp(form);
      navigate("/");
    } catch (error){
      console.log(error.message);
    }
  };

  if (!loading && user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] px-4 font-sans">
      <div className="w-full max-w-sm px-8 py-9 bg-[#0e0e11] border border-white/[0.08] rounded-2xl shadow-2xl">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <span className="font-display text-[15px] font-bold tracking-tight text-white">
            Devplexity<span className="text-purple-400">.ai</span>
          </span>
        </div>

        <h1 className="font-display text-[22px] font-bold tracking-tight text-white mb-1">
          Create account
        </h1>
        <p className="text-[12.5px] text-zinc-400 mb-6">Get started with AI research</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <p className="text-[11px] font-semibold text-zinc-400 mb-1.5 tracking-wider uppercase">Full name</p>
            <input
              type="text"
              name="username"
              placeholder="Your name"
              value={form.username}
              onChange={handleChange}
              aria-label="Full name"
              className="w-full bg-[#141418] border border-white/[0.08] focus:border-white/20 focus:outline-none rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-100 placeholder:text-zinc-500 transition-all duration-150"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-400 mb-1.5 tracking-wider uppercase">Email</p>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              aria-label="Email address"
              className="w-full bg-[#141418] border border-white/[0.08] focus:border-white/20 focus:outline-none rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-100 placeholder:text-zinc-500 transition-all duration-150"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-400 mb-1.5 tracking-wider uppercase">Password</p>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              aria-label="Password"
              className="w-full bg-[#141418] border border-white/[0.08] focus:border-white/20 focus:outline-none rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-100 placeholder:text-zinc-500 transition-all duration-150"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-1.5 rounded-xl text-[13px] font-semibold transition-all duration-150 cursor-pointer shadow-xs ${
              loading ? "bg-white/40 text-black/50 cursor-not-allowed" : "bg-white text-black hover:bg-zinc-200 active:scale-[0.99]"
            }`}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] text-zinc-500">or</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <button className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl bg-transparent border border-white/[0.08] text-zinc-300 hover:bg-white/[0.04] hover:text-white text-[12.5px] transition-all cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-[12px] text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
