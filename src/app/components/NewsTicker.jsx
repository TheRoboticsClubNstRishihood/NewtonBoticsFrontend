"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Info } from "lucide-react";
import { useRouter } from "next/navigation";

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [hoveredNews, setHoveredNews] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api';

  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Create a continuous string of announcements with clickable spans
  const createContinuousText = () => {
    if (announcements.length === 0) {
      return (
        <span className="inline-block px-2 py-1">
          # No announcements at the moment
        </span>
      );
    }
    
    return announcements.map((announcement, index) => (
      <span key={`${announcement.id}-${index}`}>
        <span
          className={`inline-block px-2 py-1 mr-8 rounded-lg transition-all duration-300 cursor-pointer hover:bg-white/10 hover:shadow-md hover:scale-105 relative ${
            hoveredNews === announcement.id ? 'bg-white/10 shadow-md scale-105' : ''
          }`}
          onMouseEnter={(e) => {
            setHoveredNews(announcement.id);
            setIsPaused(true); // Pause scrolling on hover
            const rect = e.currentTarget.getBoundingClientRect();
            setTooltipPosition({
              x: rect.left + rect.width / 2,
              y: rect.top - 10
            });
          }}
          onMouseLeave={() => {
            setHoveredNews(null);
            setIsPaused(false); // Resume scrolling when leaving
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleNewsClick(announcement);
          }}
        >
          {announcement.text}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    const updateTextWidth = () => {
      if (textRef.current) {
        const width = textRef.current.scrollWidth / 6; // Divide by 6 since we repeat the text 6 times
        setTextWidth(Math.max(width, 100)); // Minimum width to prevent issues
      }
    };

    updateTextWidth();
    window.addEventListener('resize', updateTextWidth);
    
    return () => window.removeEventListener('resize', updateTextWidth);
  }, [announcements]);

  // Load latest news and events from navigation API for ticker
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}/events/navigation`, { 
          cache: 'no-store' 
        });
        
        if (!res.ok) {
          console.error('Failed to fetch navigation items');
          if (isMounted) setIsLoading(false);
          return;
        }
        
        const data = await res.json();
        
        if (!isMounted) return;
        
        if (data?.success && Array.isArray(data?.data?.items) && data.data.items.length > 0) {
          const mapped = data.data.items.map((item) => ({
            id: item.id,
            type: item.type, // 'news' or 'event'
            text: `# ${item.title}`,
            details: item.type === 'news' 
              ? (item.excerpt || item.content || 'Click to read more...') 
              : (item.description || 'Click to view event details...'),
            date: item.type === 'news' 
              ? (item.publishedAt || item.createdAt) 
              : (item.startDate || item.createdAt),
            category: item.type === 'news' 
              ? (item.category?.name || 'News') 
              : (item.eventType || item.category || 'Event'),
          }));
          setAnnouncements(mapped);
        }
      } catch (error) {
        console.error('Error fetching navigation items:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [API_BASE_URL]);

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
              <span className="text-xs font-bold text-white uppercase tracking-wide hidden sm:inline">
                {isLoading ? 'Loading...' : 'Latest News'}
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wide sm:hidden">
                {isLoading ? 'Loading' : 'News'}
              </span>
            </div>
            
            {/* Continuous scrolling announcements */}
            <div 
              className="flex-1 overflow-hidden relative min-h-[20px] flex items-center cursor-pointer hover:bg-white/5 rounded-lg transition-colors duration-200"
              onClick={handleTickerClick}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
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
                {/* Repeat announcements multiple times for seamless infinite scroll */}
                {[...Array(6)].map((_, repeatIndex) => (
                  <span key={`repeat-${repeatIndex}`} className="inline-block">
                    {createContinuousText()}
                  </span>
                ))}
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
                      if (selectedNews?.id && selectedNews?.type) {
                        const routePath = selectedNews.type === 'event' 
                          ? `/Events/${selectedNews.id}` 
                          : `/News/${selectedNews.id}`;
                        router.push(routePath);
                        setSelectedNews(null);
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                  >
                    {selectedNews?.type === 'event' ? 'View Event' : 'Read More'}
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