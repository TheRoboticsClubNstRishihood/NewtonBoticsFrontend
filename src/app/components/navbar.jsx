// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-lg" : "bg-black/70"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
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
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out bg-black/95 backdrop-blur-lg overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
        style={{ zIndex: 90 }}
      >
        <div className="py-2">
          <a
            href="/DashBoard"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/aboutus"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </a>
          <a
            href="/Projects"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </a>
          <a
            href="/Workshops"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Workshops
          </a>
          <a
            href="/Inventory"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Inventory
          </a>
          <a
            href="/ourTeam"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Team
          </a>
          <a
            href="/ProjectRequests"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Project Requests
          </a>
          <a
            href="/contact"
            className="block py-2 px-4 text-white hover:bg-red-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </a>
          {/* Register Button */}
          <a
            href="/login"
            className="block mx-4 my-3 py-2 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
