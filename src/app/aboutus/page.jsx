"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  Trophy,
  Wrench,
  Star,
  Calendar,
  BookOpen,
} from "lucide-react";
import Navbar from "../components/navbar";
import clubData from "../AllDatas/data.json";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gray-900 backdrop-blur-sm" />
        <div className="container mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600"
          >
            About Robotics Club
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80"
          >
            Innovating the future through cutting-edge robotics and technology
          </motion.p>
        </div>
      </motion.section>

      {/* Lab Details Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Building className="w-12 h-12 text-red-500 mr-4" />
            <h2 className="text-3xl font-bold font-display">
              Our Robotics Lab
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
            >
              <h3 className="text-2xl font-semibold mb-4 font-display">
                Location
              </h3>
              <p className="text-white/80">
                Located on the Third Floor of the Academic Block at Rishihood
                University
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
            >
              <h3 className="text-2xl font-semibold mb-4 font-display">
                Key Equipment
              </h3>
              <ul className="list-disc list-inside text-white/80">
                {clubData.labDetails.equipment.map((item, index) => (
                  <li key={index}>
                    {typeof item === "string" ? item : item.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Users className="w-12 h-12 text-red-500 mr-4" />
            <h2 className="text-3xl font-bold font-display">Club Leadership</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {clubData.leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10 text-center"
              >
                <h3 className="text-xl font-semibold font-display">
                  {leader.name}
                </h3>
                <p className="text-white/80">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops and Achievements */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Workshops */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center mb-8">
                <Wrench className="w-12 h-12 text-red-500 mr-4" />
                <h2 className="text-3xl font-bold font-display">
                  Our Workshops
                </h2>
              </div>
              <div className="space-y-4">
                {clubData.workshopss.map((workshop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white/5 backdrop-blur-lg p-4 rounded-lg border border-white/10"
                  >
                    <h3 className="text-xl font-semibold font-display">
                      {workshop.name}
                    </h3>
                    <p className="text-white/80">{workshop.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center mb-8">
                <Trophy className="w-12 h-12 text-red-500 mr-4" />
                <h2 className="text-3xl font-bold font-display">
                  Achievements
                </h2>
              </div>
              <div className="space-y-4">
                {clubData.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white/5 backdrop-blur-lg p-4 rounded-lg border border-white/10 flex items-center"
                  >
                    <Star className="w-6 h-6 text-red-500 mr-4" />
                    <p className="text-white/80">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Section: Guest Lectures */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Calendar className="w-12 h-12 text-red-500 mr-4" />
            <h2 className="text-3xl font-bold font-display">Guest Lectures</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {clubData.guestLectures.map((lecture, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10"
              >
                <h3 className="text-xl font-semibold font-display">
                  {lecture.title}
                </h3>
                <p className="text-white/80">{lecture.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
