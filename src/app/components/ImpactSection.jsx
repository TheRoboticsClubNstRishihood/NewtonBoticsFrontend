"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Rocket, Award, Users, Globe, Star, Calendar } from "lucide-react";

const ImpactSection = () => {
  const [metrics, setMetrics] = useState(null);
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const defaultAchievements = [
    { id: "researchProjects", number: "50+", label: "Research Projects", icon: <Rocket className="w-8 h-8" /> },
    { id: "publications", number: "200+", label: "Publications", icon: <Award className="w-8 h-8" /> },
    { id: "labMembers", number: "30+", label: "Lab Members", icon: <Users className="w-8 h-8" /> },
    { id: "industryPartners", number: "15+", label: "Industry Partners", icon: <Globe className="w-8 h-8" /> },
    { id: "awardsWon", number: "25+", label: "Awards Won", icon: <Star className="w-8 h-8" /> },
    { id: "workshopsConducted", number: "100+", label: "Workshops Conducted", icon: <Calendar className="w-8 h-8" /> }
  ];

  // Fetch public metrics for achievements
  useEffect(() => {
    let isMounted = true;
    const fetchMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const res = await fetch(`${API_BASE_URL}/public/metrics`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch metrics');
        const data = await res.json();
        if (isMounted && data.success) {
          setMetrics(data);
        }
      } catch (err) {
        console.error('Error fetching metrics:', err);
        // Silently ignore; fallback values will be used
      } finally {
        if (isMounted) setLoadingMetrics(false);
      }
    };

    fetchMetrics();
    return () => {
      isMounted = false;
    };
  }, [API_BASE_URL]);

  const achievements = useMemo(() => {
    const labels = metrics?.data?.labels;
    if (!labels) return defaultAchievements;
    return defaultAchievements.map((item) => {
      if (item.id === "researchProjects") {
        return { ...item, number: labels.projects || item.number };
      }
      if (item.id === "publications") {
        return { ...item, number: labels.publications || item.number };
      }
      if (item.id === "labMembers") {
        return { ...item, number: labels.labMembers || item.number };
      }
      if (item.id === "industryPartners") {
        return { ...item, number: labels.industryPartners || item.number };
      }
      if (item.id === "awardsWon") {
        return { ...item, number: labels.awardsWon || item.number };
      }
      if (item.id === "workshopsConducted") {
        return { ...item, number: labels.workshopsConducted || item.number };
      }
      return item;
    });
  }, [metrics]);

  if (loadingMetrics) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-black/70 z-10">
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white">
              Our Impact
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
              Numbers that speak for our commitment to excellence in robotics research and innovation
            </p>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 animate-pulse">
                <div className="bg-white/10 p-3 sm:p-4 rounded-xl w-16 h-16 mx-auto mb-3 sm:mb-4"></div>
                <div className="h-8 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-black/70 z-10">
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
        className="container mx-auto px-4 sm:px-6 relative z-20"
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
  );
};

export default ImpactSection;
