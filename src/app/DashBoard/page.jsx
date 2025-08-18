"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Brain, Layout, Rocket, Users, Award, Calendar, ArrowRight, Play, Star, Globe, Cpu, Wifi, Camera, Shield } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import autonomousDrone from "../assets/automousdronesystem.jpg";
import industrialAutomation from "../assets/industrialAutonomous.jpg";
import medicalAssistantRobot from "../assets/medicalautonomousSystem.jpg";
import { SplineScene } from "@/components/components/ui/splite.tsx";
import { Spotlight } from "@/components/components/ui/spotlight";
import clubData from "../AllDatas/data.json";
import Link from "next/link";
import RawGallery from "../components/RawGallery";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Only run initial animations once
    if (!hasAnimated) {
      setHasAnimated(true);
    }
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [hasAnimated]);

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

  const achievements = [
    { number: "50+", label: "Research Projects", icon: <Rocket className="w-8 h-8" /> },
    { number: "200+", label: "Publications", icon: <Award className="w-8 h-8" /> },
    { number: "30+", label: "Lab Members", icon: <Users className="w-8 h-8" /> },
    { number: "15+", label: "Industry Partners", icon: <Globe className="w-8 h-8" /> },
    { number: "25+", label: "Awards Won", icon: <Star className="w-8 h-8" /> },
    { number: "100+", label: "Workshops Conducted", icon: <Calendar className="w-8 h-8" /> }
  ];

  const features = [
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "Advanced AI Integration",
      description: "State-of-the-art machine learning algorithms powering our robotic systems"
    },
    {
      icon: <Camera className="w-12 h-12" />,
      title: "Computer Vision",
      description: "Real-time image processing and object recognition capabilities"
    },
    {
      icon: <Wifi className="w-12 h-12" />,
      title: "IoT Connectivity",
      description: "Seamless integration with IoT devices and cloud platforms"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Safety Systems",
      description: "Advanced safety protocols and fail-safe mechanisms"
    }
  ];

  const upcomingEvents = [
    {
      title: "Robotics Workshop",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      location: "Lab 301",
      type: "Workshop"
    },
    {
      title: "AI in Robotics Seminar",
      date: "Dec 20, 2024",
      time: "2:00 PM",
      location: "Auditorium",
      type: "Seminar"
    },
    {
      title: "Project Showcase",
      date: "Dec 25, 2024",
      time: "11:00 AM",
      location: "Main Hall",
      type: "Exhibition"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Hero Section with Enhanced Animations */}
      <div className="relative min-h-screen lg:h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-4 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Subtle Red Texture Elements */}
          <motion.div
            className="absolute top-40 right-4 sm:right-40 w-32 h-32 sm:w-48 sm:h-48 bg-red-500/5 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-40 left-4 sm:left-40 w-24 h-24 sm:w-32 sm:h-32 bg-red-500/8 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row h-full min-h-screen">
          {/* Left content */}
          <div className="flex-1 p-4 sm:p-8 md:p-12 lg:p-20 relative z-10 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
              initial={hasAnimated ? false : { opacity: 0, x: -100 }}
              animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-4"
              >
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white/80 font-medium text-sm sm:text-base">Innovation Hub</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 drop-shadow-2xl leading-tight">
                NewtonBotics
              </h1>
              
              <motion.p
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-4 sm:mt-6 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Where Innovation Meets Precision in Robotics Excellence. 
                <span className="text-red-400 font-semibold"> Building the future, one robot at a time.</span>
              </motion.p>

              <motion.div
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 group"
                >
                  Discover Our Innovations
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12"
              >
                {achievements.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-red-400">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right content - 3D Scene (Desktop only) */}
          <div className="hidden lg:block flex-1 relative order-1 lg:order-2 h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={hasAnimated ? false : { opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : { opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Sticky Robot Background */}
      <div className="lg:hidden fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-10">
        {/* Subtle Red Texture Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-red-500/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-red-500/4 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white">
              Cutting-Edge Technology
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
              Our lab is equipped with the latest robotics technology and AI systems, 
              enabling students to work on groundbreaking projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-red-500/20 transition-all group"
              >
                <div className="bg-gradient-to-br from-white/10 to-red-500/10 p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-6 shadow-lg group-hover:shadow-2xl transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-red-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-10">
        {/* Subtle Red Texture Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-4 sm:left-20 w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-red-500/4 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white drop-shadow-md"
          >
            Research Areas
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {[
              {
                icon: <Box className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                title: "Humanoid Robotics",
                description: "Development of human-like robots for complex interactions",
                projects: "12 Active Projects"
              },
              {
                icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                title: "Neural Networks",
                description: "Advanced AI algorithms for robotic decision making",
                projects: "8 Active Projects"
              },
              {
                icon: <Box className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                title: "Swarm Robotics",
                description: "Multi-robot systems for collaborative tasks",
                projects: "6 Active Projects"
              },
              {
                icon: <Layout className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                title: "Computer Vision",
                description: "Visual perception systems for autonomous navigation",
                projects: "15 Active Projects"
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
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all border border-white/10 hover:border-red-500/20 shadow-lg shadow-white/10 group"
              >
                <div
                  className="bg-gradient-to-br from-white/10 to-red-500/10 p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-5 shadow-lg group-hover:shadow-2xl transition-all"
                >
                  {area.icon}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                  {area.description}
                </p>
                <div className="text-xs sm:text-sm text-red-400 font-medium">
                  {area.projects}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-black">
        {/* Subtle Red Texture Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 right-4 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-red-500/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5"></div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white">
              Our Impact
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
              Numbers that speak for our commitment to excellence in robotics research and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {achievements.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-lg shadow-white/10 text-center group hover:bg-white/10 hover:border-red-500/20 transition-all"
              >
                <div className="bg-gradient-to-br from-white/10 to-red-500/10 p-3 sm:p-4 rounded-xl w-fit mx-auto mb-3 sm:mb-4 shadow-lg group-hover:shadow-2xl transition-all">
                  {stat.icon}
                </div>
                <motion.h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400 font-display mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-xs sm:text-sm text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Subtle Red Texture Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/3 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-red-500/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white">
              Upcoming Events
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
              Join us for exciting workshops, seminars, and exhibitions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-lg shadow-white/10 group hover:bg-white/10 hover:border-red-500/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-white/20 to-red-500/20 text-white">
                    {event.type}
                  </span>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">📅</span>
                    <span className="text-sm sm:text-base">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">🕒</span>
                    <span className="text-sm sm:text-base">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">📍</span>
                    <span className="text-sm sm:text-base">{event.location}</span>
                  </div>
                </div>
                <Link href="/Events">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all text-sm sm:text-base"
                  >
                    Register Now
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* View All Events Button */}
      <section className="relative z-20 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-8 sm:py-12"
        >
          <Link href="/Events">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 mx-auto group min-w-fit text-sm sm:text-base"
            >
              View All Events
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Raw Media Collage Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#0b0f16]">
        <RawGallery />
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black relative overflow-hidden">
        {/* Subtle Red Texture Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-red-500/2 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center backdrop-blur-xl border border-white/10 shadow-2xl shadow-white/10 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-20 h-20 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-red-500/10 rounded-full blur-xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white">
                Stay Connected
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
                Join our newsletter to receive updates on breakthrough research,
                upcoming events, and innovations in robotics. Be the first to know about our latest projects!
              </p>
              <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 sm:gap-4 px-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/60 backdrop-blur-lg text-sm sm:text-base"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 group text-sm sm:text-base"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
              <p className="text-xs sm:text-sm text-white/60 mt-4">
                🔒 We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;
