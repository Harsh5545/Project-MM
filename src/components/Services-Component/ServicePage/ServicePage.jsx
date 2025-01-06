"use client";

import React, { useEffect, useState } from "react";
import { servicesDataPage } from "@/data";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
// import { Box } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=line_start_diamond" />
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { FaCheckCircle, FaStar, FaHeart } from 'react-icons/fa';
import ShadcnButton from "@/components/Atom/button/ShadcnButton";
import { FaCheckCircle, FaHeart, FaStar } from "react-icons/fa"; // Importing an icon from react-icons
// import { Button } from "../ui/moving-border";


import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Overview from "./Overview";
import Faq from "./Faq";
import ProgramHighlights from "./ProgramHighlight";
import ProgramDetails from "./ProgramDetails";
import Testimonials from "./Testimonial";
import ServicesHero from "./ServicesHero";

const dm_Sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  // Add weights if needed
});
const dm_Sanss = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});
const ServicePage = ({ params }) => {
  const { id } = JSON.parse(params.value);
  const [foundService, setFoundService] = useState(null);

  useEffect(() => {
    if (id) {
      const service = servicesDataPage.find((service) => service.id === id);
      setFoundService(service);
    }
  }, [id]);

  if (!foundService) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  const {
    title,
    headline,
    subheadline,
    overview,
    programOptions,
    learningPoints,
    highlights,
    testimonials,
    faqData,
    heroimage,
  } = foundService;

  console.log(foundService, 'dkfjk')

  const carouselResponsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };
  const icons = [FaCheckCircle, FaStar, FaHeart]; // Array of icons to use

  return (
    <div className="flex h-full dark:bg-[rgb(0,0,31)] bg-[#FFFFFF] items-center pb-4  justify-center w-full flex-col  ">
      {/* Hero Section */}
     
      <div
        className="  w-full  pb-5 bg-cover bg-center flex items-end justify-center"
      // style={{ backgroundImage: `url(${heroimage})`,}}
      > <ServicesHero className="relative"/>

        {/* <div className="absolute inset-0 bg-[#793600] opacity-25"></div> */}
        <div className=" flex absolute pb-8 flex-col justify-center items-center text-center text-black">
          <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9e7033] via-[#c3965d] to-[#9e7033]  uppercase">{title}</h1>
          <h2 className={`${dm_Sans.className} mt-4 px-2 text-lg lg:text-xl`}>{headline}</h2>


        </div>
      </div>
      <div className="w-full flex items-center justify-center bg-[#F7F7F7]">
        <div className="w-[96%] md:w-[70%]">
          <section className="mt-4 px-4 md:px-12 py-0 text-center">
            <p className={`${dm_Sans.className} text-center text-gray-900 text-base  mx-2 lg:text-lg  `}>{subheadline}</p>
          </section>
          {/* <section className=" flex justify-center items-center">
        
        </section> */}
          {/* Overview Section */}

          <Overview programOptions={programOptions} overview={overview} />
          <ProgramHighlights programDetailsData={highlights} />
          {/*Program details Section */}
          {/* What They’ll Learn Section */}
          <section className="mt-8 py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
            <h2 className=" text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] pb-6">What They’ll Learn</h2>
            <div className={`${dm_Sanss.className} mt-8 grid grid-cols-1 md:grid-cols-2 gap-4`}>
              {learningPoints.map((point, index) => {
                const IconComponent = icons[index % icons.length]; // Cycle through icons
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }} rt
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                  >
                    <div className="flex justify-center items-center w-7 h-7 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] rounded-full shadow-lg">
                      <FaStar className="text-white w-4  h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-normal text-gray-900 dark:text-white">{point.title}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>


        
         

          <ProgramDetails />
          {/* Call to Action */}
          <section className="my-14 py-4 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] opacity-90 rounded-lg text-center">
            <h2 className="lg:text-4xl text-2xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-50">
              Help Your Child Shine with Confidence and Polished Manners!
            </h2>
            <ShadcnButton
              variant="contained"
              className={`${dm_Sanss.className} rounded-full w-auto bg-gradient-to-r from-white to-slate-50 text-[#dd9f5d] border-2 border-[#dd9f5d] hover:text-gray-900 p-2 px-4 sm:px-6 sm:py-2 md:px-8 md:py-2 lg:px-8 lg:py-2 text-sm sm:text-base md:text-base lg:text-base shadow-lg`}
            >
              Register Now
            </ShadcnButton>
          </section>
          {/* Why Choose Modern Mannerism Section */}


          {/* Testimonials Section */}
          {/* <section className="mt-14 w-full text-center">
            <h2 className="text-4xl font-semibold text-black">
              Testimonials
            </h2>
            <div className="mt-6  relative">
              <Carousel className="py-0">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className=" p-6 rounded-lg shadow-md mx-2 w-full sm:w-auto">
                          <CardContent className="flex flex-col items-center justify-center p-6">
                            <p className="italic">{testimonial.quote}</p>
                            <footer className="text-right mt-4">- {testimonial.author}</footer>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 transform -translate-y-1/2 top-1/2" />
                <CarouselNext className="absolute right-0 transform -translate-y-1/2 top-1/2" />
              </Carousel>
            </div>
          </section> */}
          <Testimonials />

          {/* FAQ Section */}

          <Faq faqData={faqData} />
        </div></div>
    </div>
  );
};

export default ServicePage;
  {/* Program Highlights Section */}
          {/* <section className="mt-14 text-center">
            <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6">
              Program Highlights
            </span>
            <ul className="mt-6 py-4 bg-white mx-2 rounded-lg shadow-md items-center flex flex-wrap md:px-24 px-4 justify-start gap-1">
              {highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="p-2 text-gray-600 flex items-center gap-1"
                >
                  <div className="flex text-left gap-4 items-center">
                    <CheckCircle className="text-gray-700" />
                    {highlight}
                  </div>
                </li>

              ))}
            </ul>

          </section> */}