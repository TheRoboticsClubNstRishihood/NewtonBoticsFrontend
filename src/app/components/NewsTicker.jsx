"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [hoveredNews, setHoveredNews] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const textRef = useRef(null);

  const announcements = [
    {
      id: 1,
      text: "# Freshers First Workshop: Introduction to CAD Designing",
      details: "Join us for an introductory workshop on CAD designing. Learn the basics of Computer-Aided Design and create your first 3D models. This workshop is perfect for beginners who want to explore the world of 3D modeling and design.",
      date: "2024-12-20",
      category: "Workshop"
    },
    {
      id: 2,
      text: "# Bus Tracker Launching Soon !!",
      details: "Our innovative bus tracking system is almost ready for launch. Stay tuned for real-time bus location updates. This system will help students track bus locations in real-time and plan their commute better.",
      date: "2024-12-25",
      category: "Technology"
    },
    {
      id: 3,
      text: "# Robotics Club Wins hearts at Open House'24 ❤️",
      details: "Our robotics club showcased amazing projects at the Open House 2024 and won the hearts of visitors with our innovative demonstrations. The event was a huge success with over 500 visitors.",
      date: "2024-12-15",
      category: "Achievement"
    },
    {
      id: 4,
      text: "# Robocon Hackathon Registration Open",
      details: "Registration is now open for the annual Robocon Hackathon. Compete with the best robotics teams and win exciting prizes. This year's theme focuses on sustainable robotics solutions.",
      date: "2025-01-10",
      category: "Competition"
    },
    {
      id: 5,
      text: "# New AI Workshop Series Starting Next Month",
      details: "Get ready for our comprehensive AI workshop series covering machine learning, computer vision, and robotics integration. Learn from industry experts and work on real-world projects.",
      date: "2025-01-15",
      category: "Workshop"
    },
    {
      id: 6,
      text: "# Drone Technology Workshop Success",
      details: "Our drone technology workshop was a huge success with over 50 students participating and building their own drones. Students learned about autonomous flight systems and aerial robotics.",
      date: "2024-12-10",
      category: "Workshop"
    },
    {
      id: 7,
      text: "# Industry Partnership with TechCorp Robotics",
      details: "Exciting new partnership announced with TechCorp Robotics for collaborative research and internship opportunities. This partnership will provide students with industry exposure and real-world experience.",
      date: "2024-12-05",
      category: "Partnership"
    },
    {
      id: 8,
      text: "# Research Paper Published in IEEE Robotics Journal",
      details: "Congratulations to our team for having their research paper on 'Swarm Robotics for Disaster Management' published in IEEE Robotics Journal. This represents a significant contribution to the field.",
      date: "2024-11-28",
      category: "Publication"
    }
  ];

  // Create a continuous string of announcements with clickable spans
  const createContinuousText = () => {
    return announcements.map((announcement, index) => (
      <span key={`${announcement.id}-${index}`}>
        <span
          className={`inline-block px-2 py-1 rounded-lg transition-all duration-300 cursor-pointer hover:bg-amber-200/80 hover:shadow-md hover:scale-105 ${
            hoveredNews === announcement.id ? 'bg-amber-200/80 shadow-md scale-105' : ''
          }`}
          onMouseEnter={() => setHoveredNews(announcement.id)}
          onMouseLeave={() => setHoveredNews(null)}
          onClick={(e) => {
            e.stopPropagation();
            handleNewsClick(announcement);
          }}
        >
          {announcement.text}
        </span>
        {index < announcements.length - 1 && (
          <span className="inline-block mx-4 text-amber-400">•</span>
        )}
      </span>
    ));
  };

  useEffect(() => {
    const updateTextWidth = () => {
      if (textRef.current) {
        const width = textRef.current.scrollWidth / 2; // Divide by 2 since we duplicate the text
        setTextWidth(Math.max(width, 100)); // Minimum width to prevent issues
      }
    };

    updateTextWidth();
    window.addEventListener('resize', updateTextWidth);
    
    return () => window.removeEventListener('resize', updateTextWidth);
  }, []);

  const handleTickerClick = () => {
    setIsPaused(!isPaused);
  };

  const handleNewsClick = (announcement) => {
    setSelectedNews(announcement);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  // Calculate duration based on text width for consistent speed
  const duration = Math.max(textWidth * 0.03, 20); // Minimum 20 seconds, adjust multiplier for speed

  return (
    <>
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-b border-amber-200 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Diagonal pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-amber-300 to-transparent transform -skew-y-1"></div>
        </div>
        
        <div className="container mx-auto px-4 py-2.5 relative">
          <div className="flex items-center justify-between min-h-[32px]">
            {/* News indicator */}
            <div className="flex items-center gap-2 mr-4 md:mr-6 flex-shrink-0">
              <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`}></div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide hidden sm:inline">Latest News</span>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide sm:hidden">News</span>
            </div>
            
            {/* Continuous scrolling announcements */}
            <div 
              className="flex-1 overflow-hidden relative min-h-[20px] flex items-center cursor-pointer hover:bg-amber-100/50 rounded-lg transition-colors duration-200"
              onClick={handleTickerClick}
            >
              <motion.div
                ref={textRef}
                className="flex items-center whitespace-nowrap text-sm font-medium text-gray-800"
                animate={isPaused ? {} : { x: [0, -textWidth] }}
                transition={{
                  x: {
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <span className="inline-block">
                  {createContinuousText()}
                </span>
                <span className="inline-block ml-16">
                  {createContinuousText()}
                </span>
              </motion.div>
            </div>
            
            {/* Pause indicator */}
            <div className="flex gap-1.5 ml-4 md:ml-6 flex-shrink-0">
              <div
                onClick={handleTickerClick}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                  isPaused 
                    ? "bg-yellow-500 scale-125 shadow-sm" 
                    : "bg-red-500 animate-pulse"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* News Details Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-6 text-white relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    {selectedNews.category}
                  </span>
                  <span className="text-xs opacity-80">
                    {new Date(selectedNews.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{selectedNews.text}</h3>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedNews.details}
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // You can implement navigation to a detailed page here
                      console.log('Navigate to detailed page for:', selectedNews);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all flex items-center justify-center gap-2"
                  >
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsTicker; 