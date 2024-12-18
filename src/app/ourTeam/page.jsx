"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Award, Star, Filter, Search } from "lucide-react";
import Navbar from "../components/navbar";
import clubData from "../AllDatas/data.json";
import image1 from "../assets/image01.png";

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
    ...clubData.coreMembersPlaceholders.map((name) => ({
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
    <div className="text-black min-h-screen bg-gray-50">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-400 text-white py-16">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Robotics Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Innovators, Creators, Problem Solvers
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Core Member">Core Member</option>
                <option value="Project Manager">Project Manager</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Users className="w-12 h-12 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">
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
                className="bg-white p-6 rounded-lg shadow-md text-center"
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
                <h3 className="text-xl font-semibold text-gray-800">
                  {leader.name}
                </h3>
                <p className="text-gray-600">{leader.role}</p>
                {leader.expertise && (
                  <p className="text-sm text-gray-500 mt-2">
                    {leader.expertise}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Members Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Star className="w-12 h-12 text-green-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">
              Core Members
              <span className="text-lg text-gray-600 ml-4">
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
                className="bg-gray-100 p-4 rounded-lg text-center"
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
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">
                  {member.role || "Core Member"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Statistics */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Award className="w-12 h-12 text-yellow-500 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">
              Team Statistics
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-blue-600">
                {clubData.leadership.length}
              </h3>
              <p className="text-gray-600">Leadership Positions</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-green-600">
                {clubData.coreMemberCount}
              </h3>
              <p className="text-gray-600">Core Members</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-purple-600">
                {clubData.workshops.length}
              </h3>
              <p className="text-gray-600">Workshops Conducted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <p>© 2024 Robotics Club. All rights reserved.</p>
          <div className="mt-4">
            <p>Join Our Team: {clubData.contactInfo.email}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeamPage;
