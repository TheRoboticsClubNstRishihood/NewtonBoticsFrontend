// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  // Function to check if a link is active
  const isActive = (path) => {
    if (path === "/DashBoard" || path === "/") {
      return pathname === "/DashBoard" || pathname === "/";
    }
    return pathname === path;
  };

  // Function to get active styles
  const getActiveStyles = (path) => {
    const active = isActive(path);
    return active
      ? "text-red-500 font-semibold border-b-2 border-red-500"
      : "text-white hover:text-red-500 transition";
  };

  // Function to get mobile active styles
  const getMobileActiveStyles = (path) => {
    const active = isActive(path);
    return active
      ? "block py-2 px-4 text-red-500 font-semibold bg-red-900/50 border-l-4 border-red-500 transition"
      : "block py-2 px-4 text-white hover:bg-red-900 transition";
  };

  return (
    <nav
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-lg" : "bg-black/70"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/DashBoard"
            className="text-2xl font-bold text-white hover:text-red-500 transition"
          >
            Robotics Club
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/DashBoard"
            className={`${getActiveStyles("/DashBoard")} pb-1`}
          >
            Home
          </Link>
          <Link
            href="/aboutus"
            className={`${getActiveStyles("/aboutus")} pb-1`}
          >
            About Us
          </Link>
          <Link
            href="/Projects"
            className={`${getActiveStyles("/Projects")} pb-1`}
          >
            Projects
          </Link>
          <Link
            href="/Workshops"
            className={`${getActiveStyles("/Workshops")} pb-1`}
          >
            Workshops
          </Link>
          <Link
            href="/Events"
            className={`${getActiveStyles("/Events")} pb-1`}
          >
            Events
          </Link>
          <Link
            href="/News"
            className={`${getActiveStyles("/News")} pb-1`}
          >
            News
          </Link>
          <Link
            href="/Inventory"
            className={`${getActiveStyles("/Inventory")} pb-1`}
          >
            Inventory
          </Link>
          <Link
            href="/ourTeam"
            className={`${getActiveStyles("/ourTeam")} pb-1`}
          >
            Team
          </Link>
          <Link
            href="/ProjectRequests"
            className={`${getActiveStyles("/ProjectRequests")} pb-1`}
          >
            Project Requests
          </Link>
          <Link
            href="/contact"
            className={`${getActiveStyles("/contact")} pb-1`}
          >
            Contact Us
          </Link>
          {/* Register Button */}
          <Link
            href="/login"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Register
          </Link>
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
          <Link
            href="/DashBoard"
            className={getMobileActiveStyles("/DashBoard")}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/aboutus"
            className={getMobileActiveStyles("/aboutus")}
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/Projects"
            className={getMobileActiveStyles("/Projects")}
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/Workshops"
            className={getMobileActiveStyles("/Workshops")}
            onClick={() => setIsOpen(false)}
          >
            Workshops
          </Link>
          <Link
            href="/Events"
            className={getMobileActiveStyles("/Events")}
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/News"
            className={getMobileActiveStyles("/News")}
            onClick={() => setIsOpen(false)}
          >
            News
          </Link>
          <Link
            href="/Inventory"
            className={getMobileActiveStyles("/Inventory")}
            onClick={() => setIsOpen(false)}
          >
            Inventory
          </Link>
          <Link
            href="/ourTeam"
            className={getMobileActiveStyles("/ourTeam")}
            onClick={() => setIsOpen(false)}
          >
            Team
          </Link>
          <Link
            href="/ProjectRequests"
            className={getMobileActiveStyles("/ProjectRequests")}
            onClick={() => setIsOpen(false)}
          >
            Project Requests
          </Link>
          <Link
            href="/contact"
            className={getMobileActiveStyles("/contact")}
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          {/* Register Button */}
          <Link
            href="/login"
            className="block mx-4 my-3 py-2 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
