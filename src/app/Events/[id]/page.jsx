"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Star,
  User,
  CalendarDays,
  Tag
} from "lucide-react";
import Link from "next/link";

const EventDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/events/${params.id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        if (data.success) {
          setEvent(data.data.item);
        } else {
          throw new Error(data.message || 'Failed to fetch event');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id, API_BASE_URL]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
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
      case 'completed':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  const getEventStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Calendar className="w-4 h-4" />;
      case 'ongoing':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
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

  const isRegistrationOpen = () => {
    if (!event) return false;
    if (event.status === 'cancelled' || event.status === 'completed') return false;
    if (event.registrationDeadline) {
      return new Date(event.registrationDeadline) > new Date();
    }
    return event.status === 'upcoming';
  };

  const isEventFull = () => {
    if (!event) return false;
    return event.maxCapacity && event.currentRegistrations >= event.maxCapacity;
  };

  const getRegistrationStatus = () => {
    if (!event) return 'unknown';
    if (event.status === 'cancelled') return 'cancelled';
    if (event.status === 'completed') return 'completed';
    if (isEventFull()) return 'full';
    if (!isRegistrationOpen()) return 'closed';
    return 'open';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white/60">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
          <p className="text-white/60 mb-6">{error || 'The event you are looking for does not exist.'}</p>
          <Link href="/Events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Events
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/Events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Events
              </motion.button>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Event Type and Status */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.type)}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${getEventStatusColor(event.status)}`}>
                {getEventStatusIcon(event.status)}
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
              {event.isFeatured && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Featured
                </span>
              )}
            </div>

            {/* Event Title */}
            <h1 className="text-4xl md:text-5xl font-bold">{event.title}</h1>
            
            {/* Event Description */}
            <p className="text-xl text-white/80 max-w-4xl">
              {event.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Event Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date and Time */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white">Date & Time</div>
                      <div className="text-white/80">
                        <div>{formatDate(event.startDate)}</div>
                        <div className="text-sm text-white/60">
                          {formatTime(event.startDate)} - {formatTime(event.endDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  {event.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">Location</div>
                        <div className="text-white/80">{event.location}</div>
                      </div>
                    </div>
                  )}

                  {/* Category */}
                  {event.category && (
                    <div className="flex items-start gap-3">
                      <Tag className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">Category</div>
                        <div className="text-white/80">{event.category}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Registration Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white">Capacity</div>
                      <div className="text-white/80">
                        {event.currentRegistrations || 0} / {event.maxCapacity || '∞'} registered
                      </div>
                    </div>
                  </div>

                  {/* Registration Deadline */}
                  {event.registrationDeadline && (
                    <div className="flex items-start gap-3">
                      <CalendarDays className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">Registration Deadline</div>
                        <div className="text-white/80">
                          {formatDateTime(event.registrationDeadline)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Organizer */}
                  {event.organizerId && (
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">Organizer</div>
                        <div className="text-white/80">Event Organizer</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Registration Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Registration</h2>
              
              <div className="space-y-6">
                {/* Registration Status */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      getRegistrationStatus() === 'open' ? 'bg-green-400' :
                      getRegistrationStatus() === 'full' ? 'bg-red-400' :
                      getRegistrationStatus() === 'closed' ? 'bg-yellow-400' :
                      'bg-gray-400'
                    }`}></div>
                    <span className="font-medium text-white">
                      Registration {getRegistrationStatus() === 'open' ? 'Open' :
                                  getRegistrationStatus() === 'full' ? 'Full' :
                                  getRegistrationStatus() === 'closed' ? 'Closed' :
                                  getRegistrationStatus() === 'cancelled' ? 'Cancelled' :
                                  'Completed'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-white/60">
                    {event.currentRegistrations || 0} / {event.maxCapacity || '∞'} spots filled
                  </div>
                </div>

                {/* Registration Button */}
                {getRegistrationStatus() === 'open' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isRegistering}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRegistering ? 'Processing...' : 'Register for Event'}
                  </motion.button>
                )}

                {/* Registration Messages */}
                {getRegistrationStatus() === 'full' && (
                  <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-300 font-medium">Event is at full capacity</p>
                    <p className="text-red-300/80 text-sm mt-1">Check back later for cancellations</p>
                  </div>
                )}

                {getRegistrationStatus() === 'closed' && (
                  <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-300 font-medium">Registration is closed</p>
                    <p className="text-yellow-300/80 text-sm mt-1">The registration deadline has passed</p>
                  </div>
                )}

                {getRegistrationStatus() === 'cancelled' && (
                  <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-300 font-medium">Event Cancelled</p>
                    <p className="text-red-300/80 text-sm mt-1">This event has been cancelled</p>
                  </div>
                )}

                {getRegistrationStatus() === 'completed' && (
                  <div className="text-center p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                    <p className="text-gray-300 font-medium">Event Completed</p>
                    <p className="text-gray-300/80 text-sm mt-1">This event has already taken place</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEventStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Type</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Capacity</span>
                  <span className="text-white font-medium">
                    {event.maxCapacity || '∞'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Registered</span>
                  <span className="text-white font-medium">
                    {event.currentRegistrations || 0}
                  </span>
                </div>
                {event.isFeatured && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Featured</span>
                    <span className="text-yellow-400">⭐ Yes</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Share Event */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Share Event</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigator.share && navigator.share({
                    title: event.title,
                    text: event.description,
                    url: window.location.href
                  })}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Share Event
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
