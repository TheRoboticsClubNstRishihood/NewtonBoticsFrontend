"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Users, Robot, AlertTriangle } from "lucide-react";
import clubData from "../AllDatas/data.json";
import Image from "next/image";
import image1 from "../assets/image01.png";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General",
    message: "",
    phone: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Use leadership data from the imported JSON
  const coreMembersData = clubData.leadership.map((member) => ({
    name: member.name,
    role: member.role,
    email: member.email,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) newErrors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (!formData.subject || formData.subject.trim().length < 3) newErrors.subject = "Please add a subject.";
    if (!formData.message || formData.message.trim().length < 10) newErrors.message = "Message should be at least 10 characters.";
    if (formData.honeypot) return; // bot detected

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Simulate submit
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", category: "General", message: "", phone: "", honeypot: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section - simple & consistent */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          Contact NewtonBotics
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Reach out for workshops, projects, collaborations, or general queries.
        </p>
      </motion.div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-6 rounded-xl border border-green-500/30 bg-green-500/10 text-green-200 px-4 py-3 text-sm"
        >
          ✅ Thank you! Your message has been sent. Our team will get back to you soon.
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2 text-center font-display">Get In Touch</h2>
          <p className="text-white/60 text-center mb-6">We typically respond within 24–48 hours.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/80"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                aria-invalid={errors.name ? "true" : "false"}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                aria-invalid={errors.email ? "true" : "false"}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/80">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  aria-invalid={errors.subject ? "true" : "false"}
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-white/80">Category</label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                >
                  <option>General</option>
                  <option>Workshops</option>
                  <option>Projects</option>
                  <option>Inventory</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80">Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white/80"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleInputChange}
                maxLength={1000}
                aria-invalid={errors.message ? "true" : "false"}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
              <div className="flex items-center justify-between mt-1">
                {errors.message ? (
                  <p className="text-xs text-red-400">{errors.message}</p>
                ) : (
                  <span className="text-xs text-white/50">{formData.message.length}/1000</span>
                )}
              </div>
              {/* Honeypot for bots */}
              <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange} className="hidden" autoComplete="off" tabIndex={-1} />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-md hover:from-red-600 hover:to-red-500 transition duration-300 ease-in-out"
            >
              Send Message
            </motion.button>

            {/* Core Member Notification */}
            <div className="mt-4 bg-yellow-50/10 border-l-4 border-yellow-400 p-3 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <p className="text-yellow-200 text-sm">
                This message will be visible to all core team members
              </p>
            </div>
          </form>
        </motion.div>

        {/* Core Members Section */}
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center font-display">
            <Users className="mr-3 text-red-500" /> Core Members
          </h3>
          <div className="space-y-4">
            {coreMembersData.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-lg hover:bg-white/10 transition border border-white/10"
              >
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-sm text-white/80">{member.role}</p>
                </div>
                <a
                  href={`mailto:${member.email}`}
                  className="text-red-500 hover:text-red-600"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-white/80">
            <div className="flex items-center">
              <MapPin className="mr-3 text-red-500" />
              <span>
                {clubData.labDetails.location.building},{" "}
                {clubData.labDetails.location.floor}
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 text-red-500" />
              <span>{clubData.contactInfo.email}</span>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-white mb-2 font-display">
                Social Media
              </h4>
              <div className="flex space-x-4">
                <a
                  href={`https://instagram.com/${clubData.contactInfo.socialMedia.instagram.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600"
                >
                  Instagram
                </a>
                <a
                  href={`https://linkedin.com/company/${clubData.contactInfo.socialMedia.linkedin
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
