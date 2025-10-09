"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  Users, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  Target,
  TrendingUp,
  DollarSign,
  Tag,
  User,
  Award,
  Rocket,
  Star,
  Zap,
  MapPin,
  CalendarDays
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ProjectDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const url = `${API_BASE_URL}/projects/${params.id}`;
        console.log('Fetching project from:', url);
        
        const res = await fetch(url, { cache: 'no-store' });
        console.log('Response status:', res.status);
        
        if (!res.ok) throw new Error('Failed to fetch project');
        
        const data = await res.json();
        console.log('API Response:', data);
        
        if (data.success) {
          console.log('Project data:', data.data.project);
          setProject(data.data.project);
        } else {
          throw new Error(data.message || 'Failed to fetch project');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id, API_BASE_URL]);

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'ongoing':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'on_hold':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  const getProjectStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Rocket className="w-4 h-4" />;
      case 'ongoing':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'on_hold':
        return <Target className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getMilestoneStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'overdue':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  const getMilestoneStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <Target className="w-4 h-4" />;
      case 'overdue':
        return <Zap className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const calculateProgress = (milestones) => {
    if (!milestones || milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / milestones.length) * 100);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-green-600';
    if (progress >= 60) return 'from-blue-500 to-blue-600';
    if (progress >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white/60">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-white/60 mb-6">{error || 'The project you are looking for does not exist.'}</p>
          <Link href="/Projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Projects
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  // Fallback images array
  const fallbackImages = [
    "/servilancerobot.jpeg",
    "/humanoidRobotHealthcare.webp",
    "/bgImageforroboticslab.jpg"
  ];

  const getFallbackImage = (index = 0) => {
    return fallbackImages[index % fallbackImages.length];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/Projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Projects
              </motion.button>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Project Status */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getProjectStatusColor(project.status)}`}>
                {getProjectStatusIcon(project.status)}
                {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
              </span>
              {project.isFeatured && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Featured
                </span>
              )}
              {project.category && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/80 border border-white/20 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {project.category}
                </span>
              )}
            </div>

            {/* Project Title */}
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            
            {/* Project Description */}
            <p className="text-xl text-white/80 max-w-4xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image */}
            {project.imageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <div className="relative h-64 w-full rounded-lg overflow-hidden bg-white/10">
                  <Image
                    src={project.imageUrl || getFallbackImage(0)}
                    alt={project.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = getFallbackImage(0);
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Project Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white">Start Date</div>
                      <div className="text-white/80">
                        {formatDate(project.startDate)}
                      </div>
                    </div>
                  </div>

                  {project.endDate && (
                    <div className="flex items-start gap-3">
                      <CalendarDays className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">End Date</div>
                        <div className="text-white/80">
                          {formatDate(project.endDate)}
                        </div>
                      </div>
                    </div>
                  )}

                  {project.budget && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">Budget</div>
                        <div className="text-white/80">
                          ${project.budget.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Team Info */}
                <div className="space-y-4">
                  {project.teamMembers && project.teamMembers.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">Team Members</div>
                        <div className="text-white/80">
                          {project.teamMembers.length} members
                        </div>
                      </div>
                    </div>
                  )}

                  {project.mentorId && (
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">Mentor</div>
                        <div className="text-white/80">Project Mentor</div>
                      </div>
                    </div>
                  )}

                  {project.teamLeaderId && (
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">Team Leader</div>
                        <div className="text-white/80">Project Lead</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Milestones */}
            {project.milestones && project.milestones.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Project Milestones</h2>
                  <div className="text-right">
                    <div className="text-sm text-white/60">Overall Progress</div>
                    <div className="text-2xl font-bold text-red-400">{calculateProgress(project.milestones)}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-3 mb-6">
                  <motion.div
                    className={`bg-gradient-to-r ${getProgressColor(calculateProgress(project.milestones))} h-3 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${calculateProgress(project.milestones)}%` }}
                    transition={{ duration: 1.5 }}
                  />
                </div>

                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className={`p-2 rounded-full ${getMilestoneStatusColor(milestone.status)}`}>
                        {getMilestoneStatusIcon(milestone.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{milestone.title}</h3>
                        <p className="text-white/70 text-sm">{milestone.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                          <span>Due: {formatDate(milestone.dueDate)}</span>
                          {milestone.completedAt && (
                            <span>Completed: {formatDate(milestone.completedAt)}</span>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                        {milestone.status.replace('_', ' ')}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Team Members */}
            {project.teamMembers && project.teamMembers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Team Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Team Member</div>
                          <div className="text-white/60 text-sm">{member.role}</div>
                        </div>
                      </div>
                      {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  Achievements
                </h2>
                <div className="space-y-3">
                  {project.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-white/80">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Technologies & Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="px-3 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
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
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Category</span>
                  <span className="text-white font-medium">
                    {project.category || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Team Size</span>
                  <span className="text-white font-medium">
                    {project.teamMembers?.length || 0} members
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Milestones</span>
                  <span className="text-white font-medium">
                    {project.milestones?.length || 0} total
                  </span>
                </div>
                {project.isFeatured && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Featured</span>
                    <span className="text-yellow-400">⭐ Yes</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Share Project */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Share Project</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigator.share && navigator.share({
                    title: project.title,
                    text: project.description,
                    url: window.location.href
                  })}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Share Project
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

export default ProjectDetail;
