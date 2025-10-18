"use client";
import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState, useEffect } from "react";

const DiwaliCelebration = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has dismissed the banner in this session
    const dismissed = sessionStorage.getItem('diwali_banner_dismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('diwali_banner_dismissed', 'true');
  };

  if (!isMounted || !isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 text-white py-3 px-4 overflow-hidden z-[101]"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-3 relative z-10">
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
        </motion.div>
        
        <p className="text-sm sm:text-base md:text-lg font-semibold text-center">
          <span className="hidden sm:inline">🪔 </span>
          <span className="font-bold">Happy Diwali!</span>
          <span className="hidden md:inline"> Wishing you a festival of lights filled with joy, prosperity, and innovation!</span>
          <span className="inline md:hidden"> Wishing you joy, prosperity & innovation!</span>
          <span className="hidden sm:inline"> 🪔</span>
        </p>

        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
        </motion.div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss Diwali banner"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Animated diya flames effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};

export default DiwaliCelebration;

