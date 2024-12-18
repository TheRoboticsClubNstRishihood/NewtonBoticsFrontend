"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Building, Trophy, Wrench, Star } from "lucide-react";
import Navbar from "../components/navbar";
import clubData from "../AllDatas/data.json";

const AboutUs = () => {
  return (
    <div className="text-black min-h-screen bg-gray-50">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-400 text-white py-16">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Robotics Club
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Innovating the future through cutting-edge robotics and technology
          </motion.p>
        </div>
      </section>

      {/* Lab Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Building className="w-12 h-12 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">
              Our Robotics Lab
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-100 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">Location</h3>
              <p className="text-gray-700">
                Located on the Third Floor of the Academic Block at Rishihood
                University
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-100 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">Key Equipment</h3>
              <ul className="list-disc list-inside text-gray-700">
                {clubData.labDetails.equipment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-8"
          >
            <Users className="w-12 h-12 text-green-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">
              Club Leadership
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {clubData.leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {leader.name}
                </h3>
                <p className="text-gray-600">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops and Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Workshops */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center mb-8">
                <Wrench className="w-12 h-12 text-purple-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">
                  Our Workshops
                </h2>
              </div>
              <div className="space-y-4">
                {clubData.workshops.map((workshop, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold">{workshop.name}</h3>
                    <p className="text-gray-600">{workshop.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center mb-8">
                <Trophy className="w-12 h-12 text-yellow-500 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">
                  Achievements
                </h2>
              </div>
              <div className="space-y-4">
                {clubData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg flex items-center"
                  >
                    <Star className="w-6 h-6 text-blue-600 mr-4" />
                    <p className="text-gray-800">{achievement}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default AboutUs;
