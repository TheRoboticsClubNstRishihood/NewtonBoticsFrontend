"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Video, Star, Rocket } from "lucide-react";
import Image from "next/image";
import clubData from "../AllDatas/data.json";

const WorkshopsPage = () => {
  const { past, upcoming } = clubData.workshops;

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          Robotics Club Workshops
        </h1>
        <p className="text-lg text-white/80">
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
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <Star className="mr-3 text-red-500" /> Past Workshops
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {past.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-red-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
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
              <p className="text-white/80 mb-4">{workshop.description}</p>
              <div className="flex items-center text-sm text-white/80 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Date: {workshop.date}</span>
              </div>
              <div className="flex items-center text-sm text-white/80 mb-2">
                <Users className="w-4 h-4 mr-2" />
                <span>Students Joined: {workshop.studentsJoined}</span>
              </div>
              <div className="flex items-center text-sm text-white/80 mb-2">
                <Star className="w-4 h-4 mr-2" />
                <span>Impact: {workshop.impact}</span>
              </div>
              <div className="flex items-center text-sm text-white/80 mb-4">
                <Video className="w-4 h-4 mr-2" />
                <a
                  href={workshop.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600"
                >
                  Watch Video
                </a>
              </div>
              <div className="text-sm text-white/80">
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
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <Rocket className="mr-3 text-red-500" /> Upcoming Workshops
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-red-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
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
              <p className="text-white/80 mb-4">{workshop.description}</p>
              <div className="flex items-center text-sm text-white/80 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Date: {workshop.date}</span>
              </div>
              <a
                href={workshop.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-red-600 hover:to-red-500 transition-all"
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
