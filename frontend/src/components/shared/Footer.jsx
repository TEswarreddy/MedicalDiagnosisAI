// Import necessary modules and dependencies
import React from 'react';
import { FaSquareThreads } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-black border-t-2 border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4">
        {/* Logo and Text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-1 hover:text-blue-600 transition duration-300 ease-in-out">
            <span className="text-black">T</span>
            <span className="text-black-600">Eswarreddy</span>
          </h2>
          <p className="text-sm text-gray-900 opacity-80">
            © 2025 AI. All rights reserved.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center md:justify-end space-x-6">
          {[
            { Icon: FaFacebookSquare, href: "", label: "Facebook" },
            { Icon: FaXTwitter, href: "", label: "Twitter" },
            { Icon: FaLinkedin, href: "", label: "LinkedIn" },
            { Icon: FaInstagramSquare, href: "", label: "Instagram" },
            { Icon: FaSquareThreads, href: "", label: "Threads" }
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="text-gray-900 hover:text-blue-500 transition-colors duration-300 ease-in-out transform hover:-translate-y-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon className="w-8 h-8 drop-shadow-md" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
