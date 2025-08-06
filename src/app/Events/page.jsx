"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Filter, 
  ArrowRight, 
  Star,
  BookOpen,
  TrendingUp,
  User,
  Tag,
  DollarSign,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import clubData from "../AllDatas/data.json";

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(clubData.events?.upcoming || []);

  // Filter events based on category, type, and search query
  useEffect(() => {
    let events = showPastEvents ? (clubData.events?.past || []) : (clubData.events?.upcoming || []);
    
    // Filter by category
    if (selectedCategory !== "All") {
      events = events.filter(event => event.category === selectedCategory);
    }
    
    // Filter by type
    if (selectedType !== "All") {
      events = events.filter(event => event.type === selectedType);
    }
    
    // Filter by search query
    if (searchQuery) {
      events = events.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredEvents(events);
  }, [selectedCategory, selectedType, searchQuery, showPastEvents]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'Workshop': 'bg-blue-500/80',
      'Seminar': 'bg-purple-500/80',
      'Exhibition': 'bg-green-500/80',
      'Training': 'bg-orange-500/80',
      'Networking': 'bg-pink-500/80',
      'Competition': 'bg-red-500/80',
      'Meeting': 'bg-gray-500/80'
    };
    return colors[type] || 'bg-gray-500/80';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Open for Registration': 'bg-green-500/80',
      'Almost Full': 'bg-yellow-500/80',
      'Full': 'bg-red-500/80',
      'Completed': 'bg-gray-500/80'
    };
    return colors[status] || 'bg-gray-500/80';
  };

  const getRegistrationProgress = (registered, capacity) => {
    if (!capacity) return 0;
    return Math.min((registered / capacity) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          Upcoming Events
        </h1>
        <p className="text-lg text-white/80 max-w-3xl mx-auto">
          Join us for exciting workshops, seminars, exhibitions, and networking opportunities. 
          Stay updated with the latest in robotics and technology.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-lg"
            />
          </div>

          {/* Event Type Toggle */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPastEvents(false)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                !showPastEvents
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
              }`}
            >
              Upcoming Events
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPastEvents(true)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                showPastEvents
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
              }`}
            >
              Past Events
            </motion.button>
          </div>
        </div>

        {/* Category and Type Filters */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {clubData.events?.categories?.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Events Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{clubData.events?.upcoming?.length || 0}</div>
            <div className="text-sm text-white/60">Upcoming Events</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{clubData.events?.past?.length || 0}</div>
            <div className="text-sm text-white/60">Past Events</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">
              {new Set(clubData.events?.upcoming?.map(event => event.type)).size || 0}
            </div>
            <div className="text-sm text-white/60">Event Types</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">
              {clubData.events?.upcoming?.reduce((total, event) => total + (event.registered || 0), 0) || 0}
            </div>
            <div className="text-sm text-white/60">Total Registrations</div>
          </div>
        </div>
      </motion.div>

      {/* Featured Events Section */}
      {filteredEvents.filter(event => event.featured).length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center font-display">
            <Star className="mr-3 text-red-500" /> Featured Events
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredEvents.filter(event => event.featured).slice(0, 2).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-red-500/10 group hover:bg-white/10 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)} text-white`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/80 text-white">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-white/80 mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {event.organizer}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {!showPastEvents && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/60" />
                        <span className="text-sm text-white/60">
                          {event.registered}/{event.capacity} registered
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 rounded-lg font-semibold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center gap-2 group"
                  >
                    {showPastEvents ? 'View Details' : 'Register Now'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* All Events Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center font-display">
          <BookOpen className="mr-3 text-red-500" /> {showPastEvents ? 'Past Events' : 'All Events'}
        </h2>
        
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
            <p className="text-white/60">
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-red-500/10 group hover:bg-white/10 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)} text-white`}>
                      {event.type}
                    </span>
                  </div>
                  {event.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/80 text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(event.date)}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {event.title}
                  </h4>
                  <p className="text-white/80 text-sm mb-3 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
                    <User className="w-3 h-3" />
                    <span>{event.organizer}</span>
                  </div>
                  {!showPastEvents && event.capacity && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                        <span>Registration Progress</span>
                        <span>{event.registered}/{event.capacity}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${getRegistrationProgress(event.registered, event.capacity)}%` }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      {showPastEvents ? 'View Details' : 'Register'}
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Newsletter Signup */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-16"
      >
        <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-3xl p-8 text-center backdrop-blur-xl border border-white/10 shadow-2xl shadow-red-500/20">
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
            Stay Updated
          </h3>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter to receive updates about upcoming events and activities.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-white/60 backdrop-blur-lg"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default EventsPage; 