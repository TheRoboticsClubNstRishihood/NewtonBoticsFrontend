"use client";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import clubData from "../AllDatas/data.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        {/* Club Overview */}
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-xl font-bold">Robotics Club</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Innovating at the intersection of technology and creativity, pushing
            the boundaries of robotics and artificial intelligence.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href={`https://instagram.com/${clubData?.contactInfo?.socialMedia?.instagram.replace(
                "@",
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300"
            >
              <Instagram />
            </a>
            <a
              href={`https://linkedin.com/company/${clubData?.contactInfo?.socialMedia?.linkedin
                ?.replace(/\s+/g, "-")
                .toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <Linkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-indigo-300">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-gray-300 hover:text-white transition"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/workshops"
                className="text-gray-300 hover:text-white transition"
              >
                Workshops
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Recent Achievements */}
        <div>
          <h4 className="font-semibold mb-4 text-indigo-300">
            Recent Achievements
          </h4>
          <ul className="space-y-2">
            {clubData?.achievements?.map((achievement, index) => (
              <li
                key={index}
                className="text-gray-300 text-sm flex items-center"
              >
                <span className="mr-2 text-green-400">●</span>
                {achievement}
              </li>
            )) || <li className="text-gray-400">No achievements available</li>}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="font-semibold mb-4 text-indigo-300">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-indigo-400" />
              <span className="text-gray-300">
                {clubData?.labDetails?.location?.building || "Unknown Building"}
                , {clubData?.labDetails?.location?.floor || "Unknown Floor"}
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-indigo-400" />
              <span className="text-gray-300">
                {clubData?.contactInfo?.email || "No Email Available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Founding Information */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Robotics Club. Founded by{" "}
            {clubData?.clubFoundation?.foundedBy?.join(" & ") || "Unknown"}
          </p>
          <p className="text-gray-400 text-sm">
            Established in {clubData?.clubFoundation?.foundedYear || "N/A"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
