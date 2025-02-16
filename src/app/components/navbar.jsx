// components/Navbar.js
"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-[100] flex justify-between items-center h-14 w-full bg-black/90 border-red-800 backdrop-blur-lg transition-all">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="/DashBoard"
            className="text-2xl font-bold text-white hover:text-red-500 transition"
          >
            Robotics Club
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <a
            href="/DashBoard"
            className="text-white hover:text-red-500 transition"
          >
            Home
          </a>
          <a
            href="/aboutus"
            className="text-white hover:text-red-500 transition"
          >
            About Us
          </a>
          <a
            href="/Projects"
            className="text-white hover:text-red-500 transition"
          >
            Projects
          </a>
          <a
            href="/Workshops"
            className="text-white hover:text-red-500 transition"
          >
            Workshops
          </a>
          <a
            href="/Inventory"
            className="text-white hover:text-red-500 transition"
          >
            Inventory
          </a>
          <a
            href="/ourTeam"
            className="text-white hover:text-red-500 transition"
          >
            Team
          </a>
          <a
            href="/ProjectRequests"
            className="text-white hover:text-red-500 transition"
          >
            Project Requests
          </a>
          <a
            href="/contact"
            className="text-white hover:text-red-500 transition"
          >
            Contact Us
          </a>
          {/* Register Button */}
          <a
            href="/login"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black">
          <a
            href="/DashBoard"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
          >
            Home
          </a>
          <a
            href="/aboutus"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
          >
            About Us
          </a>
          <a
            href="#projects"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
          >
            Projects
          </a>
          <a
            href="#projects"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
          >
            Workshops
          </a>
          <a
            href="#inventory"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
          >
            Inventory
          </a>
          <a
            href="/ourTeam"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
          >
            Team
          </a>
          <a
            href="/contact"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
          >
            Contact Us
          </a>
          {/* Register Button */}
          <a
            href="/login"
            className="block py-2 px-4 bg-red-600 text-white text-center hover:bg-red-700 transition"
          >
            Register
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
