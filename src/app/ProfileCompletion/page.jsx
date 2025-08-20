"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { User2, Mail, Phone, Building, Calendar, Lock, Eye, EyeOff, Save, AlertCircle, CheckCircle } from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";

function Input({ label, icon: Icon, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm text-white/80">{label}</span>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />}
        <input 
          {...props} 
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white placeholder-white/50`} 
        />
      </div>
    </label>
  );
}

function Select({ label, icon: Icon, children, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm text-white/80">{label}</span>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />}
        <select
          {...props}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white`}
        >
          {children}
        </select>
      </div>
    </label>
  );
}

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Robotics Engineering",
  "Artificial Intelligence",
  "Data Science",
  "Other"
];

export default function ProfileCompletionPage() {
  const { user, updateProfile, changePassword } = useAuth();
  
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    department: "",
    yearOfStudy: "",
    studentId: "",
    profileImageUrl: "",
    bio: "",
    skills: []
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        department: user.department || "",
        yearOfStudy: user.yearOfStudy || "",
        studentId: user.studentId || "",
        profileImageUrl: user.profileImageUrl || "",
        bio: user.bio || "",
        skills: user.skills || []
      });
    }
  }, [user]);

  const handleProfileInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setProfileError("");
    setProfileMessage("");
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    setPasswordError("");
    setPasswordMessage("");
  };

  const handleSkillInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newSkill = e.target.value.trim();
      if (!profileData.skills.includes(newSkill)) {
        setProfileData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
      }
      e.target.value = '';
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const isValidPassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileError("");
    setProfileMessage("");

    try {
      // Build a payload with only provided (non-empty) fields
      const payload = {};
      const trimOrNull = (v) => (typeof v === 'string' ? v.trim() : v);
      const stringFields = ['firstName','lastName','studentId','department','phone','profileImageUrl','bio'];
      stringFields.forEach((key) => {
        const val = trimOrNull(profileData[key]);
        if (val !== undefined && val !== null && val !== '') payload[key] = val;
      });
      if (profileData.yearOfStudy !== '' && !Number.isNaN(parseInt(profileData.yearOfStudy))) {
        const y = parseInt(profileData.yearOfStudy);
        if (y >= 1 && y <= 8) payload.yearOfStudy = y;
      }
      if (Array.isArray(profileData.skills) && profileData.skills.length > 0) {
        payload.skills = profileData.skills;
      }

      const result = await updateProfile(payload);
      
      if (result.success) {
        setProfileMessage("Profile updated successfully!");
      } else {
        setProfileError(result.error);
      }
    } catch (error) {
      setProfileError(error.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (!isValidPassword(passwordData.newPassword)) {
      setPasswordError("Password must be at least 8 characters with uppercase, lowercase, number, and special character");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    setPasswordError("");
    setPasswordMessage("");

    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      
      if (result.success) {
        setPasswordMessage("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        setPasswordError(result.error);
      }
    } catch (error) {
      setPasswordError(error.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-[#070b12] text-white overflow-hidden">
        {/* Background visuals */}
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-10 w-[36rem] h-[36rem] rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute bottom-[-8rem] right-[-6rem] w-[36rem] h-[36rem] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Profile Settings</h1>
              <p className="text-white/70">Manage your account information and preferences</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Profile Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/[0.06] rounded-3xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <User2 className="w-5 h-5" />
                  Profile Information
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="First Name"
                      icon={User2}
                      type="text"
                      placeholder="First name"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileInputChange('firstName', e.target.value)}
                    />
                    <Input 
                      label="Last Name"
                      icon={User2}
                      type="text"
                      placeholder="Last name"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileInputChange('lastName', e.target.value)}
                    />
                  </div>

                  <Input 
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={user.email}
                    disabled
                    className="opacity-60 cursor-not-allowed"
                  />

                  <Input 
                    label="Phone Number"
                    icon={Phone}
                    type="tel"
                    placeholder="Phone number"
                    value={profileData.phone}
                    onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                  />

                  {/* Optional: Student-specific identifiers */}
                  <Input
                    label="Student ID"
                    icon={User2}
                    type="text"
                    placeholder="Student ID (optional)"
                    value={profileData.studentId}
                    onChange={(e) => handleProfileInputChange('studentId', e.target.value)}
                  />

                  {user.role === "student" && (
                    <>
                      <Select 
                        label="Department"
                        icon={Building}
                        value={profileData.department}
                        onChange={(e) => handleProfileInputChange('department', e.target.value)}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </Select>

                      <Select 
                        label="Year of Study"
                        icon={Calendar}
                        value={profileData.yearOfStudy}
                        onChange={(e) => handleProfileInputChange('yearOfStudy', e.target.value)}
                      >
                        <option value="">Select Year</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(year => (
                          <option key={year} value={year}>Year {year}</option>
                        ))}
                      </Select>
                    </>
                  )}

                  <div>
                    <label className="block mb-2 text-sm text-white/80">Bio</label>
                    <textarea
                      placeholder="Tell us about yourself..."
                      value={profileData.bio}
                      onChange={(e) => handleProfileInputChange('bio', e.target.value)}
                      className="w-full pl-4 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white placeholder-white/50 resize-none"
                      rows={3}
                    />
                  </div>

                  <Input
                    label="Profile Image URL"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={profileData.profileImageUrl}
                    onChange={(e) => handleProfileInputChange('profileImageUrl', e.target.value)}
                  />

                  <div>
                    <label className="block mb-2 text-sm text-white/80">Skills</label>
                    <input
                      type="text"
                      placeholder="Press Enter to add a skill"
                      onKeyDown={handleSkillInput}
                      className="w-full pl-4 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white placeholder-white/50"
                    />
                    {profileData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 hover:text-red-100 transition"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {profileError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {profileError}
                    </div>
                  )}

                  {profileMessage && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      {profileMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition font-semibold flex items-center justify-center gap-2"
                  >
                    {isUpdatingProfile ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Profile
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Change Password */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/[0.06] rounded-3xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Change Password
                </h2>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="relative">
                    <Input 
                      label="Current Password"
                      icon={Lock}
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Current password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Input 
                      label="New Password"
                      icon={Lock}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Input 
                      label="Confirm New Password"
                      icon={Lock}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="text-xs text-white/60">
                    Password must contain at least 8 characters with uppercase, lowercase, number, and special character.
                  </div>

                  {passwordError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {passwordError}
                    </div>
                  )}

                  {passwordMessage && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      {passwordMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition font-semibold flex items-center justify-center gap-2"
                  >
                    {isChangingPassword ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Changing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Change Password
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
