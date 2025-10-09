"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Brain, Box, Layout, ArrowLeft, Users, Calendar, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

const ResearchAreaDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [researchArea, setResearchArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    const fetchResearchArea = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/research-areas/${params.id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch research area');
        const data = await res.json();
        if (data.success) {
          setResearchArea(data.data.item);
        } else {
          throw new Error(data.message || 'Failed to fetch research area');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchResearchArea();
    }
  }, [params.id, API_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white/60">Loading research area...</p>
        </div>
      </div>
    );
  }

  if (error || !researchArea) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Research Area Not Found</h1>
          <p className="text-white/60 mb-6">{error || 'The research area you are looking for does not exist.'}</p>
          <Link href="/DashBoard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Dashboard
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI/ML':
        return <Brain className="w-8 h-8 text-white" />;
      case 'Mechanics':
        return <Box className="w-8 h-8 text-white" />;
      default:
        return <Layout className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/DashBoard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </motion.button>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6"
          >
            <div className="bg-gradient-to-br from-white/10 to-red-500/10 p-4 rounded-2xl">
              {getCategoryIcon(researchArea.category)}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{researchArea.name}</h1>
              <p className="text-xl text-white/60">{researchArea.category}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Description</h2>
              <p className="text-white/80 leading-relaxed text-lg">{researchArea.description}</p>
            </motion.div>

            {/* Focus Areas */}
            {researchArea.focusAreas && researchArea.focusAreas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">Focus Areas</h2>
                <div className="flex flex-wrap gap-3">
                  {researchArea.focusAreas.map((focus, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30 font-medium"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Keywords */}
            {researchArea.keywords && researchArea.keywords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">Keywords</h2>
                <div className="flex flex-wrap gap-3">
                  {researchArea.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Required Equipment */}
            {researchArea.requiredEquipment && researchArea.requiredEquipment.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">Required Equipment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {researchArea.requiredEquipment.map((equipment, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/80 p-3 bg-white/5 rounded-lg">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <span className="font-medium">{equipment}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Required Skills */}
            {researchArea.requiredSkills && researchArea.requiredSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">Required Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {researchArea.requiredSkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/80 p-3 bg-white/5 rounded-lg">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Collaboration Opportunities */}
            {researchArea.collaborationOpportunities && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">Collaboration Opportunities</h2>
                <p className="text-white/80 leading-relaxed text-lg">{researchArea.collaborationOpportunities}</p>
              </motion.div>
            )}

            {/* Funding Information */}
            {researchArea.fundingInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">Funding Information</h2>
                <p className="text-white/80 leading-relaxed text-lg">{researchArea.fundingInfo}</p>
              </motion.div>
            )}

            {/* External Links */}
            {researchArea.externalLinks && researchArea.externalLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">External Links</h2>
                <div className="space-y-3">
                  {researchArea.externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors p-3 bg-white/5 rounded-lg hover:bg-white/10"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-medium">{link.title || link.url}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-red-400" />
                    <span className="text-white/80">Team Members</span>
                  </div>
                  <span className="text-2xl font-bold text-red-400">{researchArea.memberCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-red-400" />
                    <span className="text-white/80">Publications</span>
                  </div>
                  <span className="text-2xl font-bold text-red-400">{researchArea.publicationCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-red-400" />
                    <span className="text-white/80">Active Projects</span>
                  </div>
                  <span className="text-2xl font-bold text-red-400">{researchArea.projectCount || 0}</span>
                </div>
              </div>
            </motion.div>

            {/* Timestamps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Timeline</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white/60">Created</div>
                  <div className="text-white font-medium">
                    {new Date(researchArea.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-white/60">Last Updated</div>
                  <div className="text-white font-medium">
                    {new Date(researchArea.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchAreaDetail;
