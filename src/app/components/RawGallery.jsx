"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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

const rotations = [-6, 4, -2, 5, -4, 3, -5, 2, -3, 6, -1, 4];

export default function RawGallery() {
  return (
    <div className="container mx-auto px-6">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">And we have a lot of fun!</h2>
        <Link href="/Gallery" className="hidden sm:inline-block">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-white/90 hover:bg-white/15"
          >
            Explore more →
          </motion.span>
        </Link>
      </div>
      <div className="relative mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {mediaItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.03 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              className="relative bg-white rounded-xl shadow-2xl shadow-black/50 p-1 rotate-0"
              style={{ rotate: `${rotations[idx % rotations.length]}deg` }}
            >
              <div className="relative w-full h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden rounded-lg">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                    priority={idx < 4}
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center sm:hidden">
        <Link href="/Gallery" className="inline-block px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-white/90 hover:bg-white/15">
          Explore more →
        </Link>
      </div>
    </div>
  );
} 