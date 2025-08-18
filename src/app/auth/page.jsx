"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Users, Shield, Cpu, Robot, User2, Mail, Lock } from "lucide-react";

const roles = [
  { id: "student", name: "Student", icon: GraduationCap, blurb: "Learning and building" },
  { id: "team", name: "Team Member", icon: Robot, blurb: "Core robotics team" },
  { id: "mentor", name: "Mentor", icon: Shield, blurb: "Guiding and reviewing" },
  { id: "research", name: "Researcher", icon: Cpu, blurb: "AI & systems research" },
  { id: "community", name: "Community", icon: Users, blurb: "Helping the club" },
];

function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/50" />
      )}
      <input
        {...props}
        className={`w-full pl-${Icon ? "10" : "4"} pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white placeholder-white/50 ${props.className || ""}`}
      />
    </div>
  );
}

export default function AuthPage() {
  const [tab, setTab] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMessage("");
    setError("");
  }, [tab]);

  const isValidEmail = useMemo(
    () => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email),
    [email]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!isValidEmail) {
      setError("Please enter a valid email");
      return;
    }

    if (tab === "signup") {
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      // Store a demo account locally for UI demo purposes
      try {
        const raw = localStorage.getItem("nb_accounts");
        const accounts = raw ? JSON.parse(raw) : [];
        const existing = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
        if (!existing) accounts.push({ name, email, role });
        localStorage.setItem("nb_accounts", JSON.stringify(accounts));
      } catch (_) {}
    }

    try {
      localStorage.setItem("nb_user_email", email.trim());
      if (tab === "signup") localStorage.setItem("nb_user_role", role);
    } catch (_) {}

    setMessage(tab === "signup" ? "Account ready! Redirecting..." : "Welcome back! Redirecting...");
    setTimeout(() => router.push("/DashBoard"), 600);
  };

  return (
    <div className="relative min-h-screen bg-[#070b12] text-white overflow-hidden">
      {/* Background visuals */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-10 w-[36rem] h-[36rem] rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-6rem] w-[36rem] h-[36rem] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[900px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500"
          >
            Join NewtonBotics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 mt-3"
          >
            Build, learn, and innovate with our robotics club.
          </motion.p>
        </div>

        {/* Card */}
        <div className="mx-auto grid lg:grid-cols-2 gap-8 items-stretch max-w-6xl">
          {/* Left visuals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.12),transparent_45%)]" />
            <div className="relative z-10 space-y-6 self-center">
              <div className="flex items-center gap-3">
                <Robot className="w-8 h-8 text-red-400" />
                <div className="text-2xl font-semibold">Robotics Club Portal</div>
              </div>
              <p className="text-white/75 max-w-md">
                Create your account to access workshops, projects, and our community. Choose your role so we can tailor your experience.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {roles.slice(0,4).map((r, i) => (
                  <div key={r.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <r.icon className="w-5 h-5 text-white/80" />
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-white/60">{r.blurb}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6 md:p-8"
          >
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 w-fit mx-auto mb-6 border border-white/10">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === "signin" ? "bg-white/15" : "text-white/70 hover:text-white"}`}
                onClick={() => setTab("signin")}
              >
                Sign In
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === "signup" ? "bg-white/15" : "text-white/70 hover:text-white"}`}
                onClick={() => setTab("signup")}
              >
                Sign Up
              </button>
            </div>

            <AnimatePresence mode="wait">
              {tab === "signin" ? (
                <motion.form
                  key="signin"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  onSubmit={onSubmit}
                  className="space-y-4"
                >
                  <Input icon={Mail} type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                  <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                  {error && <div className="text-red-400 text-sm">{error}</div>}
                  {message && <div className="text-green-400 text-sm">{message}</div>}
                  <button type="submit" className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold">
                    Continue
                  </button>
                  <div className="text-center text-sm text-white/60">Don’t have an account? <button type="button" onClick={()=>setTab("signup")} className="text-white hover:underline">Sign up</button></div>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  onSubmit={onSubmit}
                  className="space-y-4"
                >
                  <Input icon={User2} type="text" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} />
                  <Input icon={Mail} type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                  <Input icon={Lock} type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e)=>setPassword(e.target.value)} />

                  {/* Roles */}
                  <div>
                    <div className="text-xs text-white/60 mb-2">Select your role</div>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition ${role === r.id ? "border-red-500/60 bg-red-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                        >
                          <r.icon className="w-4.5 h-4.5" />
                          <span className="text-sm">{r.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && <div className="text-red-400 text-sm">{error}</div>}
                  {message && <div className="text-green-400 text-sm">{message}</div>}
                  <button type="submit" className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold">
                    Create account
                  </button>
                  <div className="text-center text-sm text-white/60">Already have an account? <button type="button" onClick={()=>setTab("signin")} className="text-white hover:underline">Sign in</button></div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-6 text-[11px] text-white/40 text-center">
              Demo only: credentials are stored locally for UI preview. Integrate OAuth or your backend later.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 