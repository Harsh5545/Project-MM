"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaMedium, FaChevronUp } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Moon, Sun } from "lucide-react"; // Icons from ShadCN
import { Cormorant_Garamond, EB_Garamond, Montserrat } from "next/font/google"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
})

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})
const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(systemTheme === "light" ? "dark" : "light");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <footer className={`relative overflow-hidden ${currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"} transition-colors duration-300`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/MM-Logo.png"
                alt="Company Logo"
                className="md:h-16 h-12"
              />
            </div>
            <p className={`${montserrat.className} text-sm md:text-base`}>A sophisticated guide to cultural manner & etiquette</p>
          </div>

          {/* Quick Navigation */}
          <div className={`${montserrat.className} space-y-4  w-full`}>
            <p className="text-lg  font-semibold">Quick Links</p>
            <ul className={`${ebGaramond.className} space-y-3 text-center `}>
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
            <p className={`${montserrat.className} text-lg font-semibold`}>Connect With Us</p>
            <div className="flex space-x-4">
            <a href="https://www.linkedin.com/company/modernmannerism/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-[#eabf91] transition-colors duration-200" aria-label="LinkedIn">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/modernmannerism/" target="_blank" rel="noopener noreferrer" className="hover:text-[#eabf91] transition-colors duration-200" aria-label="Instagram">
                <FaInstagram className="h-6 w-6" />
              </a>
             
              <a href="https://medium.com/@modernmannerism" target="_blank" rel="noopener noreferrer" className="hover:text-[#eabf91] transition-colors duration-200" aria-label="Medium">
                <FaMedium className="h-6 w-6" />
              </a><a href="https://www.facebook.com/modernmannerism/" target="_blank" rel="noopener noreferrer" className="hover:text-[#eabf91] transition-colors duration-200" aria-label="Facebook">
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
            <div className={`${ebGaramond.className} space-y-2 flex flex-col gap-4 lg:gap-1 text-base`}>
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

          {/* Newsletter & Theme Switcher */}
          <div className="space-y-6">
            <div className="space-y-4 flex justify-center flex-col">
              <p className={`${montserrat.className} text-lg font-semibold`}>Newsletter</p>
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
                  className={`${ebGaramond.className} w-fit md:w-full px-4 py-2 tracking-widest bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-slate-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="flex items-center gap-2"
              >
                {currentTheme === "light" ? (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Light Mode</span>
                  </>
                )}
              </Button>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`${ebGaramond.className} mt-12 pt-8 border-t border-gray-200 dark:border-gray-700`}>
          <div className="flex justify-between md:flex-row flex-col items-center lg:gap-0 gap-4">
            <p className="text-base">&copy; 2025 ModernMannerism. All rights reserved.</p>
           
            <div className="flex gap-2 text-center text-base">
              <button onClick={() => router.push('/privacy-policy')} className="hover:text-[#eabf91] transition-colors duration-200">Privacy Policy</button><span >|</span>
              <button onClick={() => router.push('/terms')} className="hover:text-[#eabf91] transition-colors duration-200">Terms</button>
            </div>
            <div className="text-center">
              <p className="text-base">Developed by <a href="https://alberow.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#eabf91] transition-colors duration-200">Alberow</a></p>
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
    </footer>
  );
};

export default Footer;