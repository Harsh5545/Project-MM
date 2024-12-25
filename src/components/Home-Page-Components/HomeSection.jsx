"use client"
import React from "react";
import ShadcnButton from "../Atom/button/ShadcnButton";
import { Lato } from "next/font/google";

const dm_Sans = Lato({
  subsets: ["latin"],
  weight: ["400"], // Add weights if needed
});

const HomeSection = () => {
  return (
    <div>
      <div
        className="relative w-full"
        style={{
          backgroundImage: "url('/assets/Website-Background.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-25 dark:bg-opacity-30 dark:bg-[#060507] bg-[#FAE7F3]"></div>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-auto lg:h-72 gap-5 p-4 justify-evenly items-center">
          <p
            style={{ wordSpacing: "0.1rem" }}
            className="p-1 font-semibold text-sm md:text-base lg:text-2xl w-[90%] md:w-[60%] leading-relaxed md:leading-loose text-center text-black"
          >
            Become a part of Modern Mannerism <br className="hidden lg:visible" /> community to keep up to date with
            our courses, articles, and news. <br /> <br /> Become a better, more confident, and professional you!
          </p>
          <ShadcnButton
            className={`${dm_Sans.className} tracking-widest bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] font-extrabold text-white text-sm md:text-base px-6 py-3`}
          >
            JOIN NOW
          </ShadcnButton>
        </div>
        <style jsx>{`
        @media (max-width: 767px) {
          .bg-fixed {
            background-attachment: scroll;
          }
        }
      `}</style>
      </div>
      
    
    </div>
  );
};

export default HomeSection;
