import { Button } from "@nextui-org/react";
import React from "react";
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
        <div className="flex flex-col md:flex-row h-auto lg:h-72 gap-5 p-6 sm:p-10 md:p-16 lg:p-24 justify-center md:justify-evenly items-center">
          <p
            style={{ wordSpacing: "0.1rem" }}
            className="p-2 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl w-[95%] sm:w-[80%] md:w-[60%] leading-normal sm:leading-relaxed md:leading-loose text-center text-black"
          >
            Become a part of Modern Mannerism community to keep up to date with
            our courses, articles, and news. <br /> <br  /> Become a better, more confident, and
            professional you!
          </p>
          <Button
            className={`${dm_Sans.className} tracking-widest bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] font-extrabold text-white text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4`}
          >
            JOIN NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
