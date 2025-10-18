"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Users, Clock, MapPin } from "lucide-react";
import Link from "next/link";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api';

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch only upcoming and ongoing events for homepage
        const res = await fetch(`${API_BASE_URL}/events?status=upcoming&limit=3&isFeatured=true`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch upcoming events');
        
        const data = await res.json();
        if (data.success) {
          // Filter to only show upcoming and ongoing events
          const upcomingAndOngoing = data.data.items.filter(event => 
            event.status === 'upcoming' || event.status === 'ongoing'
          );
          setEvents(upcomingAndOngoing.slice(0, 3)); // Limit to 3 for homepage
        } else {
          throw new Error(data.message || 'Failed to fetch upcoming events');
        }
      } catch (err) {
        console.error('Error fetching upcoming events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, [API_BASE_URL]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'ongoing':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  const getEventTypeColor = (type) => {
    const typeColors = {
      'workshop': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'seminar': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'exhibition': 'bg-green-500/20 text-green-300 border-green-500/30',
      'training': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'networking': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'competition': 'bg-red-500/20 text-red-300 border-red-500/30',
      'technical': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'educational': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      'showcase': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    };
    return typeColors[type] || 'bg-white/10 text-white/80 border-white/20';
  };

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-lg text-white/60">Stay updated with our latest robotics events and workshops</p>
          </motion.div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-3"></div>
                <div className="h-3 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-20 bg-white/10 rounded"></div>
                  <div className="h-6 w-16 bg-white/10 rounded"></div>
                </div>
                <div className="h-8 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-lg text-white/60">Stay updated with our latest robotics events and workshops</p>
          </motion.div>
          
          <div className="text-center py-12">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Events</h3>
            <p className="text-white/60 mb-6">There was an error loading upcoming events. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white">
            Upcoming Events
          </h2>
          <p className="text-lg text-white/60">Stay updated with our latest robotics events and workshops</p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="text-white/40 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Upcoming Events</h3>
            <p className="text-white/60 mb-6">Check back later for exciting new events and workshops!</p>
            <Link href="/Events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Events
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Link href={`/Events/${event._id}`}>
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 cursor-pointer h-full">
                      {/* Event Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-2 flex-wrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getEventStatusColor(event.status)}`}>
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                          {event.isFeatured && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                        {event.title}
                      </h3>

                      {/* Event Description */}
                      <p className="text-white/70 text-sm mb-4 line-clamp-3">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-white/60 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{event.currentRegistrations || 0} / {event.maxCapacity || '∞'} registered</span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                          View Details
                        </span>
                        <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Events Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/Events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg border border-white/20 transition-all flex items-center gap-3 mx-auto group text-lg font-semibold"
                >
                  View All Events
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
