"use client";
import { motion } from "framer-motion";
import { Box, Brain, Layout } from "lucide-react";
import Image from "next/image";
import autonomousDrone from "../assets/automousdronesystem.jpg";
import industrialAutomation from "../assets/industrialAutonomous.jpg";
import medicalAssistantRobot from "../assets/medicalautonomousSystem.jpg";
import { SplineScene } from "@/components/components/ui/splite.tsx";
import { Card } from "@/components/components/ui/card";
import { Spotlight } from "@/components/components/ui/spotlight";
import { cn } from "@/components/lib/utils";
import { PulseBeams } from "@/components/components/ui/pulse-beams";


const HomePage = () => {

  const beams = [
  {
    path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
    gradientConfig: {
      initial: {
        x1: "0%",
        x2: "0%",
        y1: "80%",
        y2: "100%",
      },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 6.5, cy: 398.5, r: 6 },
      { cx: 269, cy: 220.5, r: 6 }
    ]
  },
  {
    path: "M568 200H841C846.523 200 851 195.523 851 190V40",
    gradientConfig: {
      initial: {
        x1: "0%",
        x2: "0%",
        y1: "80%",
        y2: "100%",
      },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 851, cy: 34, r: 6.5 },
      { cx: 568, cy: 200, r: 6 }
    ]
  },
  {
    path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",
    gradientConfig: {
      initial: {
        x1: "0%",
        x2: "0%",
        y1: "80%",
        y2: "100%",
      },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 142, cy: 427, r: 6.5 },
      { cx: 425.5, cy: 274, r: 6 }
    ]
  },
  {
    path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",
    gradientConfig: {
      initial: {
        x1: "40%",
        x2: "50%",
        y1: "160%",
        y2: "180%",
      },
      animate: {
        x1: "0%",
        x2: "10%",
        y1: "-40%",
        y2: "-20%",
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 770, cy: 427, r: 6.5 },
      { cx: 493, cy: 274, r: 6 }
    ]
  },
  {
    path: "M380 168V17C380 11.4772 384.477 7 390 7H414",
    gradientConfig: {
      initial: {
        x1: "-40%",
        x2: "-10%",
        y1: "0%",
        y2: "20%",
      },
      animate: {
        x1: ["40%", "0%", "0%"],
        x2: ["10%", "0%", "0%"],
        y1: ["0%", "0%", "180%"],
        y2: ["20%", "20%", "200%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 420.5, cy: 6.5, r: 6 },
      { cx: 380, cy: 168, r: 6 }
    ]
  }
];

const gradientColors = {
  start: "#18CCFC",
  middle: "#6344F5",
  end: "#AE48FF"
};


  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div>
        <div className="w-full h-screen bg-black overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-12 md:p-20 relative z-10 flex flex-col justify-center">
              <motion.div
                className="max-w-lg"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 drop-shadow-md">
                  NewtonBotics
                </h1>
                <p className="text-lg md:text-2xl text-white/80 mt-4 mb-8 leading-relaxed">
                  Where Innovation Meets Precision in Robotics Excellence
                </p>

                

                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-4 rounded-full text-lg font-semibold text-white shadow-lg shadow-red-500/40 hover:shadow-red-500/50 transition-all"
                >

                  
                  Discover Our Innovations
                </motion.button>
              </motion.div>
            </div>

            {/* Right content */}
            <div className="flex-1 relative">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>






      {/* Research Areas Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-extrabold text-center mb-16 text-white drop-shadow-md"
          >
            Research Areas
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                icon: <Box className="w-10 h-10 text-white" />,
                title: "Humanoid Robotics",
                description:
                  "Development of human-like robots for complex interactions",
                color: "from-red-500 to-red-600",
              },
              {
                icon: <Brain className="w-10 h-10 text-white" />,
                title: "Neural Networks",
                description:
                  "Advanced AI algorithms for robotic decision making",
                color: "from-red-600 to-red-500",
              },
              {
                icon: <Box className="w-10 h-10 text-white" />,
                title: "Swarm Robotics",
                description: "Multi-robot systems for collaborative tasks",
                color: "from-red-500 to-red-400",
              },
              {
                icon: <Layout className="w-10 h-10 text-white" />,
                title: "Computer Vision",
                description:
                  "Visual perception systems for autonomous navigation",
                color: "from-red-400 to-red-500",
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-8 hover:bg-white/10 transition-all border border-white/10 shadow-lg shadow-red-500/10"
              >
                <div
                  className={`bg-gradient-to-r ${area.color} p-4 rounded-xl w-fit mb-5 shadow-lg`}
                >
                  {area.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {area.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>






      {/* Latest Projects Showcase */}
      <section className="py-24 bg-black">
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
                image: autonomousDrone,
                title: "Autonomous Drone System",
                category: "Aerial Robotics",
                description:
                  "Advanced drone system with computer vision and autonomous navigation capabilities",
              },
              {
                image: medicalAssistantRobot,
                title: "Medical Assistant Robot",
                category: "Healthcare Robotics",
                description:
                  "Robotic system designed to assist in medical procedures and patient care",
              },
              {
                image: industrialAutomation,
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
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 p-6">
                    <span className="text-sm text-red-500 font-medium">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2 font-display text-white">
                      {project.title}
                    </h3>
                    <p className="text-white/80">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Statistics */}
      {/* Lab Statistics */}
      <section className="py-24 relative bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
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
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-10 border border-white/10 shadow-lg shadow-red-500/10"
              >
                <motion.h3
                  className="text-5xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-display"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-white/80 mt-3 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-2xl p-12 text-center backdrop-blur-xl border border-white/10 shadow-lg shadow-red-500/10"
          >
            <h2 className="text-4xl font-extrabold mb-5 font-display text-white drop-shadow-md">
              Stay Connected
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Join our newsletter to receive updates on breakthrough research,
              upcoming events, and innovations in robotics.
            </p>
            <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-white/60"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-white shadow-lg shadow-red-500/30"
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
