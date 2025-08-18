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
  Rocket,
} from "lucide-react";
// Navbar is provided by root layout
import clubData from "../AllDatas/data.json";

const AboutUs = () => {
  // Derived data for About content
  const establishedYear = clubData?.clubInfo?.founded;
  const founders = clubData?.clubInfo?.foundedBy || [];
  const mission = clubData?.clubInfo?.mission;
  const vision = clubData?.clubInfo?.vision;
  const foundersData = clubData?.founders || [];

  const completed = clubData?.projects?.completed || [];
  const ongoing = clubData?.projects?.ongoing || [];
  const upcomingProjects = clubData?.projects?.upcoming || [];
  const highlighted = clubData?.projects?.highlighted || [];
  const allProjects = [...completed, ...ongoing, ...upcomingProjects, ...highlighted];
  const projectsShowcased = new Set(allProjects.map((p) => p.id)).size || allProjects.length;

  const workshopsCount = (clubData?.workshops?.past?.length || 0) + (clubData?.workshops?.upcoming?.length || 0);
  const eventsUpcoming = clubData?.events?.upcoming?.length || 0;
  const achievementsCount = clubData?.achievements?.length || 0;
  const coreMembers = clubData?.coreMemberCount || clubData?.coreMembers?.length || 0;

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">

      {/* Header Section (simple like other pages) */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          About NewtonBotics
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Innovating the future through cutting-edge robotics and technology.
        </p>
      </motion.div>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-3 font-display flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" /> Established
            </h3>
            <p className="text-white/80">Founded in <span className="text-red-400 font-semibold">{establishedYear}</span> at Rishihood University.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-3 font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-red-500" /> Founded By
            </h3>
            <p className="text-white/80">{founders.join(", ")}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-3 font-display flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-500" /> Mission
            </h3>
            <p className="text-white/80">{mission}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-3 font-display flex items-center gap-2">
              <Star className="w-5 h-5 text-red-500" /> Vision
            </h3>
            <p className="text-white/80">{vision}</p>
          </div>
        </div>
      </section>

      {/* At a Glance */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{coreMembers}</div>
            <div className="text-xs text-white/60">Core Members</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{projectsShowcased}</div>
            <div className="text-xs text-white/60">Projects Showcased</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{workshopsCount}</div>
            <div className="text-xs text-white/60">Workshops</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{eventsUpcoming}</div>
            <div className="text-xs text-white/60">Upcoming Events</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{achievementsCount}</div>
            <div className="text-xs text-white/60">Major Achievements</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{clubData?.labDetails?.equipment?.length || 0}</div>
            <div className="text-xs text-white/60">Key Lab Assets</div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 font-display">Our History</h2>
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 leading-relaxed text-white/80">
          <p className="mb-4">
            NewtonBotics was established in <span className="text-red-400 font-semibold">2024</span> by four pioneering members of the
            first batch at Rishihood University — driven by a shared vision to build a hands-on robotics culture from the ground up.
            Starting with a small lab and a few kits, the founders grew the club into a collaborative hub for humanoid systems,
            drone technology, computer vision, and embedded platforms. Today, NewtonBotics hosts workshops, drives competitive teams,
            and contributes research aligned with our mission to empower learners through real-world robotics.
          </p>
          <p>
            Our journey continues as we partner with industry, publish research, and mentor the next wave of innovators who will shape
            the future of intelligent machines.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 font-display">Founding Team (2024)</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foundersData.map((f, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors">
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-white/10">
                {/* Using Next/Image would be ideal, but keep div for simplicity */}
                <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold font-display">{f.name}</h3>
              <p className="text-sm text-white/60">{f.role} • {f.batch}</p>
              <p className="text-sm text-white/80 mt-3 leading-relaxed">{f.bio}</p>
            </div>
          ))}
        </div>
      </section>

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
                <p className="text-white/70">{lecture.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
