"use client";
import { motion } from "framer-motion";
import { Box, Brain, Layout } from "lucide-react";
import Image from "next/image";
import bgImage from "../assets/image01.png";
import autonomousDrone from "../assets/automousdronesystem.jpg";
import industrialAutomation from "../assets/industrialAutonomous.jpg";
import medicalAssistantRobot from "../assets/medicalautonomousSystem.jpg";

const HomePage = () => {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Updated gradient animation with new brand colors
  const gradientAnimation = {
    background: [
      "linear-gradient(45deg, #1a365d, #2563eb)",
      "linear-gradient(45deg, #2563eb, #1a365d)",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white font-body">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Newtonbotics
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
              Where Innovation Meets Precision in Robotics Excellence
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full text-lg font-semibold text-white shadow-lg shadow-blue-500/30"
            >
              Discover Our Innovations
            </motion.button>
          </motion.div>

          {/* Updated Robot Animation */}
          <motion.div
            className="md:w-1/2 mt-12 md:mt-0 relative"
            animate={floatingAnimation}
          >
            <div className="relative w-full h-[400px]">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
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
                  fill="#2563eb"
                  className="stroke-2 stroke-cyan-200"
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
                  fill="#7dd3fc"
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
                  fill="#7dd3fc"
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
                  fill="#3b82f6"
                  className="stroke-2 stroke-cyan-200"
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
                  fill="#3b82f6"
                  className="stroke-2 stroke-cyan-200"
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
                  fill="#3b82f6"
                  className="stroke-2 stroke-cyan-200"
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
      </motion.section>

      {/* Research Areas Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 font-display"
          >
            Research Areas
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Box className="w-8 h-8" />,
                title: "Humanoid Robotics",
                description:
                  "Development of human-like robots for complex interactions",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Neural Networks",
                description:
                  "Advanced AI algorithms for robotic decision making",
                color: "from-cyan-500 to-blue-400",
              },
              {
                icon: <Box className="w-8 h-8" />,
                title: "Swarm Robotics",
                description: "Multi-robot systems for collaborative tasks",
                color: "from-blue-400 to-cyan-400",
              },
              {
                icon: <Layout className="w-8 h-8" />,
                title: "Computer Vision",
                description:
                  "Visual perception systems for autonomous navigation",
                color: "from-cyan-400 to-blue-500",
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all border border-blue-500/20"
              >
                <div
                  className={`bg-gradient-to-r ${area.color} p-3 rounded-lg w-fit mb-4`}
                >
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">
                  {area.title}
                </h3>
                <p className="text-blue-100">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects Showcase */}
      {/* Latest Projects Showcase */}
      <section className="py-24 bg-gradient-to-b from-blue-900/50 to-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 font-display"
          >
            Latest Projects
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: autonomousDrone, // Pass the imported image directly
                title: "Autonomous Drone System",
                category: "Aerial Robotics",
                description:
                  "Advanced drone system with computer vision and autonomous navigation capabilities",
              },
              {
                image: medicalAssistantRobot, // Pass the imported image directly
                title: "Medical Assistant Robot",
                category: "Healthcare Robotics",
                description:
                  "Robotic system designed to assist in medical procedures and patient care",
              },
              {
                image: industrialAutomation, // Pass the imported image directly
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
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg border border-blue-500/20"
              >
                <Image
                  src={project.image} // Use the image directly
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 p-6">
                    <span className="text-sm text-cyan-400 font-medium">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2 font-display">
                      {project.title}
                    </h3>
                    <p className="text-blue-100">{project.description}</p>
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
                className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-blue-500/20"
              >
                <motion.h3
                  className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-display"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-blue-100 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl p-12 text-center backdrop-blur-xl border border-blue-500/20"
          >
            <h2 className="text-3xl font-bold mb-4 font-display">
              Stay Connected
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our newsletter to receive updates on breakthrough research,
              upcoming events, and innovations in robotics.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-blue-500/20 focus:outline-none focus:border-cyan-500 text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold shadow-lg shadow-blue-500/30"
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
