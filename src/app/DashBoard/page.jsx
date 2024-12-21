"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Robot,
  Cpu,
  Brain,
  Grid,
  Circle,
  Flask,
  Users,
  Calendar,
  BookOpen,
  Layout,
  Box,
} from "lucide-react";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Background gradient animation
  const gradientAnimation = {
    background: [
      "linear-gradient(45deg, #2a1f4c, #462a84)",
      "linear-gradient(45deg, #462a84, #2a1f4c)",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      {/* Hero Section - Kept from previous version but enhanced */}
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        animate={gradientAnimation}
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

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* Hero Text */}
          <motion.div
            className="md:w-1/2 z-10"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Next-Gen Robotics Lab
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Pioneering the future of robotics and artificial intelligence
              through innovation and research
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold text-white"
            >
              Explore Our Projects
            </motion.button>
          </motion.div>

          {/* Robot Animation */}
          <motion.div
            className="md:w-1/2 mt-12 md:mt-0 relative"
            animate={floatingAnimation}
          >
            <div className="relative w-full h-[400px]">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Robot Head */}
                <motion.rect
                  x="60"
                  y="40"
                  width="80"
                  height="70"
                  rx="10"
                  fill="#6366F1"
                  className="stroke-2 stroke-white"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Robot Eyes */}
                <motion.circle
                  cx="85"
                  cy="70"
                  r="10"
                  fill="#fff"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <motion.circle
                  cx="115"
                  cy="70"
                  r="10"
                  fill="#fff"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                {/* Robot Body */}
                <motion.rect
                  x="70"
                  y="120"
                  width="60"
                  height="50"
                  fill="#818CF8"
                  className="stroke-2 stroke-white"
                  animate={{
                    y: [120, 125, 120],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                {/* Robot Arms */}
                <motion.path
                  d="M70 130 L40 150 L45 160 L70 140"
                  fill="#818CF8"
                  className="stroke-2 stroke-white"
                  animate={{
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <motion.path
                  d="M130 130 L160 150 L155 160 L130 140"
                  fill="#818CF8"
                  className="stroke-2 stroke-white"
                  animate={{
                    rotate: [5, -5, 5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.svg>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Circle className="w-8 h-8 text-white/50" />
        </motion.div> */}
      </motion.section>

      {/* Research Areas Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="border border-white/5" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Research Areas
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <p className="w-8 h-8" />,
                title: "Humanoid Robotics",
                description:
                  "Development of human-like robots for complex interactions",
                color: "from-blue-500 to-purple-500",
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Neural Networks",
                description:
                  "Advanced AI algorithms for robotic decision making",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Box className="w-8 h-8" />,
                title: "Swarm Robotics",
                description: "Multi-robot systems for collaborative tasks",
                color: "from-pink-500 to-red-500",
              },
              {
                icon: <Layout className="w-8 h-8" />,
                title: "Computer Vision",
                description:
                  "Visual perception systems for autonomous navigation",
                color: "from-red-500 to-orange-500",
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div
                  className={`bg-gradient-to-r ${area.color} p-3 rounded-lg w-fit mb-4`}
                >
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                <p className="text-gray-400">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects Showcase */}
      <section className="py-24 bg-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Latest Projects
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "/api/placeholder/600/400",
                title: "Autonomous Drone System",
                category: "Aerial Robotics",
                description:
                  "Advanced drone system with computer vision and autonomous navigation capabilities",
              },
              {
                image: "/api/placeholder/600/400",
                title: "Medical Assistant Robot",
                category: "Healthcare Robotics",
                description:
                  "Robotic system designed to assist in medical procedures and patient care",
              },
              {
                image: "/api/placeholder/600/400",
                title: "Industrial Automation",
                category: "Manufacturing",
                description:
                  "Smart manufacturing system with AI-powered quality control",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 p-6">
                    <span className="text-sm text-purple-400">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Statistics */}
      <section className="py-24 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="container mx-auto px-6"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Research Projects" },
              { number: "200+", label: "Publications" },
              { number: "30+", label: "Lab Members" },
              { number: "15+", label: "Industry Partners" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-8"
              >
                <motion.h3
                  className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Upcoming Events
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                date: "Mar 15, 2024",
                title: "Robotics Workshop",
                description: "Hands-on workshop on building autonomous robots",
                time: "10:00 AM - 4:00 PM",
                location: "Main Lab",
              },
              {
                date: "Mar 20, 2024",
                title: "Research Symposium",
                description: "Annual robotics research presentation day",
                time: "9:00 AM - 5:00 PM",
                location: "Conference Hall",
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 rounded-lg p-3">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-purple-400">{event.date}</span>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-400 mb-4">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-12 text-center backdrop-blur-xl"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates on research
              projects, events, and breakthroughs in robotics.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
