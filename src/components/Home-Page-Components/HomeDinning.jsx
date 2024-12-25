import React from "react";
// import { Button } from '@shadcn/ui/button'; // or similar

import { Cormorant_Garamond } from "next/font/google";
import ShadcnButton from "../Atom/button/ShadcnButton";

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});

const HomeDinning = () => {
  return (
    <div className="relative w-full  lg:h-screen bg-gray-100 dark:bg-gray-300">
      {/* Full-screen background image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/DiningSection.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 lg:w-1/2 "></div>
      </div>

      {/* Content */}
      <div className="relative h-full z-10 flex flex-col lg:flex-row justify-end items-center lg:h-screen text-center lg:text-right gap-8">
        {/* Empty Left Side for Larger Screens */}
        <div className="hidden lg:hidden lg:block lg:w-1/2"></div>

        {/* Content on the Right Side */}
        <div className="lg:w-1/2 w-full h-full bg-opacity-70 dark:bg-opacity-80 bg-[#793600] dark:bg-[#793600]">
          <div className="flex h-full gap-8 py-8 lg:py-24 md:gap-12 lg:gap-16 justify-between items-center text-center flex-col">
            <h2
              className={`${dm_Sans.className} uppercase text-lg md:text-2xl lg:text-3xl font-semibold text-white dark:text-gray-300`}
            >
              Want to create a good
              <br /> impression during networking
              <br /> or business dinners?
            </h2>

            <h5
              className={`${dm_Sans.className} text-2xl lg:text-6xl font-bold text-white dark:text-gray-100`}
            >
              Fine Dining <br /> Etiquette Workshop
            </h5>

            <p
              className={`${dm_Sans.className} text-base md:text-lg lg:text-2xl text-white dark:text-gray-300 font-light max-w-[90%] lg:max-w-[70%]`}
            >
              Learn the dos and don’ts to create a lasting impression.
            </p>

            <ShadcnButton
              className={`${dm_Sans.className} bg-white text-[#793600] outline-none text-sm md:text-base lg:text-lg px-6 py-3 rounded-full hover:bg-white hover:text-[#910A67] dark:hover:bg-[#910A67] dark:hover:text-white transition-all duration-300 transform hover:scale-105`}
            >
              Learn More
            </ShadcnButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDinning;
