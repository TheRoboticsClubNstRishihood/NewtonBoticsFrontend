"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Brain, Layout, ArrowRight, Cpu, Wifi, Camera, Shield, ChevronDown, X } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Spotlight } from "@/components/components/ui/spotlight";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { subscribeToNewsletter } from "../../lib/newsletter";
import { SplineScene } from "@/components/components/ui/splite";

// Lazy load below-the-fold components for better initial page load
const RawGallery = lazy(() => import("../components/RawGallery"));
const UpcomingEvents = lazy(() => import("../components/UpcomingEvents"));
const ImpactSection = lazy(() => import("../components/ImpactSection"));

const HomePage = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api';
  const { user, isAuthenticated } = useAuth();
  const [roleNotice, setRoleNotice] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [researchAreas, setResearchAreas] = useState([]);
  const [loadingResearchAreas, setLoadingResearchAreas] = useState(false);
  
  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterFirstName, setNewsletterFirstName] = useState("");
  const [newsletterLastName, setNewsletterLastName] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterMessageType, setNewsletterMessageType] = useState(""); // "success" or "error"
  const [newsletterStep, setNewsletterStep] = useState(1); // 1: email, 2: name, 3: success

  useEffect(() => {
    // Only run initial animations once
    if (!hasAnimated) {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setHasAnimated(true);
      });
    }
    
    try {
      const raw = localStorage.getItem('nb_role_notice');
      if (raw) {
        setRoleNotice(JSON.parse(raw));
        localStorage.removeItem('nb_role_notice');
      }
    } catch (_) {}

    // Only set up slide interval if needed (currently unused but keeping for future)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [hasAnimated]);

  // Hide scroll indicator once user starts scrolling - Optimized with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            setShowScrollIndicator(false);
          } else {
            setShowScrollIndicator(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-dismiss role notice after 5 seconds
  useEffect(() => {
    if (!roleNotice) return;
    const timeoutId = setTimeout(() => setRoleNotice(null), 5000);
    return () => clearTimeout(timeoutId);
  }, [roleNotice]);

  // Fetch research areas
  useEffect(() => {
    let isMounted = true;
    const fetchResearchAreas = async () => {
      try {
        setLoadingResearchAreas(true);
        const res = await fetch(`${API_BASE_URL}/research-areas?isActive=true&isFeatured=true&limit=4`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch research areas');
        const data = await res.json();
        if (isMounted && data.success) {
          setResearchAreas(data.data.items || []);
        }
      } catch (_) {
        // Silently ignore; fallback values will be used
      } finally {
        if (isMounted) setLoadingResearchAreas(false);
      }
    };
    fetchResearchAreas();
    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToFeatures = () => {
    const target = document.getElementById("features");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Newsletter step handlers
  const handleEmailContinue = (e) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      setNewsletterMessage("Please enter your email address");
      setNewsletterMessageType("error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterMessage("Please enter a valid email address");
      setNewsletterMessageType("error");
      return;
    }

    setNewsletterMessage("");
    setNewsletterStep(2);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    setIsNewsletterSubmitting(true);
    setNewsletterMessage("");

    try {
      const subscriptionData = {
        email: newsletterEmail.trim(),
        ...(newsletterFirstName.trim() && { firstName: newsletterFirstName.trim() }),
        ...(newsletterLastName.trim() && { lastName: newsletterLastName.trim() })
      };

      await subscribeToNewsletter(subscriptionData);
      setNewsletterStep(3);
      setNewsletterMessage("Successfully subscribed to our newsletter!");
      setNewsletterMessageType("success");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterFirstName("");
        setNewsletterLastName("");
        setNewsletterStep(1);
        setNewsletterMessage("");
      }, 3000);
    } catch (error) {
      setNewsletterMessage(error.message || "Failed to subscribe. Please try again.");
      setNewsletterMessageType("error");
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  const handleBackToEmail = () => {
    setNewsletterStep(1);
    setNewsletterMessage("");
  };

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

  return (
      <main className="min-h-screen bg-black text-white font-sans overflow-hidden" itemScope itemType="https://schema.org/WebPage">
        {/* Removed welcome back toast per request */}

        {/* Role notice toast */}
        {roleNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%] md:w-auto bg-white/10 border border-white/15 backdrop-blur-xl rounded-2xl px-4 py-3"
          >
            <button
              onClick={() => setRoleNotice(null)}
              aria-label="Dismiss notification"
              className="absolute top-2 right-2 inline-flex items-center justify-center rounded-md p-1 text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-sm text-white/90 pr-6">
              {roleNotice.message || (
                <>
                  Your requested role <span className="text-red-300">{roleNotice.requestedRole}</span> is not pre-approved. You have been registered as <span className="text-red-300">{roleNotice.assignedRole}</span>.
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Hero Section with Enhanced Animations */}
        <section className="relative min-h-screen lg:h-screen" itemScope itemType="https://schema.org/Organization">
        {/* Mobile Video Background - Optimized for performance */}
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-30"
            style={{ willChange: 'auto' }}
          >
            <source src="/robotanimation.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black hidden lg:block"></div>
        {/* Spotlight - Only render on desktop for better mobile performance */}
        <div className="hidden lg:block">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
        </div>
        
        {/* Animated Background Elements - Reduced on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Reduce animations on mobile - use CSS animations instead of JS where possible */}
          <motion.div
            className="absolute top-20 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl lg:opacity-100 opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div
            className="absolute bottom-20 right-4 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl lg:opacity-100 opacity-50 hidden sm:block"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: 'transform, opacity' }}
          />
          {/* Subtle Red Texture Elements - Hidden on mobile for performance */}
          <motion.div
            className="absolute top-40 right-4 sm:right-40 w-32 h-32 sm:w-48 sm:h-48 bg-red-500/5 rounded-full blur-2xl lg:opacity-100 opacity-40 hidden sm:block"
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
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div
            className="absolute bottom-40 left-4 sm:left-40 w-24 h-24 sm:w-32 sm:h-32 bg-red-500/8 rounded-full blur-xl lg:opacity-100 opacity-40 hidden md:block"
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
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row h-full min-h-screen md:mt-[-100px]">
          {/* Left content */}
          <div className="flex-1 p-4 sm:p-8 md:p-12 lg:p-20 relative z-10 flex flex-col justify-center order-2 lg:order-1">
            {/* Mobile: Use CSS animations for better performance */}
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left lg:hidden">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 hero-fade-in">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white/80 font-medium text-sm sm:text-base">Innovation Hub at Rishihood University</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 drop-shadow-2xl leading-tight hero-title-fade-in" itemProp="name">
                NewtonBotics
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-white/70 mt-2 sm:mt-3 mb-4 sm:mb-6 hero-text-fade-in">
                <span className="text-white/90 font-medium">at Rishihood University</span>
              </p>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-4 sm:mt-6 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 hero-text-fade-in" itemProp="description">
                Where Innovation Meets Precision in Robotics Excellence. 
                <span className="text-red-400 font-semibold"> Building the future, one robot at a time.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start hero-button-fade-in">
                <Link href="/Projects" className="inline-block">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 group">
                    Discover Our Innovations
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Desktop: Keep JS animations for smoother experience */}
            <motion.div
              className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left hidden lg:block"
              initial={hasAnimated ? false : { opacity: 0, x: -100 }}
              animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-4"
              >
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white/80 font-medium text-sm sm:text-base">Innovation Hub at Rishihood University</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 drop-shadow-2xl leading-tight" itemProp="name">
                NewtonBotics
              </h1>
              
              <motion.p
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-sm sm:text-base md:text-lg text-white/70 mt-2 sm:mt-3 mb-4 sm:mb-6"
              >
                <span className="text-white/90 font-medium">at Rishihood University</span>
              </motion.p>
              
              <motion.p
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-4 sm:mt-6 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
                itemProp="description"
              >
                Where Innovation Meets Precision in Robotics Excellence. 
                <span className="text-red-400 font-semibold"> Building the future, one robot at a time.</span>
              </motion.p>

              <motion.div
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <Link href="/Projects" className="inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 group"
                  >
                    Discover Our Innovations
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right content - Animated Robot (Desktop only) - Lazy loaded */}
          <div className="hidden lg:block flex-1 relative order-1 lg:order-2 h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Enhanced Robotics Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute bottom-4 sm:bottom-32 left-1/2 -translate-x-1/2 hidden sm:block z-40"
            >
              <div className="relative flex flex-col items-center gap-2">
                <motion.button
                  onClick={scrollToFeatures}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Scroll to explore"
                  className="relative flex items-center justify-center p-0"
                >
                  {/* Down chevron only (no circle) */}
                  <motion.div
                    animate={{ y: [0, 4, 0], rotate: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rotate-0"
                  >
                    <ChevronDown className="w-6 h-6 text-white/80" />
                  </motion.div>
                </motion.button>
                <span className="text-xs text-white/60 select-none">Scroll to explore</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-10" aria-label="Cutting-Edge Technology Features">
        {/* Subtle Red Texture Background - Reduced on mobile */}
        <div className="absolute inset-0 hidden md:block">
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
            style={{ willChange: 'transform, opacity' }}
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
            style={{ willChange: 'transform, opacity' }}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white pb-4">
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
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden z-10" aria-label="Research Areas">
        {/* Subtle Red Texture Background - Hidden on mobile */}
        <div className="absolute inset-0 hidden md:block">
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
            style={{ willChange: 'transform, opacity' }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
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
            {loadingResearchAreas ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-lg shadow-white/10"
                >
                  <div className="animate-pulse">
                    <div className="bg-white/10 rounded-xl p-3 sm:p-4 w-fit mb-4 sm:mb-5 h-8 sm:h-10"></div>
                    <div className="bg-white/10 rounded h-6 mb-3 w-3/4"></div>
                    <div className="bg-white/10 rounded h-4 mb-4 w-full"></div>
                    <div className="bg-white/10 rounded h-4 w-1/2"></div>
                  </div>
                </motion.div>
              ))
            ) : researchAreas.length > 0 ? (
              researchAreas.map((area, index) => (
                <Link key={area._id || index} href={`/research-areas/${area._id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all border border-white/10 hover:border-red-500/20 shadow-lg shadow-white/10 group cursor-pointer"
                  >
                    <div
                      className="bg-gradient-to-br from-white/10 to-red-500/10 p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-5 shadow-lg group-hover:shadow-2xl transition-all"
                    >
                      {area.category === 'AI/ML' ? <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" /> :
                       area.category === 'Mechanics' ? <Box className="w-8 h-8 sm:w-10 sm:h-10 text-white" /> :
                       <Layout className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                      {area.description}
                    </p>
                    {/* <div className="text-xs sm:text-sm text-red-400 font-medium">
                      {area.projectCount || 0} Active Projects
                    </div> */}
                  </motion.div>
                </Link>
              ))
            ) : (
              // Fallback to dummy data if API fails
              [
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
                  {/* <div className="text-xs sm:text-sm text-red-400 font-medium">
                    {area.projects}
                  </div> */}
                </motion.div>
              ))
            )}
          </div>
          
          {/* Show All Research Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/research-areas">
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg border border-white/20 transition-all flex items-center gap-2 mx-auto group">
                Explore more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <Suspense fallback={<div className="min-h-[200px]"></div>}>
        <ImpactSection />
      </Suspense>

      {/* Upcoming Events Component */}
      <Suspense fallback={<div className="min-h-[200px]"></div>}>
        <UpcomingEvents />
      </Suspense>

      {/* Raw Media Collage Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#0b0f16]/70 relative z-10">
        <Suspense fallback={<div className="min-h-[200px]"></div>}>
          <RawGallery />
        </Suspense>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black/70 relative overflow-hidden z-10" aria-label="Newsletter Subscription">
        {/* Subtle Red Texture Background - Hidden on mobile */}
        <div className="absolute inset-0 hidden md:block">
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
            style={{ willChange: 'transform, opacity' }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
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
              <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-20 h-20 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-xl"></div>
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
              <div className="max-w-lg mx-auto px-4">
                {/* Step 1: Email Input */}
                {newsletterStep === 1 && (
                  <form onSubmit={handleEmailContinue}>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/60 backdrop-blur-lg text-sm sm:text-base"
                        required
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 group text-sm sm:text-base"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </form>
                )}

                {/* Step 2: Name Fields */}
                {newsletterStep === 2 && (
                  <form onSubmit={handleNewsletterSubmit}>
                    <div className="mb-4">
                      <p className="text-white/70 text-sm mb-4">
                        Great! We have your email: <span className="text-red-400 font-medium">{newsletterEmail}</span>
                      </p>
                      <p className="text-white/60 text-sm mb-4">
                        Add your name (optional) to personalize your newsletter experience.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <input
                          type="text"
                          placeholder="First name (optional)"
                          value={newsletterFirstName}
                          onChange={(e) => setNewsletterFirstName(e.target.value)}
                          className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/60 backdrop-blur-lg text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Last name (optional)"
                          value={newsletterLastName}
                          onChange={(e) => setNewsletterLastName(e.target.value)}
                          className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/60 backdrop-blur-lg text-sm"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <motion.button
                          type="button"
                          onClick={handleBackToEmail}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                          ← Back
                        </motion.button>
                        <motion.button
                          type="submit"
                          disabled={isNewsletterSubmitting}
                          whileHover={!isNewsletterSubmitting ? { scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" } : {}}
                          whileTap={!isNewsletterSubmitting ? { scale: 0.95 } : {}}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 disabled:from-red-800 disabled:to-red-900 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 group"
                        >
                          {isNewsletterSubmitting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <>
                              Subscribe
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Step 3: Success Message */}
                {newsletterStep === 3 && (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-green-400 mb-2">Welcome to our newsletter!</h3>
                      <p className="text-white/80">
                        You're all set! We'll keep you updated with our latest projects and innovations.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {newsletterMessage && newsletterMessageType === "error" && (
                  <div className="mb-4 p-3 rounded-lg text-sm bg-red-900/50 text-red-300 border border-red-700/50">
                    {newsletterMessage}
                  </div>
                )}
              </div>
              <p className="text-xs sm:text-sm text-white/60 mt-4">
                🔒 We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      </main>
  );
};

export default HomePage;
