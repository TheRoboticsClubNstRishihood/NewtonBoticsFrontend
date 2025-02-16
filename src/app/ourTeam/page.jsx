"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Award, Star, Filter, Search } from "lucide-react";
import Navbar from "../components/navbar";
import clubData from "../AllDatas/data.json";

// Placeholder function for team member images
const getPlaceholderImage = (index) => {
  // In production, replace with actual image import or dynamic image generation
  return `/api/placeholder/400/400?text=Member+${index + 1}`;
};

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  // Combine leadership and core members
  const allMembers = [
    ...clubData.leadership,
    ...clubData.coreMembers.map((name) => ({
      name,
      role: "Core Member",
    })),
  ];

  // Filter members based on search and role
  const filteredMembers = allMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRole === "All" ||
        member.role.toLowerCase().includes(filterRole.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white font-body">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
          {[...Array(64)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 4,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
          >
            Our Robotics Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 font-light"
          >
            Innovators, Creators, Problem Solvers
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder:text-blue-100"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-100" />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white"
              >
                <option value="All">All Roles</option>
                <option value="Club Mentor">Club Mentor</option>
                <option value="Club President">Club President</option>
                <option value="Vice President">Vice President</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Inventory Manager">Inventory Manager</option>
                <option value="Core Member">Core Member</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Users className="w-12 h-12 text-blue-400 mr-4" />
            <h2 className="text-3xl font-bold text-white font-display">
              Leadership Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {clubData.leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-blue-500/20"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={getPlaceholderImage(index)}
                    alt={leader.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white font-display">
                  {leader.name}
                </h3>
                <p className="text-blue-100">{leader.role}</p>
                {leader.expertise && (
                  <p className="text-sm text-blue-200 mt-2">
                    {leader.expertise}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Members Section */}
      <section className="py-24 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Star className="w-12 h-12 text-cyan-400 mr-4" />
            <h2 className="text-3xl font-bold text-white font-display">
              Core Members
              <span className="text-lg text-blue-100 ml-4">
                ({filteredMembers.length} Total)
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-blue-500/20"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={getPlaceholderImage(index)}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-white font-display">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-100">
                  {member.role || "Core Member"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Statistics */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Award className="w-12 h-12 text-yellow-400 mr-4" />
            <h2 className="text-3xl font-bold text-white font-display">
              Team Statistics
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-blue-500/20"
            >
              <h3 className="text-4xl font-bold text-blue-400 font-display">
                {clubData.leadership.length}
              </h3>
              <p className="text-blue-100">Leadership Positions</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-blue-500/20"
            >
              <h3 className="text-4xl font-bold text-cyan-400 font-display">
                {clubData.coreMembers.length}
              </h3>
              <p className="text-blue-100">Core Members</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-blue-500/20"
            >
              <h3 className="text-4xl font-bold text-purple-400 font-display">
                {clubData.workshops.length}
              </h3>
              <p className="text-blue-100">Workshops Conducted</p>
            </motion.div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default TeamPage;
