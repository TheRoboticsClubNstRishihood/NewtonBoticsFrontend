"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Plus, X, Users, DollarSign, Calendar, 
  Target, TrendingUp, Briefcase, AlertCircle, CheckCircle, Send,
  Clock, Eye, RefreshCw, Edit2, Trash2 
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

const ProjectRequestPage = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // State for user's project requests
  const [myRequests, setMyRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api';

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    objectives: [""],
    expectedOutcomes: [""],
    teamSize: 1,
    estimatedDurationMonths: 1,
    budgetEstimate: 0,
    requiredResources: [""],
    teamMembers: [],
    resources: []
  });

  useEffect(() => {
    // Only redirect if auth loading is complete and user is not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch user's project requests
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchMyRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, authLoading]);

  const fetchMyRequests = async () => {
    try {
      setRequestsLoading(true);
      const token = localStorage.getItem('nb_access_token');
      
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/project-requests/my-requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMyRequests(data.data.items || []);
      }
    } catch (err) {
      console.error('Error fetching project requests:', err);
    } finally {
      setRequestsLoading(false);
    }
  };

  const handleEdit = (request) => {
    // Populate form with request data
    setFormData({
      title: request.title || "",
      description: request.description || "",
      objectives: request.objectives && request.objectives.length > 0 ? request.objectives : [""],
      expectedOutcomes: request.expectedOutcomes && request.expectedOutcomes.length > 0 ? request.expectedOutcomes : [""],
      teamSize: request.teamSize || 1,
      estimatedDurationMonths: request.estimatedDurationMonths || 1,
      budgetEstimate: request.budgetEstimate || 0,
      requiredResources: request.requiredResources && request.requiredResources.length > 0 ? request.requiredResources : [""],
      teamMembers: request.teamMembers || [],
      resources: request.resources || []
    });
    setEditingRequest(request);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingRequest(null);
    setFormData({
      title: "",
      description: "",
      objectives: [""],
      expectedOutcomes: [""],
      teamSize: 1,
      estimatedDurationMonths: 1,
      budgetEstimate: 0,
      requiredResources: [""],
      teamMembers: [],
      resources: []
    });
    setShowForm(false);
  };

  const handleDelete = async (requestId) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('nb_access_token');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      console.log('Deleting project:', requestId);

      const response = await fetch(`${API_BASE_URL}/project-requests/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          reason: 'User requested deletion'
        })
      });

      console.log('Delete response status:', response.status);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('Non-JSON response:', text);
        data = { message: text };
      }

      console.log('Delete response data:', data);

      if (!response.ok) {
        console.error('Delete failed:', data);
        throw new Error(data.error?.message || data.message || 'Failed to delete project request');
      }

      if (!data.success) {
        console.error('API returned success:false', data);
        throw new Error(data.message || 'Failed to delete project request');
      }

      console.log('Delete successful - verifying...');
      setSuccess(true);
      setSuccessMessage('Project request deleted successfully!');
      setError(null);
      setDeleteConfirm(null);
      
      // Refresh the requests list
      await fetchMyRequests();
      
      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, 3000);

    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
      setSuccess(false);
      setDeleteConfirm(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, {
        userId: "",
        proposedRole: "",
        skills: [""],
        availabilityHoursPerWeek: 0
      }]
    }));
  };

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const addTeamMemberSkill = (memberIndex) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === memberIndex ? { ...member, skills: [...member.skills, ""] } : member
      )
    }));
  };

  const removeTeamMemberSkill = (memberIndex, skillIndex) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === memberIndex ? { 
          ...member, 
          skills: member.skills.filter((_, si) => si !== skillIndex) 
        } : member
      )
    }));
  };

  const handleTeamMemberSkillChange = (memberIndex, skillIndex, value) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === memberIndex ? {
          ...member,
          skills: member.skills.map((skill, si) => si === skillIndex ? value : skill)
        } : member
      )
    }));
  };

  const addResource = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, {
        resourceType: "equipment",
        description: "",
        estimatedCost: 0,
        priority: "medium"
      }]
    }));
  };

  const removeResource = (index) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const handleResourceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.map((resource, i) => 
        i === index ? { ...resource, [field]: value } : resource
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('nb_access_token');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      // Clean up data - remove empty strings from arrays
      const cleanedData = {
        ...formData,
        objectives: formData.objectives.filter(obj => obj.trim() !== ""),
        expectedOutcomes: formData.expectedOutcomes.filter(out => out.trim() !== ""),
        requiredResources: formData.requiredResources.filter(res => res.trim() !== ""),
        teamMembers: formData.teamMembers.map(member => ({
          ...member,
          skills: member.skills.filter(skill => skill.trim() !== "")
        })).filter(member => member.userId && member.proposedRole),
        resources: formData.resources.filter(res => res.description.trim() !== "")
      };

      // Add reason for update if editing
      if (editingRequest) {
        cleanedData.reason = 'Updated project request details';
      }

      const url = editingRequest 
        ? `${API_BASE_URL}/project-requests/${editingRequest._id}`
        : `${API_BASE_URL}/project-requests`;
      
      const method = editingRequest ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cleanedData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `Failed to ${editingRequest ? 'update' : 'create'} project request`);
      }

      setSuccess(true);
      setSuccessMessage(editingRequest ? 'Project request updated successfully!' : 'Project request submitted successfully!');
      setError(null);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        objectives: [""],
        expectedOutcomes: [""],
        teamSize: 1,
        estimatedDurationMonths: 1,
        budgetEstimate: 0,
        requiredResources: [""],
        teamMembers: [],
        resources: []
      });

      setEditingRequest(null);

      // Refresh the requests list
      fetchMyRequests();
      
      // Hide form and show requests
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
        setSuccessMessage('');
      }, 2000);

    } catch (err) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication required only after loading is complete
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-white/60 mb-6">Please log in to submit a project request.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'under_review':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'approved':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'on_hold':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default:
        return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Project Requests
          </h1>
          <p className="text-xl text-white/60">
            {showForm ? 'Submit your innovative robotics project idea' : 'Manage your project requests'}
          </p>
        </motion.div>

        {/* Toggle Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setShowForm(false)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !showForm
                ? 'bg-red-600 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              My Requests ({myRequests.length})
            </span>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              showForm
                ? 'bg-red-600 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <span className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Request
            </span>
          </button>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-300">
              {successMessage || 'Operation completed successfully!'}
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-300">{error}</p>
          </motion.div>
        )}

        {/* My Requests List View */}
        {!showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {requestsLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white/60">Loading your requests...</p>
              </div>
            ) : myRequests.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Project Requests Yet</h3>
                <p className="text-white/60 mb-6">
                  You haven't submitted any project requests. Click "New Request" to get started!
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Create Your First Request
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Your Project Requests</h2>
                  <button
                    onClick={fetchMyRequests}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>

                {myRequests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                  >
                    {/* Request Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {request.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">
                            {request.teamSize} Team Members
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">
                            {request.estimatedDurationMonths} Months
                          </span>
                          {request.budgetEstimate > 0 && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">
                              ${request.budgetEstimate}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons - Top Right */}
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(request)}
                          title="Edit Project"
                          className="p-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(request._id)}
                          title="Delete Project"
                          className="p-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 mb-4 line-clamp-3">
                      {request.description}
                    </p>

                    {/* Objectives */}
                    {request.objectives && request.objectives.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Objectives
                        </h4>
                        <ul className="list-disc list-inside text-white/60 text-sm space-y-1">
                          {request.objectives.slice(0, 3).map((obj, idx) => (
                            <li key={idx} className="line-clamp-1">{obj}</li>
                          ))}
                          {request.objectives.length > 3 && (
                            <li className="text-white/40">+{request.objectives.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Team Members */}
                    {request.teamMembers && request.teamMembers.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Team Members
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {request.teamMembers.map((member, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/10 rounded-lg text-xs text-white/70"
                            >
                              {member.userId?.firstName} {member.userId?.lastName} - {member.proposedRole}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mentor Info */}
                    {request.mentorId && (
                      <div className="mb-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-white/60">
                          <span className="text-white/80 font-medium">Mentor:</span>{' '}
                          {request.mentorId.firstName} {request.mentorId.lastName}
                        </p>
                      </div>
                    )}

                    {/* Review Notes */}
                    {request.reviewNotes && (
                      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-sm text-blue-300">
                          <span className="font-medium">Review Notes:</span> {request.reviewNotes}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Submitted: {formatDate(request.submittedAt)}
                      </span>
                      {request.reviewedAt && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          Reviewed: {formatDate(request.reviewedAt)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Form */}
        {showForm && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          {/* Form Header */}
          <div className="mb-8 pb-4 border-b border-white/10">
            <h2 className="text-3xl font-bold mb-2">
              {editingRequest ? 'Edit Project Request' : 'Create New Project Request'}
            </h2>
            <p className="text-white/60">
              {editingRequest ? 'Update your project details below' : 'Fill in the details to submit your project proposal'}
            </p>
          </div>

          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-red-500" />
              Basic Information
            </h2>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-white/80 mb-2 font-medium">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                minLength={5}
                maxLength={255}
                placeholder="Enter your project title"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-white/80 mb-2 font-medium">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                minLength={20}
                maxLength={5000}
                rows={6}
                placeholder="Provide a detailed description of your project"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
              <p className="text-white/40 text-sm mt-1">
                {formData.description.length} / 5000 characters
              </p>
            </div>

            {/* Project Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Team Size */}
              <div>
                <label className="flex items-center gap-2 text-white/80 mb-2 font-medium">
                  <Users className="w-4 h-4" />
                  Team Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  required
                  min={1}
                  max={20}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="flex items-center gap-2 text-white/80 mb-2 font-medium">
                  <Calendar className="w-4 h-4" />
                  Duration (Months) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="estimatedDurationMonths"
                  value={formData.estimatedDurationMonths}
                  onChange={handleInputChange}
                  required
                  min={1}
                  max={24}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="flex items-center gap-2 text-white/80 mb-2 font-medium">
                  <DollarSign className="w-4 h-4" />
                  Budget Estimate
                </label>
                <input
                  type="number"
                  name="budgetEstimate"
                  value={formData.budgetEstimate}
                  onChange={handleInputChange}
                  min={0}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
            </div>
          </div>

          {/* Objectives Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-red-500" />
              Project Objectives
            </h2>
            {formData.objectives.map((objective, index) => (
              <div key={index} className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleArrayFieldChange('objectives', index, e.target.value)}
                  placeholder={`Objective ${index + 1}`}
                  maxLength={500}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
                {formData.objectives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('objectives', index)}
                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('objectives')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition"
            >
              <Plus className="w-4 h-4" />
              Add Objective
            </button>
          </div>

          {/* Expected Outcomes Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-red-500" />
              Expected Outcomes
            </h2>
            {formData.expectedOutcomes.map((outcome, index) => (
              <div key={index} className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => handleArrayFieldChange('expectedOutcomes', index, e.target.value)}
                  placeholder={`Expected outcome ${index + 1}`}
                  maxLength={500}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
                {formData.expectedOutcomes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('expectedOutcomes', index)}
                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('expectedOutcomes')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition"
            >
              <Plus className="w-4 h-4" />
              Add Outcome
            </button>
          </div>

          {/* Required Resources Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-red-500" />
              Required Resources
            </h2>
            {formData.requiredResources.map((resource, index) => (
              <div key={index} className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={resource}
                  onChange={(e) => handleArrayFieldChange('requiredResources', index, e.target.value)}
                  placeholder={`Resource ${index + 1}`}
                  maxLength={200}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
                {formData.requiredResources.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('requiredResources', index)}
                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('requiredResources')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition"
            >
              <Plus className="w-4 h-4" />
              Add Resource
            </button>
          </div>

          {/* Detailed Resources Section (Optional) */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Detailed Resources (Optional)
            </h2>
            {formData.resources.map((resource, index) => (
              <div key={index} className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">Resource Type</label>
                    <select
                      value={resource.resourceType}
                      onChange={(e) => handleResourceChange(index, 'resourceType', e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="equipment">Equipment</option>
                      <option value="software">Software</option>
                      <option value="funding">Funding</option>
                      <option value="space">Space</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">Priority</label>
                    <select
                      value={resource.priority}
                      onChange={(e) => handleResourceChange(index, 'priority', e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-white/70 mb-2 text-sm">Description</label>
                  <textarea
                    value={resource.description}
                    onChange={(e) => handleResourceChange(index, 'description', e.target.value)}
                    placeholder="Describe the resource"
                    maxLength={500}
                    rows={2}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="block text-white/70 mb-2 text-sm">Estimated Cost</label>
                    <input
                      type="number"
                      value={resource.estimatedCost}
                      onChange={(e) => handleResourceChange(index, 'estimatedCost', parseFloat(e.target.value) || 0)}
                      min={0}
                      placeholder="0"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="ml-4 mt-6 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addResource}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition"
            >
              <Plus className="w-4 h-4" />
              Add Detailed Resource
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={editingRequest ? handleCancelEdit : () => setShowForm(false)}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {editingRequest ? 'Updating...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {editingRequest ? 'Update Project Request' : 'Submit Project Request'}
                </>
              )}
            </button>
          </div>
        </motion.form>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Delete Project Request</h3>
                    <p className="text-white/60 text-sm">This action cannot be undone</p>
                  </div>
                </div>

                <p className="text-white/70 mb-6">
                  Are you sure you want to delete this project request? All associated data will be permanently removed.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectRequestPage;

