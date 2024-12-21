// components/Navbar.js
"use client"
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 
 
  return (
    <nav className="sticky top-0 z-[100] flex justify-between items-center h-14 w-full bg-purple-700/35 border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center ">
          <a
            href="/DashBoard"
            className="text-2xl font-bold hover:text-blue-500 transition"
          >
            Robotics Club
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="/DashBoard" className="hover:text-blue-500 transition">
            Home
          </a>
          <a href="/aboutus" className="hover:text-blue-500 transition">
            About Us
          </a>
          <a href="#projects" className="hover:text-blue-500 transition">
            Projects
          </a>
          <a href="#projects" className="hover:text-blue-500 transition">
            Workshops
          </a>
          <a href="#inventory" className="hover:text-blue-500 transition">
            Inventory
          </a>
          <a href="/ourTeam" className="hover:text-blue-500 transition">
            Team
          </a>
          <a href="/contact" className="hover:text-blue-500 transition">
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <a href="/" className="block py-2 px-4 hover:bg-gray-700 transition">
            Home
          </a>
          <a
            href="/aboutus"
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            About Us
          </a>
          <a
            href="#projects"
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Projects
          </a>
          <a
            href="#projects"
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Workshops
          </a>
          <a
            href="#inventory"
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Inventory
          </a>
          <a
            href="/ourTeam"
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Team
          </a>
          <a
            href="/contact"
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



