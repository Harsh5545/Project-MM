"use client";
import React from "react";
import { Cormorant_Garamond, Montserrat, Playfair_Display } from "next/font/google";
import icons from "@/hooks/icons";
import Image from "next/image";
import { motion } from "framer-motion";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montserrat =Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const Overview = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col py-12 md:py-20 lg:py-24 w-full"
    >
      {/* Main Content */}
      <div className="flex relative dark:bg-[#00001F] gap-8 md:gap-12 justify-center flex-col md:flex-row items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full max-w-[90%] md:max-w-none md:w-2/5 relative flex justify-center mx-auto md:mx-2 mb-10 md:mb-0 items-center"
        >
          <div className="relative">
            {/* Gold decorative element */}
            {/* <div className="absolute -right-4 -top-4 w-full h-full border-2 border-[#eabf91] rounded-2xl z-0"></div> */}

            <Image
              width={800}
              height={600}
              alt={`${data?.overviewDescription?.slice(0, 3) || "Overview image"}`}
              src={data?.overviewImage || "/placeholder.svg?height=600&width=500"}
              className="shadow-2xl h-auto max-h-[45vh] md:max-h-[55vh] lg:max-h-[65vh] rounded-2xl object-cover z-10"
              style={{
                boxShadow:
                "black 0px 0px 0px 2px inset, rgba(255, 255, 255, 1) 10px -10px 0px -2px, #eabf91 10px -10px",

              }}
            />

            {/* Decorative corner elements */}
            {/* <div className="absolute -left-3 -top-3 w-12 h-12 border-t-2 border-l-2 border-[#c3965d]"></div>
            <div className="absolute -right-3 -bottom-3 w-12 h-12 border-b-2 border-r-2 border-[#c3965d]"></div> */}
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full px-4 md:px-0 md:w-3/5 flex flex-col justify-between items-center gap-2 md:gap-4"
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3
              className={`${cormorant.className} text-2xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6 md:mb-8 tracking-wide`}
            >
              Overview
            </h3>
          </div>

          {/* Description */}
          <p className={`${montserrat.className} text-gray-800 dark:text-white p-2 text-center text-base md:text-base leading-relaxed`} >
            {data?.overviewDescription}
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:gap-4 lg:gap-8 justify-between items-stretch p-2 md:p-4 lg:p-6 w-full">
            {data?.courseHeadings?.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex justify-center items-center gap-2 md:gap-4 lg:gap-8 flex-1"
              >
                <div className="flex flex-col items-center gap-4 md:gap-5 border-2 border-[#eabf91] border-opacity-90 dark:border-[#eabf91] bg-white dark:bg-[#1A1A3B] p-5 md:p-6 lg:p-8 rounded-xl shadow-lg w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {icons[option.icon]
                    ? React.cloneElement(icons[option.icon], {
                        size: 36,
                        className: "w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12",
                        color: "#eabf91",
                      })
                    : null}
                  <span
                    className={`${cormorant.className} font-bold dark:text-white text-xl md:text-2xl lg:text-3xl text-[#06273A] text-center`}
                  >
                    {option.heading}
                  </span>
                  <p className={`${montserrat.className} text-gray-700 dark:text-gray-300 text-sm md:text-sm text-center`}>
                    {option.subheading}
                  </p>
                </div>
                <div
                  className={`hidden md:block ${index == data?.courseHeadings?.length - 1 ? "invisible" : "visible"}`}
                  style={{
                    height: "auto",
                    width: 2,
                    backgroundColor: "#eabf91",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Overview;