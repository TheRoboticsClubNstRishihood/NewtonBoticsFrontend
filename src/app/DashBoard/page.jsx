"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Robot,
  Presentation,
} from "lucide-react";
import { motion } from "framer-motion";
import AboutUs from "../aboutus/page";

// Import actual project images (replace with your actual images)
import image1 from "../assets/image01.png";
import image2 from "../assets/image01.png";
import image3 from "../assets/image01.png";
import heroBackground from "../assets/image01.png";

const ImageSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: image1,
      title: "Autonomous Drone",
      description: "Cutting-edge aerial robotics technology",
    },
    {
      image: image2,
      title: "AI Robotic Arm",
      description: "Precision engineering meets artificial intelligence",
    },
    {
      image: image3,
      title: "Smart Robotics",
      description: "Innovative solutions for complex challenges",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Navbar Component (assumed to be imported) */}
      {/* <Navbar /> */}

      {/* Hero Slideshow Section */}
      <ImageSlideshow />

      {/* Mission and Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-4"
          >
            <Presentation className="w-12 h-12 text-blue-600" />
            Our Mission & Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Empowering students to explore, innovate, and excel in the field of
            robotics by fostering collaboration, creativity, and technical
            expertise through hands-on learning and cutting-edge technology.
          </motion.p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 flex items-center justify-center gap-4">
            <Award className="w-12 h-12 text-yellow-500" />
            Achievements
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Presentation className="w-12 h-12 text-blue-600" />,
                title: "National Robotics Championship",
                description:
                  "Won 1st place in 2023 with our autonomous drone project, showcasing innovation and technical prowess.",
              },
              {
                icon: <Presentation className="w-12 h-12 text-green-600" />,
                title: "AI Innovation Hackathon",
                description:
                  "Secured 2nd place for designing an advanced AI-powered delivery robot, demonstrating problem-solving skills.",
              },
              {
                icon: <Award className="w-12 h-12 text-purple-600" />,
                title: "Best Robotics Club",
                description:
                  "Recognized as the Best Robotics Club by XYZ Organization in 2022, highlighting our commitment to excellence.",
              },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
              >
                {achievement.icon}
                <h3 className="text-xl font-semibold text-gray-700 mt-4">
                  {achievement.title}
                </h3>
                <p className="mt-2 text-gray-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 flex items-center justify-center gap-4">
            <Presentation className="w-12 h-12 text-blue-600" />
            Ongoing & Past Projects
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Autonomous Vehicle",
                description:
                  "A cutting-edge project developing a fully autonomous vehicle capable of navigating complex urban environments using advanced AI and sensor technologies.",
                icon: <Presentation className="w-12 h-12 text-blue-600" />,
              },
              {
                title: "Precision Robotic Arm",
                description:
                  "An innovative robotic arm designed for advanced industrial applications, focusing on precision, efficiency, and seamless human-robot collaboration.",
                icon: <Presentation className="w-12 h-12 text-green-600" />,
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-100 rounded-lg shadow-lg p-6 flex items-start space-x-4"
              >
                {project.icon}
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            {/* <AboutUs/> */}


      {/* Footer */}
     
    </div>
  );
};

export default HomePage;
