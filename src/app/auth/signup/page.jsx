"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Users, Shield, Cpu, Bot, User, Mail, Lock, UserPlus } from "lucide-react";

const roles = [
  { id: "student", name: "Student", icon: GraduationCap },
  { id: "team", name: "Team Member", icon: Bot },
  { id: "mentor", name: "Mentor", icon: Shield },
  { id: "research", name: "Researcher", icon: Cpu },
  { id: "community", name: "Community", icon: Users },
];

function Input({ label, icon: Icon, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm text-white/80">{label}</span>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />}
        <input {...props} className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl bg-black/50 border border-white/25 focus:outline-none focus:ring-2 focus:ring-sky-500/40 text-white placeholder-white/60`} />
      </div>
    </label>
  );
}

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your name");
    if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) return setError("Enter a valid email");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    try {
      localStorage.setItem("nb_user_email", email.trim());
      localStorage.setItem("nb_user_role", role);
      const raw = localStorage.getItem("nb_accounts");
      const accounts = raw ? JSON.parse(raw) : [];
      const existing = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
      if (!existing) accounts.push({ name, email, role });
      localStorage.setItem("nb_accounts", JSON.stringify(accounts));
    } catch(_) {}
    setMessage("Account created! Redirecting...");
    setTimeout(()=>router.push("/DashBoard"), 600);
  };

  return (
    <div className="relative min-h-screen overflow-visible bg-[#070b12] text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-10 w-[40rem] h-[40rem] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-6rem] w-[42rem] h-[42rem] rounded-full bg-indigo-500/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08] hidden md:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        {/* Hologram orb */}
        <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 w-[34rem] h-[34rem]">
          <div className="absolute inset-0 rounded-full border border-sky-400/40 bg-gradient-to-br from-sky-400/10 to-transparent shadow-[0_0_60px_rgba(56,189,248,.25)]" />
          <div className="absolute inset-6 rounded-full border border-sky-300/30" />
          <div className="absolute inset-12 rounded-full border border-sky-200/20" />
          <div className="absolute -inset-6 rounded-full animate-pulse bg-sky-400/5 blur-2xl" />
          <span className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_12px_2px_rgba(56,189,248,.6)]" />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_12px_2px_rgba(103,232,249,.6)]" />
          <span className="absolute left-14 bottom-10 w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_12px_2px_rgba(147,197,253,.6)]" />
        </div>
      </div>

      {/* Card */}
      <div className="relative z-10 container mx-auto px-6 py-10 flex justify-end">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-2xl p-6 md:p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Create your account</h1>
          <p className="text-white/70 mb-6">Choose a role and join the NewtonBotics community.</p>

          <form onSubmit={onSubmit} className="space-y-5">
            <Input label="Full name" icon={User} type="text" placeholder="Jane Doe" value={name} onChange={(e)=>setName(e.target.value)} />
            <Input label="Email" icon={Mail} type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input label="Password" icon={Lock} type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e)=>setPassword(e.target.value)} />

            <div>
              <div className="text-sm text-white/80 mb-2">Role</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button key={r.id} type="button" onClick={()=>setRole(r.id)} className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition ${role===r.id?"border-sky-400 bg-sky-400/10":"border-white/20 bg-white/5 hover:bg-white/10"}`}>
                    <r.icon className="w-4 h-4" />
                    <span className="text-sm">{r.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}
            {message && <div className="text-emerald-400 text-sm">{message}</div>}
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 transition font-semibold flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" /> Create account
            </button>
          </form>

          <div className="mt-4 text-sm text-white/70 text-center">Already have an account? <a href="/auth/signin" className="text-white hover:underline">Sign in</a></div>
        </motion.div>
      </div>
    </div>
  );
} 