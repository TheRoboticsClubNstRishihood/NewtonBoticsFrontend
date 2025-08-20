"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Info } from "lucide-react";
import newsService from "../../lib/news";

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [hoveredNews, setHoveredNews] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);

  const defaultAnnouncements = [
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

  const [announcements, setAnnouncements] = useState(defaultAnnouncements);

  // Create a continuous string of announcements with clickable spans
  const createContinuousText = () => {
    return announcements.map((announcement, index) => (
      <span key={`${announcement.id}-${index}`}>
        <span
          className={`inline-block px-2 py-1 rounded-lg transition-all duration-300 cursor-pointer hover:bg-white/10 hover:shadow-md hover:scale-105 relative ${
            hoveredNews === announcement.id ? 'bg-white/10 shadow-md scale-105' : ''
          }`}
          onMouseEnter={(e) => {
            setHoveredNews(announcement.id);
            const rect = e.currentTarget.getBoundingClientRect();
            setTooltipPosition({
              x: rect.left + rect.width / 2,
              y: rect.top - 10
            });
          }}
          onMouseLeave={() => setHoveredNews(null)}
          onClick={(e) => {
            e.stopPropagation();
            handleNewsClick(announcement);
          }}
        >
          {announcement.text}
        </span>
        {index < announcements.length - 1 && (
          <span className="inline-block mx-4 text-white/40">•</span>
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
  }, [announcements]);

  // Load latest news from public API for ticker
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const { items } = await newsService.listNews({ isPublished: true, isFeatured: true, limit: 10, skip: 0 });
        if (!isMounted) return;
        if (Array.isArray(items) && items.length > 0) {
          const mapped = items.map((n, idx) => ({
            id: n._id || idx,
            text: `# ${n.title}`,
            details: n.excerpt || '',
            date: n.publishedAt || n.createdAt || new Date().toISOString(),
            category: n.categoryId || 'News',
          }));
          setAnnouncements(mapped);
        }
      } catch (_) {
        // Keep default announcements on failure
      }
    };
    load();
    return () => { isMounted = false; };
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
      <div className="bg-black border-b border-white/10 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Diagonal pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-y-1"></div>
        </div>
        
        <div className="container mx-auto px-4 py-2.5 relative">
          <div className="flex items-center justify-between min-h-[32px]">
            {/* News indicator */}
            <div className="flex items-center gap-2 mr-4 md:mr-6 flex-shrink-0">
              <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-white' : 'bg-white animate-pulse'}`}></div>
              <span className="text-xs font-bold text-white uppercase tracking-wide hidden sm:inline">Latest News</span>
              <span className="text-xs font-bold text-white uppercase tracking-wide sm:hidden">News</span>
            </div>
            
            {/* Continuous scrolling announcements */}
            <div 
              className="flex-1 overflow-hidden relative min-h-[20px] flex items-center cursor-pointer hover:bg-white/5 rounded-lg transition-colors duration-200"
              onClick={handleTickerClick}
            >
              <motion.div
                ref={textRef}
                className="flex items-center whitespace-nowrap text-sm font-medium text-white/80"
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
                    ? "bg-white scale-125 shadow-sm" 
                    : "bg-white/60 animate-pulse"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredNews && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="bg-black border border-white/10 text-white px-3 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap flex items-center gap-2">
              <Info className="w-3 h-3" />
              Click for details
            </div>
            <div className="w-2 h-2 bg-black border-l border-b border-white/10 rotate-45 mx-auto -mt-1"></div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="bg-black border border-white/10 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-white/5 border-b border-white/10 p-6 text-white relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-full text-white">
                    {selectedNews.category}
                  </span>
                  <span className="text-xs text-white/60">
                    {new Date(selectedNews.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{selectedNews.text}</h3>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-white/80 leading-relaxed mb-6">
                  {selectedNews.details}
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // You can implement navigation to a detailed page here
                      console.log('Navigate to detailed page for:', selectedNews);
                    }}
                    className="flex-1 px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
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