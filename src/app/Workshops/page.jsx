"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Video, Star, Rocket } from "lucide-react";
import Image from "next/image";
import clubData from "../AllDatas/data.json";

const WorkshopsPage = () => {
  const { past, upcoming } = clubData.workshops;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white font-body py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          Robotics Club Workshops
        </h1>
        <p className="text-lg text-blue-100">
          Empowering students with hands-on learning and cutting-edge
          technology.
        </p>
      </motion.div>

      {/* Past Workshops */}
      <motion.section
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <Star className="mr-3 text-yellow-400" /> Past Workshops
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {past.map((workshop) => (
            <motion.div
              key={workshop.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={workshop.image}
                  alt={workshop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {workshop.name}
              </h3>
              <p className="text-blue-100 mb-4">{workshop.description}</p>
              <div className="flex items-center text-sm text-blue-100 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Date: {workshop.date}</span>
              </div>
              <div className="flex items-center text-sm text-blue-100 mb-2">
                <Users className="w-4 h-4 mr-2" />
                <span>Students Joined: {workshop.studentsJoined}</span>
              </div>
              <div className="flex items-center text-sm text-blue-100 mb-2">
                <Star className="w-4 h-4 mr-2" />
                <span>Impact: {workshop.impact}</span>
              </div>
              <div className="flex items-center text-sm text-blue-100 mb-4">
                <Video className="w-4 h-4 mr-2" />
                <a
                  href={workshop.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-600"
                >
                  Watch Video
                </a>
              </div>
              <div className="text-sm text-blue-100">
                <span className="font-semibold">Special Thanks:</span>{" "}
                {workshop.specialThanks.join(", ")}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Upcoming Workshops */}
      <motion.section
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <Rocket className="mr-3 text-purple-400" /> Upcoming Workshops
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((workshop) => (
            <motion.div
              key={workshop.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={workshop.image}
                  alt={workshop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {workshop.name}
              </h3>
              <p className="text-blue-100 mb-4">{workshop.description}</p>
              <div className="flex items-center text-sm text-blue-100 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Date: {workshop.date}</span>
              </div>
              <a
                href={workshop.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                Register Now
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default WorkshopsPage;
