"use client";

import React, { useEffect, useState } from "react";
import { servicesDataPage } from "@/data";
import { DM_Sans } from "next/font/google";
// import { Box } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ShadcnButton from "@/components/Atom/button/ShadcnButton";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa"; // Importing an icon from react-icons
import { CheckCircle } from "lucide-react";
import  { HoverEffect }  from "@/components/ui/hover-effect";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
const dm_Sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  // Add weights if needed
});

const ServicePage = ({ params }) => {
  const { id } = JSON.parse(params.value);
  const [foundService, setFoundService] = useState(null);
  const [expandedPoint, setExpandedPoint] = useState(null);


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

  return (
    <div className="flex h-full dark:bg-[rgb(0,0,31)] bg-[#FFFFFF] items-center pb-4 md:pb-10 justify-center w-full flex-col  ">
      {/* Hero Section */}
      <div
        className=" mt-36 w-full pb-5 bg-cover bg-center flex items-end justify-center"
      // style={{ backgroundImage: `url(${heroimage})`,}}
      >
        {/* <div className="absolute inset-0 bg-[#793600] opacity-25"></div> */}
        <div className="relative flex flex-col justify-center items-center text-center text-black">
          <h1 className="text-2xl lg:text-4xl font-bold uppercase">{title}</h1>
          <h2 className={`${dm_Sans.className} mt-4 px-2 text-lg lg:text-xl`}>{headline}</h2>
      
          
        </div>
      </div>
      <div className="w-full flex justify-center bg-[#F7F7F7]">
      <div className="w-[96%] md:w-[60%]">
      <section className="mt-4 px-4 py-2  text-center">
          <p className="text-center text-gray-500 text-base lg:text-xl mx-2 lg:text-md">{subheadline}</p>
        </section>
        {/* <section className=" flex justify-center items-center">
        
        </section> */}
        {/* Overview Section */}
        <section className="mt-14 py-8 px-2 md:px-8 lg:px-8 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg w-full relative z-10">
      <div className="flex flex-col gap-8 md:flex-row items-start justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <motion.h2
            className="text-4xl font-bold text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Overview
          </motion.h2>
          <motion.p
            className="text-gray-700 dark:text-gray-300 text-left mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {overview}
          </motion.p>
          <Card className="dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-700 dark:text-gray-300 text-xl font-bold mb-4">
                This program offers:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {programOptions.map((option, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-6">
                          <div className="flex flex-col"> <div className="flex gap-3 justify-normal items-center"><div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 transform rotate-45"></div>
                 
                        <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                          {option.title}
                        </span></div>
                        <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                          {option.description}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/2 relative">
          <Image
            alt="Business Handshake"
            className="rounded-lg h-[50vh] shadow-md"
            height={500}
            width={1135}
            src="/assets/BusinessHandshake.jpg"
          />
        </div>
      </div>
    </section>
        {/* What They’ll Learn Section */}
        <section className="mt-14 py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-90 0 rounded-lg shadow-lg">
  <h2 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6">What They’ll Learn</h2>
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2">
    {learningPoints.map((point, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 p-4"
      >
        <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 transform rotate-45"></div> {/* Diamond shape */}
        <div className="flex flex-col">
          <span className="text-lg font-medium text-gray-900 dark:text-white">{point.title}</span>
        </div>
      </motion.div>
    ))}
  </div>
</section>

        {/* Program Highlights Section */}
        <section className="mt-14 text-center">
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
            
          </section>
        {/*Program details Section */}
        <section className="mt-14 flex flex-col gap-6 text-center py-4">
          <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6 ">
            Program Details
          </span>
          <div className=" md:px-24 py-6 px-4 text-start mx-2 bg-gray-50 shadow-lg rounded-lg space-y-6">
            {/* Age Group */}
            <div className="flex items-center gap-4">

              <p className="text-lg">
                <span className="text-lg font-semibold text-black ">Age Group:</span> 10–15 years
              </p>
            </div>

            {/* Format */}
            <div>
              <p className="text-lg font-semibold text-black">Format:</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-gray-700 mt-1"></span>
                  <p>
                    <span className="font-medium text-gray-900">Group Workshops:</span> Fun, collaborative learning with peers.
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-gray-700 mt-1"></span>
                  <p>
                    <span className="font-medium text-gray-900">Private Sessions: </span>Personalized, focused coaching.
                  </p>
                </li>
              </ul>
            </div>

            {/* Duration */}
            <div>
              <p className="text-lg font-semibold text-black">Duration:</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-gray-700 mt-1"></span>
                  <p>
                    <span className="font-medium text-gray-900">Group Workshops</span>: 2–3 hours per session.
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-gray-700 mt-1"></span>
                  <p>
                    <span className="font-medium text-gray-900">Private Sessions:</span> 1-hour sessions, scheduled as per convenience.
                  </p>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div>
              <p className="text-lg font-semibold text-black">Location:</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-gray-700 mt-1"></span>
                  <p>In-person at designated venues.</p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-gray-700 mt-1"></span>
                  <p>Online options available upon request.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="mt-14 text-center">
          <h2 className="lg:text-4xl text-2xl  font-bold text-black">
            Help Your Child Shine with Confidence and Polished Manners!
          </h2>
          <ShadcnButton
            variant="contained"
            className="mt-6 bg-black hover:bg-gray-600 "
          >
            Register Now
          </ShadcnButton>
        </section>
        {/* Why Choose Modern Mannerism Section */}
        <section className="mt-14 py-6 ">
          <h2 className="text-3xl font-semibold text-center text-black">
            Why Choose Modern Mannerism?
          </h2>
          <p className="mt-4 text-center p-6 mx-2 w-full bg-gray-50 shadow-lg rounded-lg  text-gray-700">
            At <strong className="text-black">Modern Mannerism</strong>, we understand that every child is unique. Our programs are designed to foster growth, confidence, and respect in a nurturing environment. We help children step into the world with grace, charm, and confidence.
          </p>
        </section>


        {/* Testimonials Section */}
        <section className="mt-14 w-full text-center">
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
        </section>


        {/* FAQ Section */}
        <section className="mt-14 rounded-md text-center">
          <h2 className="text-4xl font-semibold text-black">FAQs</h2>
          <div className="mt-6 mx-2 rounded-lg shadow-md bg-gray-50">
            <Accordion type="single" collapsible>
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg p-4 font-semibold flex items-center gap-2">
                    <HelpCircle className="lg:w-5 w-4 lg:h-5 h-4" />
                    <span className="flex-1 text-left md:text-center">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </div></div>
    </div>
  );
};

export default ServicePage;
