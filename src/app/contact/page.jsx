"use client";
import React, { useState } from "react";
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Robotics Header Section */}
      <div className="max-w-7xl mx-auto mb-12 bg-white shadow-lg rounded-lg overflow-hidden">
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
            <h1 className="text-4xl font-bold text-white flex items-center">
              Robotics Club Contact
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Get In Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Send Message
            </button>

            {/* Core Member Notification */}
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
              <p className="text-yellow-700 text-sm">
                This message will be visible to all core team members
              </p>
            </div>
          </form>
        </div>

        {/* Core Members Section */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Users className="mr-3 text-indigo-600" /> Core Members
          </h3>
          <div className="space-y-4">
            {coreMembersData.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
                <a
                  href={`mailto:${member.email}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-gray-700">
            <div className="flex items-center">
              <MapPin className="mr-3 text-indigo-600" />
              <span>
                {clubData.labDetails.location.building},{" "}
                {clubData.labDetails.location.floor}
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 text-indigo-600" />
              <span>{clubData.contactInfo.email}</span>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
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
                  className="text-pink-600 hover:text-pink-800"
                >
                  Instagram
                </a>
                <a
                  href={`https://linkedin.com/company/${clubData.contactInfo.socialMedia.linkedin
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
