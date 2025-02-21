"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  DollarSign,
  Calendar,
  Tool,
  Plus,
} from "lucide-react";
import clubData from "../AllDatas/data.json";

const ProjectApprovalPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teamMembers: [],
    budget: "",
    itemsNeeded: [{ name: "", quantity: "" }],
    startDate: "",
    endDate: "",
  });

  const [selectedProject, setSelectedProject] = useState(null); // State to track selected project

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      itemsNeeded: [...prev.itemsNeeded, { name: "", quantity: "" }],
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.itemsNeeded];
    updatedItems[index][name] = value;
    setFormData((prev) => ({ ...prev, itemsNeeded: updatedItems }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Project Request Submitted:", formData);
    alert("Project request submitted successfully!");
    setShowForm(false); // Hide the form after submission
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project); // Set the selected project
  };

  const handleCloseDetails = () => {
    setSelectedProject(null); // Close the details view
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          Project Approval System
        </h1>
        <p className="text-lg text-white/80">
          Submit your project ideas and track their approval status.
        </p>
      </motion.div>

      {/* Create New Project Button */}
      <motion.div
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:from-red-600 hover:to-red-500 transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? "Close Form" : "Create New Project"}
        </button>
      </motion.div>

      {/* Project Request Form */}
      {showForm && (
        <motion.section
          className="max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
            <h3 className="mr-3 text-red-500" /> New Project Request
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-white/80"
              >
                Project Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
            </div>

            {/* Project Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white/80"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
            </div>

            {/* Team Members */}
            <div>
              <label
                htmlFor="teamMembers"
                className="block text-sm font-medium text-white/80"
              >
                Team Members
              </label>
              <select
                name="teamMembers"
                id="teamMembers"
                multiple
                required
                value={formData.teamMembers}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    teamMembers: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  }))
                }
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              >
                {clubData.coreMembers.map((member, index) => (
                  <option key={index} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Estimate */}
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-white/80"
              >
                Budget Estimate (₹)
              </label>
              <input
                type="number"
                name="budget"
                id="budget"
                required
                value={formData.budget}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
            </div>

            {/* Items Needed */}
            <div>
              <label
                htmlFor="itemsNeeded"
                className="block text-sm font-medium text-white/80"
              >
                Items Needed
              </label>
              {formData.itemsNeeded.map((item, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    className="flex-1 rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-1/4 rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                className="text-sm text-red-500 hover:text-red-600"
              >
                + Add Another Item
              </button>
            </div>

            {/* Project Timeline */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-white/80"
                >
                  Expected Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-white/80"
                >
                  Expected End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  required
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-md hover:from-red-600 hover:to-red-500 transition-all"
            >
              Submit Request
            </button>
          </form>
        </motion.section>
      )}

      {/* All Projects Section */}
      <motion.section
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center font-display">
          <CheckCircle className="mr-3 text-green-400" /> All Projects
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white/5 backdrop-blur-lg rounded-lg border border-white/10">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="p-4">Title</th>
                <th className="p-4">Team Members</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubData.projectRequests.map((project) => (
                <tr key={project.id} className="border-b border-white/10">
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">{project.teamMembers.join(", ")}</td>
                  <td className="p-4">₹{project.budget}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        project.status === "Approved"
                          ? "bg-green-500/20 text-green-400"
                          : project.status === "Rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="text-red-500 hover:text-red-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            className="bg-black rounded-xl p-8 w-full max-w-2xl border border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 font-display">
              {selectedProject.title}
            </h2>
            <p className="text-white/80 mb-4">{selectedProject.description}</p>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-white/80">
                <Users className="w-4 h-4 mr-2" />
                <span>
                  Team Members: {selectedProject.teamMembers.join(", ")}
                </span>
              </div>
              <div className="flex items-center text-sm text-white/80">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>Budget: ₹{selectedProject.budget}</span>
              </div>
              <div className="flex items-center text-sm text-white/80">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Timeline: {selectedProject.startDate} -{" "}
                  {selectedProject.endDate}
                </span>
              </div>
              <div className="text-sm text-white/80">
                <span className="font-semibold">Items Needed:</span>
                <ul className="list-disc list-inside">
                  {selectedProject.itemsNeeded.map((item, index) => (
                    <li key={index}>
                      {item.name} (Quantity: {item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-white/80">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full ${
                    selectedProject.status === "Approved"
                      ? "bg-green-500/20 text-green-400"
                      : selectedProject.status === "Rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {selectedProject.status}
                </span>
              </div>
              <div className="text-sm text-white/80">
                <span className="font-semibold">Comments:</span>
                {selectedProject.comments.map((comment, index) => (
                  <div key={index} className="mt-2">
                    <span className="text-red-500">{comment.by}:</span>{" "}
                    {comment.comment}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleCloseDetails}
              className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-red-500 transition-all"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectApprovalPage;
