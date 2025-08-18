"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import autonomousDrone from "../assets/automousdronesystem.jpg";
import industrialAutomation from "../assets/industrialAutonomous.jpg";
import medicalAssistantRobot from "../assets/medicalautonomousSystem.jpg";
import image01 from "../assets/image01.png";

const mediaItems = [
  { type: "image", src: autonomousDrone, alt: "Autonomous Drone" },
  { type: "image", src: industrialAutomation, alt: "Industrial Automation" },
  { type: "image", src: medicalAssistantRobot, alt: "Medical Assistant Robot" },
  { type: "image", src: image01, alt: "Lab Image 01" },
  { type: "image", src: "/humanoidRobotHealthcare.webp", alt: "Humanoid Robot" },
  { type: "image", src: "/servilancerobot.jpeg", alt: "Service Robot" },
  { type: "image", src: "/bgImageforroboticslab.jpg", alt: "Robotics Lab" },
  { type: "video", src: "/Robot_Eye_Blinking_Survival_Video.mp4", alt: "Robot Eye Video" },
];

// Repeating rotation pattern for a playful, tilted look
const rotations = [-6, 4, -3, 6, -2, 5, -5, 3, -1, 2];

// Pattern of grid spans to create a collage feel on larger screens
const spanClasses = [
  "",
  "md:col-span-2",
  "md:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "",
  "md:col-span-2",
  "",
  "md:row-span-2",
];

export default function GalleryClient() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f16] via-[#0b0f16] to-black" />
        <div className="relative container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500">
            Our Gallery
          </h1>
          <p className="mt-4 text-white/75 max-w-2xl mx-auto">
            Unfiltered moments from our builds, events, and club fun.
          </p>
        </div>
      </header>

      {/* Collage Grid */}
      <main className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 auto-rows-[8rem] sm:auto-rows-[10rem] md:auto-rows-[12rem] lg:auto-rows-[14rem]">
          {mediaItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setActive({ ...item, index })}
              className={`relative group bg-white rounded-xl shadow-2xl shadow-black/50 p-1 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${spanClasses[index % spanClasses.length]}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              style={{ rotate: `${rotations[index % rotations.length]}deg` }}
            >
              <div className="relative w-full h-full min-h-[8rem] sm:min-h-[10rem] md:min-h-[12rem] lg:min-h-[14rem] rounded-lg overflow-hidden">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                    priority={index < 4}
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                )}
              </div>
              {/* subtle tape corners for playful look */}
              <div className="pointer-events-none absolute -top-1 -left-1 w-8 h-8 bg-white/70 rotate-12 rounded-sm opacity-70" />
              <div className="pointer-events-none absolute -bottom-1 -right-1 w-8 h-8 bg-white/70 -rotate-12 rounded-sm opacity-70" />
            </motion.button>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white text-xl"
                aria-label="Close"
              >
                ×
              </button>
              <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
                {active.type === "image" ? (
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                ) : (
                  <video
                    src={active.src}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                  />
                )}
              </div>
              <div className="mt-3 text-center text-white/80 text-sm">{active.alt}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 