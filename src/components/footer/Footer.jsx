"use client";

import { useEffect, useState } from "react";
import Socials from "./SocialIcons";
import SocialMobile from "./SocialMobile";

const Footer = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <footer className="dark:bg-[#00001F] bg-gray-50 text-black dark:text-white p-5 border-t-10 flex flex-col relative h-[80vh]">
      {/* "Contact Us" Header in Top Left */}
      <div className="absolute top-8 left-8 text-4xl md:text-6xl font-semibold">
        Get in Touch
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 px-0 py-12">
          {/* Phone Section */}
          <div className="text-center flex flex-col items-center md:w-1/4">
            <span className="text-lg font-semibold mb-10">Phone</span>
            <a
              href="tel:+919867831324"
              className="text-lg font-medium hover:underline"
            >
              +91 9867831324
            </a>
          </div>

          {/* Email Section */}
          <div className="text-center flex flex-col items-center md:w-1/4">
            <span className="text-lg font-semibold mb-10">Email</span>
            <a
              href="mailto:modernmannerism@gmail.com"
              className="text-lg font-medium hover:underline"
            >
              modernmannerism@gmail.com
            </a>
          </div>

          {/* Social Media Section */}
          <div className="text-center flex flex-col items-center md:w-1/4">
            <span className="text-lg font-semibold mb-1">Social</span>
            <div className="flex justify-center items-center mt-1">
              <Socials />
              <SocialMobile />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Theme Toggle Button */}
      <div className="absolute bottom-4 left-4 sm:left-8 sm:bottom-5">
        <label className="inline-flex items-center relative">
          <input
            className="peer hidden"
            id="toggle"
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <div className="relative w-[90px] h-[40px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[35px] after:h-[35px] after:bg-gray-400 peer-checked:after:bg-gray-400 after:rounded-full after:top-[2.5px] after:left-[5px] peer-checked:after:left-[50px] after:transition-all duration-300 shadow-md"></div>
          <svg
            height="0"
            width="100"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-black absolute w-5 h-5 left-[10px] peer-checked:opacity-0 peer-checked:fill-black transition-opacity duration-300"
          >
            <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
          </svg>
          <svg
            height="512"
            width="512"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white absolute w-5 h-5 right-[10px] peer-checked:opacity-100 opacity-0 transition-opacity duration-300"
          >
            <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
          </svg>
        </label>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-10 md:py-4 text-sm">
        &copy; 2024 Modern Mannerism |
        <span className="px-1 cursor-pointer">Privacy-Policy</span> |{" "}
        <span className="px-1 cursor-pointer">Terms</span> | Designed by Harsh
      </div>
    </footer>
  );
};

export default Footer;
