"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Calendar,
  Users,
  Rocket,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import Image from "next/image";
import clubData from "../AllDatas/data.json";

const ProjectsPage = () => {
  const { completed, ongoing, upcoming, highlighted } = clubData.projects;
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const controls = useAnimation();

  // Rocket launch animation
  useEffect(() => {
    if (rocketLaunched) {
      controls.start({
        y: -1000,
        opacity: 0,
        transition: { duration: 2, ease: "easeInOut" },
      });
    }
  }, [rocketLaunched, controls]);

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
          Robotics Club Projects
        </h1>
        <p className="text-lg text-blue-100">
          Showcasing our innovation, creativity, and technical expertise through
          impactful projects.
        </p>
      </motion.div>

      {/* Highlighted Projects */}
      <motion.section
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <Star className="mr-3 text-yellow-400" /> Highlighted Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlighted.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {project.name}
              </h3>
              <p className="text-blue-100 mb-4">{project.description}</p>
              <div className="flex items-center text-sm text-blue-100">
                <Users className="w-4 h-4 mr-2" />
                <span>{project.team.join(", ")}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Ongoing Projects */}
      <motion.section
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <Clock className="mr-3 text-cyan-400" /> Ongoing Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ongoing.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {project.name}
              </h3>
              <p className="text-blue-100 mb-4">{project.description}</p>
              <div className="flex items-center text-sm text-blue-100">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Started on {project.startDate}</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-blue-500/20 rounded-full h-2 mt-4">
                <motion.div
                  className="bg-cyan-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Upcoming Projects */}
      <motion.section
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <Rocket className="mr-3 text-purple-400" /> Upcoming Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 hover:border-cyan-400/50 transition-all relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {project.name}
              </h3>
              <p className="text-blue-100 mb-4">{project.description}</p>
              <div className="flex items-center text-sm text-blue-100">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Starts on {project.startDate}</span>
              </div>
              {/* Rocket Launch Animation */}
              <motion.div
                className="absolute bottom-4 right-4"
                animate={controls}
                onClick={() => setRocketLaunched(true)}
              >
                <Rocket className="w-8 h-8 text-purple-400 cursor-pointer" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Completed Projects */}
      <motion.section
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <CheckCircle className="mr-3 text-green-400" /> Completed Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completed.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {project.name}
              </h3>
              <p className="text-blue-100 mb-4">{project.description}</p>
              <div className="flex items-center text-sm text-blue-100 mb-2">
                <Users className="w-4 h-4 mr-2" />
                <span>{project.team.join(", ")}</span>
              </div>
              <div className="flex items-center text-sm text-blue-100">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Completed on {project.date}</span>
              </div>
              {/* Celebration Effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 hover:opacity-20 rounded-xl transition-opacity" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectsPage;
