import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-14 " >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
      
        <div>
          <h3 className="text-xl font-semibold mb-2">About This App</h3>
          <p className="text-gray-400 text-sm">
            A simple blogging platform to share your thoughts, ideas, and knowledge with the world.
          </p>
        </div>

      
        <div>
          <h3 className="text-xl font-semibold mb-2">Navigation</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
            <li><Link to="/signin" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

   
        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Me</h3>
          <div className="flex space-x-4 text-gray-300">
            <a href="https://github.com/piy-12" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/piyush-ahuja-18a17826b" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/piyush.ah1" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      
      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
