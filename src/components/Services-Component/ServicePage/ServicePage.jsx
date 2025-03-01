"use client";
import React from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import ShadcnButton from "@/components/Atom/button/ShadcnButton";
import { FaCheckCircle, FaHeart, FaStar } from "react-icons/fa";
import "react-multi-carousel/lib/styles.css";
import Overview from "./Overview";
import Faq from "./Faq";
import ProgramHighlights from "./ProgramHighlight";
import ProgramDetails from "./ProgramDetails";
import Testimonials from "./Testimonial";
import ServicesHero from "./ServicesHero";
import icons from "@/hooks/icons";

const dm_Sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],

});
const dm_Sanss = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});
const ServicePage = ({ data }) => {

  const {
    heading,
    subheading,
    courseDescription,
    courseDetails,
    programDetails,
    testimonials

  } = data;


  if (!data) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex h-full dark:bg-[rgb(0,0,31)] bg-[#FFFFFF] items-center  justify-center w-full flex-col  ">


      <div className="  w-full  pb-5 bg-cover bg-center flex items-end justify-center">
        <ServicesHero data={testimonials.heroImage} className="relative" />


        <div className=" flex absolute pb-8 flex-col justify-center items-center text-center text-black">
          <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9e7033] via-[#c3965d] to-[#9e7033]  uppercase">{heading}</h1>
          <h2 className={`${dm_Sans.className} mt-4 px-2 text-lg lg:text-xl`}>{subheading}</h2>


        </div>
      </div>
      <div className="w-full flex items-center justify-center dark:bg-[rgb(0,0,31)] bg-[#F7F7F7]">
        <div className="w-[96%] md:w-[70%]">
          <section className="mt-4 px-4 md:px-12 py-0 text-center">
            <p className={`${dm_Sans.className} text-center text-gray-900 dark:text-gray-100 text-base  mx-2 lg:text-lg  `}>{courseDescription}</p>
          </section>

          <Overview data={courseDetails} />
          <ProgramHighlights data={courseDetails} />

          <section className="mt-8 py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
          <h5 className=" text-3xl md:text-4xl font-bold bg-clip-text text-center text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] leading-tight pb-6">Curriculum Overview</h5>
            <div className={`${dm_Sanss.className} mt-8 grid grid-cols-1 md:grid-cols-2 gap-4`}>
              {courseDetails?.courseDetail?.map((point, index) => {

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                  >
                    <div className="flex justify-center items-center w-7 h-7 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] rounded-full shadow-lg">
                    {icons[point.icon] ? React.cloneElement(icons[point.icon], { size: 25, color:"#ffffff" }) : null}
                   
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-normal text-gray-900 dark:text-white">
                        {point?.description || 'No Heading Available'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
          <ProgramDetails data={programDetails} />
          {/* Call to Action */} 
          <section className="my-14 py-4 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] opacity-90 rounded-lg text-center">
            <p className="lg:text-4xl text-2xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-50">
            {testimonials?.taglineHeading || 'No Heading Available'}
            </p>
            <ShadcnButton
              variant="contained"
              className={`${dm_Sanss.className} rounded-full w-auto bg-gradient-to-r from-white to-slate-50 text-[#dd9f5d] border-2 border-[#dd9f5d] hover:text-gray-900 p-2 px-4 sm:px-6 sm:py-2 md:px-8 md:py-2 lg:px-8 lg:py-2 text-sm sm:text-base md:text-base lg:text-base shadow-lg`}
            >
              Register Now
            </ShadcnButton>
          </section>

           <Testimonials data={testimonials}/>
          <Faq data={testimonials} /> 
        </div></div>
    </div>
  );
};

export default ServicePage;
