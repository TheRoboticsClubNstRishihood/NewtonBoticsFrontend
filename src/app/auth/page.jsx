"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Users, Shield, Cpu, Bot, User2, Mail, Lock, Phone, Building, Calendar, Eye, EyeOff } from "lucide-react";

const roles = [
  { id: "student", name: "Student", icon: GraduationCap, blurb: "Learning and building" },
  { id: "team_member", name: "Team Member", icon: Bot, blurb: "Core robotics team" },
  { id: "mentor", name: "Mentor", icon: Shield, blurb: "Guiding and reviewing" },
  { id: "researcher", name: "Researcher", icon: Cpu, blurb: "AI & systems research" },
  { id: "community", name: "Community", icon: Users, blurb: "Helping the club" },
];

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Robotics Engineering",
  "Artificial Intelligence",
  "Data Science",
  "Other"
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

function Select({ icon: Icon, children, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/50 pointer-events-none" />
      )}
      <select
        {...props}
        className={`w-full pl-${Icon ? "10" : "4"} pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white ${props.className || ""}`}
      >
        {children}
      </select>
    </div>
  );
}

function PasswordInput({ icon: Icon = Lock, value, onChange, placeholder = "Password" }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/50" />
      )}
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-${Icon ? "10" : "4"} pr-10 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white placeholder-white/50`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
      </button>
    </div>
  );
}

export default function AuthPage() {
  const [tab, setTab] = useState("signin");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    studentId: "",
    department: "",
    yearOfStudy: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register, error: authError, clearError } = useAuth();

  useEffect(() => {
    setMessage("");
    setError("");
    clearError();
  }, [tab, clearError]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const isValidEmail = useMemo(
    () => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(formData.email),
    [formData.email]
  );

  const isValidPassword = useMemo(() => {
    const password = formData.password;
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }, [formData.password]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateSignupForm = () => {
    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      setError("First name must be at least 2 characters");
      return false;
    }
    
    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      setError("Last name must be at least 2 characters");
      return false;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!isValidPassword) {
      setError("Password must be at least 8 characters with uppercase, lowercase, number, and special character");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.role === "student" && !formData.studentId.trim()) {
      setError("Student ID is required for students");
      return false;
    }

    if (formData.role === "student" && !formData.department) {
      setError("Department is required for students");
      return false;
    }

    if (formData.role === "student" && !formData.yearOfStudy) {
      setError("Year of study is required for students");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignupForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const userData = {
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        role: formData.role,
        ...(formData.role === "student" && {
          studentId: formData.studentId.trim(),
          department: formData.department,
          yearOfStudy: parseInt(formData.yearOfStudy),
        }),
        ...(formData.phone && { phone: formData.phone.trim() }),
      };

      const result = await register(userData);
      
      if (result.success) {
        if (result.roleNotice) {
          const { requestedRole, assignedRole, message: noticeMsg } = result.roleNotice;
          setMessage(
            noticeMsg || `Requested role '${requestedRole}' is not pre-approved. Registered as '${assignedRole}'.`
          );
        } else {
          setMessage("Account created successfully! Redirecting...");
        }
      } else {
        if (result.code === 409) {
          setError('An account with this email already exists.');
        } else {
          setError(result.error);
        }
      }
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await login({
        email: formData.email.trim(),
        password: formData.password,
      });
      
      if (result.success) {
        setMessage("Welcome back! Redirecting...");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (e) => {
    if (tab === "signin") {
      handleSignin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070b12] text-white overflow-hidden">
      {/* Background visuals */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-10 w-[36rem] h-[36rem] rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-6rem] w-[36rem] h-[36rem] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[900px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full max-w-lg lg:max-w-xl h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl lg:order-1"
          >
            <video
              src="/authentication.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6 md:p-8 lg:order-2"
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
                  <Input 
                    icon={Mail} 
                    type="email" 
                    placeholder="Email address" 
                    value={formData.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)} 
                  />
                  <PasswordInput 
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Password"
                  />
                  <div className="flex justify-end">
                    <Link href="/auth/forgot" className="text-xs text-white/70 hover:text-white underline underline-offset-2">
                      Forgot password?
                    </Link>
                  </div>
                  {error && <div className="text-red-400 text-sm">{error}</div>}
                  {message && <div className="text-green-400 text-sm">{message}</div>}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition font-semibold"
                  >
                    {isSubmitting ? "Signing In..." : "Continue"}
                  </button>
                  <div className="text-center text-sm text-white/60">
                    Don't have an account? <button type="button" onClick={()=>setTab("signup")} className="text-white hover:underline">Sign up</button>
                  </div>
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
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      icon={User2} 
                      type="text" 
                      placeholder="First name" 
                      value={formData.firstName} 
                      onChange={(e) => handleInputChange('firstName', e.target.value)} 
                    />
                    <Input 
                      icon={User2} 
                      type="text" 
                      placeholder="Last name" 
                      value={formData.lastName} 
                      onChange={(e) => handleInputChange('lastName', e.target.value)} 
                    />
                  </div>
                  
                  <Input 
                    icon={Mail} 
                    type="email" 
                    placeholder="Email address" 
                    value={formData.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)} 
                  />
                  
                  <PasswordInput 
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Password"
                  />
                  
                  <PasswordInput 
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm password"
                  />

                  {/* Roles */}
                  <div>
                    <div className="text-xs text-white/60 mb-2">Select your role</div>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => handleInputChange('role', r.id)}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition ${formData.role === r.id ? "border-red-500/60 bg-red-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                        >
                          <r.icon className="w-4.5 h-4.5" />
                          <span className="text-sm">{r.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 text-[11px] text-white/50">
                      Note: Roles are pre-approved. If your email isn’t pre-approved for the selected role, you’ll be registered as <span className="text-red-300 font-medium">student</span>.
                    </div>
                  </div>

                  {/* Student-specific fields */}
                  {formData.role === "student" && (
                    <>
                      <Input 
                        icon={User2} 
                        type="text" 
                        placeholder="Student ID" 
                        value={formData.studentId} 
                        onChange={(e) => handleInputChange('studentId', e.target.value)} 
                      />
                      
                      <Select 
                        icon={Building}
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </Select>
                      
                      <Select 
                        icon={Calendar}
                        value={formData.yearOfStudy}
                        onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                      >
                        <option value="">Select Year</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(year => (
                          <option key={year} value={year}>Year {year}</option>
                        ))}
                      </Select>
                    </>
                  )}

                  <Input 
                    icon={Phone} 
                    type="tel" 
                    placeholder="Phone number (optional)" 
                    value={formData.phone} 
                    onChange={(e) => handleInputChange('phone', e.target.value)} 
                  />

                  {error && <div className="text-red-400 text-sm">{error}</div>}
                  {message && <div className="text-green-400 text-sm">{message}</div>}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition font-semibold"
                  >
                    {isSubmitting ? "Creating Account..." : "Create account"}
                  </button>
                  <div className="text-center text-sm text-white/60">
                    Already have an account? <button type="button" onClick={()=>setTab("signin")} className="text-white hover:underline">Sign in</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-6 text-[11px] text-white/40 text-center">
              Secure authentication powered by NewtonBotics API
            </div>
          </motion.div>
        </div>
      </div>
  );
} 