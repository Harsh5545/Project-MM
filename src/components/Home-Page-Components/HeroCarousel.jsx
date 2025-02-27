"use client";

import Image from "next/image";
import Head from "next/head";
import { Cormorant_Garamond } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
});

const HeroSection = () => {
  return (
    <>
      <Head>
        <title>Modern Mannerism - Enhance Your Professional & Personal Etiquette</title>
        <meta
          name="description"
          content="Modern Mannerism offers personalized consulting, workshops, and programs to help individuals and professionals master etiquette, communication, and image-building skills."
        />
      </Head>

      <div className="relative max-w-screen-4xl h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-[#c3965d] to-white opacity-30"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col lg:flex-row items-center text-center lg:text-left text-black w-full lg:p-28"
        >
          <div className="flex w-[60%] flex-col items-center lg:items-start">
            <h1 className={`text-4xl md:text-6xl font-bold ${cormorant.className} drop-shadow-lg`}>
              Elevate Your Path to Success
            </h1>
            <p className="mt-4 text-lg md:text-xl opacity-80">
              Business coaching for executives
            </p>
            <p className="italic text-gray-500">Personalized coaching for executives</p>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6"
            >
              <Button className="bg-[#c3965d] text-white px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-transform">
                Let's Get Started
              </Button>
            </motion.div>

            <div className="mt-6 flex space-x-6 text-2xl">
              <FaFacebook className="cursor-pointer hover:text-[#c3965d] transition" />
              <FaInstagram className="cursor-pointer hover:text-[#c3965d] transition" />
              <FaLinkedin className="cursor-pointer hover:text-[#c3965d] transition" />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 lg:w-[40%] relative mt-10 lg:mt-0"
          >
            <Image
              src="/assets/Manasi_madam.png"
              alt="Coach Manasi"
              width={500}
              height={700}
              className="object-cover w-full h-full md:h-[90vh] lg:h-[95vh] "
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;

