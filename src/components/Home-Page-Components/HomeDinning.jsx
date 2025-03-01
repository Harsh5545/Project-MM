"use client"
import React from "react";
import { Cormorant_Garamond } from "next/font/google";
import ShadcnButton from "../Atom/button/ShadcnButton";
import { useRouter } from "next/navigation";


const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const HomeDinning = () => {
  const router = useRouter();
  return (
    <div className="relative w-full max-h-screen lg:max-h-screen bg-gray-100 dark:bg-gray-300">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/DiningSection.jpg"
          alt="Dining Section"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay for visibility */}
      <div className="absolute inset-0 bg-black/40 lg:w-1/2"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-end items-center max-h-screen lg:min-h-screen text-center lg:text-right ">
        {/* Empty Space for Desktop */}
        <div className="hidden lg:block lg:w-1/2"></div>

        {/* Content Area */}
        <div className="lg:w-1/2 w-full h-full lg:h-screen overflow-hidden bg-opacity-80 bg-[#793600] dark:bg-[#793600] flex flex-col gap-16 md:gap-16 items-center justify-center text-center p-2 lg:p-6  ">
          <h2 className={`${dm_Sans.className} uppercase pt-8 lg:pt-24 text-lg md:text-2xl lg:text-3xl font-semibold text-white dark:text-gray-300`}>
            Want to create a good <br /> impression during networking <br /> or business dinners?
          </h2>

          <h5 className={`${dm_Sans.className} text-2xl lg:text-6xl font-bold text-white dark:text-gray-100`}>
            Fine Dining <br /> Etiquette Workshop
          </h5>

          <p className={`${dm_Sans.className} text-base md:text-lg lg:text-2xl text-white dark:text-gray-300 font-light max-w-[90%] lg:max-w-[70%]`}>
            Learn the dos and don’ts to create a lasting impression.
          </p>

          <ShadcnButton
            className={`${dm_Sans.className} bg-white text-[#793600] outline-none text-sm md:text-base lg:text-lg px-6 py-3 rounded-full hover:bg-white hover:text-[#910A67] dark:hover:bg-[#910A67] dark:hover:text-white transition-all duration-300 transform hover:scale-105`}
            onClick={() => router.push("/services/fine-dining-etiquette-workshop")}
          >
            Learn More
          </ShadcnButton>;
        </div>
      </div>
    </div>
  );
};

export default HomeDinning;
