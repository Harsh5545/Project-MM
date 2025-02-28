"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaMoon, FaSun, FaChevronUp, FaGlobe } from "react-icons/fa";


const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(false);
  const [email, setEmail] = useState("");
  const  router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    alert("Thanks for subscribing!");
  };

  return (
    <footer className={`relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} transition-colors duration-300`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/MM.png"
                alt="Company Logo"
                className=" h-16 "
              />
          
            </div>
            <p className="text-sm">A sophisticated guide to cultural manner & etiquette</p>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-xs rounded-full bg-[#DEC29F] text-black">Soft Skills</span>
              <span className="px-3 py-1 text-xs rounded-full bg-[#DEC29F] text-black">Personality Enhancement</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <p className="text-lg font-semibold">Quick Links</p>
            <ul className="space-y-3">
              {["About Us", "Services", "Blogs"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => router.push(`/${item.toLowerCase().replace(" ", "-")}`)}
                    className="hover:text-[#eabf91] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <p className="text-lg font-semibold">Connect With Us</p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub].map((Icon, index) => (
                <button
                  key={index}
                  className="hover:text-[#eabf91] transition-colors duration-200"
                  aria-label="Social Media"
                >
                  <Icon className="h-6 w-6" />
                </button>
              ))}
            </div>
            <div className="space-y-2 flex flex-col text-sm">
              {/* <span className="text-sm font-semibold mb-0 lg:mb-10">Email</span> */}
              <a
                href="mailto:modernmannerism@gmail.com"
                className="text-base font-normal hover:underline"
              >
                modernmannerism@gmail.com
              </a>
              <a
                href="tel:+919867831324"
                className="text-base font-normal hover:underline"
              >
                +91 9867831324
              </a>
            </div>
          </div>

          {/* Newsletter & Language */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg font-semibold">Newsletter</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-opacity-10 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eabf91]"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-widest bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-slate-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
              </button>
              {/* <button className="flex items-center space-x-2 text-sm">
                <FaGlobe className="h-5 w-5" />
                <span>English</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p className="text-sm">&copy; 2025 Harsh Kajale. All rights reserved.</p>
            <div className="flex space-x-4 text-sm">
              <button onClick={()=> router.push('/privacy-policy')} className="hover:text-[#eabf91] transition-colors duration-200">Privacy Policy</button>
              <button onClick={()=> router.push('/terms')} className="hover:text-[#eabf91] transition-colors duration-200">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-[#eabf91] text-white shadow-lg hover:bg-[#eba255] transition-all duration-200 z-50"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Cookie Consent */}
      {!cookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-95 text-white p-4 z-50">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <p className="text-sm">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <button
              onClick={() => setCookieConsent(true)}
              className="px-4 py-2 tracking-widest bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white rounded-lg hover:bg-[#eba255] transition-colors duration-200"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;