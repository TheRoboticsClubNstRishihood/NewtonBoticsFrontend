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
    message: "",
  });

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
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
    alert("Message sent! Our team will get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white font-body py-12 px-4 sm:px-6 lg:px-8">
      {/* Robotics Header Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-blue-500/20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative h-64 md:h-80">
          <Image
            src={image1}
            alt="Robotics lab Image"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-indigo-600 opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white flex items-center font-display">
              Robotics Club Contact
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-blue-500/20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center font-display">
            Get In Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-blue-100"
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
                className="mt-1 block w-full rounded-md border border-blue-500/20 bg-white/10 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue-100"
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
                className="mt-1 block w-full rounded-md border border-blue-500/20 bg-white/10 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-blue-100"
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
                className="mt-1 block w-full rounded-md border border-blue-500/20 bg-white/10 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
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
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-blue-500/20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center font-display">
            <Users className="mr-3 text-cyan-400" /> Core Members
          </h3>
          <div className="space-y-4">
            {coreMembersData.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-lg hover:bg-white/10 transition border border-blue-500/20"
              >
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-sm text-blue-100">{member.role}</p>
                </div>
                <a
                  href={`mailto:${member.email}`}
                  className="text-cyan-400 hover:text-cyan-600"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-blue-100">
            <div className="flex items-center">
              <MapPin className="mr-3 text-cyan-400" />
              <span>
                {clubData.labDetails.location.building},{" "}
                {clubData.labDetails.location.floor}
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 text-cyan-400" />
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
                  className="text-pink-400 hover:text-pink-600"
                >
                  Instagram
                </a>
                <a
                  href={`https://linkedin.com/company/${clubData.contactInfo.socialMedia.linkedin
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
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
