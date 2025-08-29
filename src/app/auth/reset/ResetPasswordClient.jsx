"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

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

export default function ResetPasswordClient() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError("Invalid or missing reset token");
    }
  }, [searchParams]);

  const isValidPassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters with uppercase, lowercase, number, and special character");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // For now, just simulate success since we don't have backend
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setError(error.message || "Failed to reset password");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative min-h-screen overflow-visible bg-[#070b12] text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-10 w-[40rem] h-[40rem] rounded-full bg-sky-500/15 blur-3xl" />
          <div className="absolute bottom-[-8rem] right-[-6rem] w-[42rem] h-[42rem] rounded-full bg-indigo-500/15 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-10">
          <div className="mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:flex relative overflow-hidden rounded-3xl border border-white/15 bg-black/30"
            >
              <video src="/authentication.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md lg:max-w-none rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-2xl p-6 md:p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Password reset successful!</h1>
              <p className="text-white/70 mb-6">
                Your password has been updated successfully. You can now sign in with your new password.
              </p>
              <button
                onClick={() => router.push("/auth/signin")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 transition font-semibold"
              >
                Continue to sign in
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !token) {
    return (
      <div className="relative min-h-screen overflow-visible bg-[#070b12] text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-10 w-[40rem] h-[40rem] rounded-full bg-sky-500/15 blur-3xl" />
          <div className="absolute bottom-[-8rem] right-[-6rem] w-[42rem] h-[42rem] rounded-full bg-indigo-500/15 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-10">
          <div className="mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:flex relative overflow-hidden rounded-3xl border border-white/15 bg-black/30"
            >
              <video src="/authentication.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md lg:max-w-none rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-2xl p-6 md:p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 text-2xl">⚠</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-red-400">Invalid Reset Link</h1>
              <p className="text-white/70 mb-6">
                {error}
              </p>
              <a
                href="/auth/forgot"
                className="inline-block w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 transition font-semibold"
              >
                Request new reset link
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-visible bg-[#070b12] text-white">
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
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10">
        <div className="mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex relative overflow-hidden rounded-3xl border border-white/15 bg-black/30"
          >
            <video src="/authentication.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md lg:max-w-none rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-2xl p-6 md:p-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Set new password</h1>
            <p className="text-white/70 mb-6">
              Enter your new password below. Make sure it's secure and easy to remember.
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="relative">
                <Input 
                  label="New password" 
                  icon={Lock} 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter new password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="relative">
                <Input 
                  label="Confirm password" 
                  icon={Lock} 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm new password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:from-sky-800 disabled:to-indigo-800 disabled:cursor-not-allowed transition font-semibold"
              >
                {isSubmitting ? "Updating..." : "Update password"}
              </button>
            </form>

            <div className="mt-4 text-sm text-white/70 text-center">
              Remember your password? <a href="/auth/signin" className="text-white hover:underline">Sign in</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
