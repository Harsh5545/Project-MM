"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Cormorant_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import Head from "next/head";

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});

function ServicesComponent() {
  const courses = [
    {
      id: "1",
      image: "/assets/PD.jpg",
      title: "Personality Enhancement Programme",
      description:
        "Unlock your full potential with our Personality Enhancement Programme.",
      isBestSelling: false,
    },
    {
      id: "2",
      image: "/assets/BusinessHandshake.jpg",
      title: "Business Etiquette & Corporate Image Programme",
      description:
        "Master the art of business etiquette and elevate your corporate image.",
      isBestSelling: true,
    },
    {
      id: "3",
      image: "/assets/Etiquettechildren.jpg",
      title: "Children’s Etiquette Programme",
      description:
        "Teach your children essential etiquette skills in a fun and engaging way.",
      isBestSelling: false,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered courses based on search term
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Our Services - Modern Mannerism</title>
        <meta name="description" content="Explore our wide range of programs designed to empower you. Unlock your full potential with our Personality Enhancement Programme, master business etiquette, and teach your children essential etiquette skills." />
        <meta name="keywords" content="Personality Enhancement, Business Etiquette, Children's Etiquette, Modern Mannerism, Empowerment Programs" />
        <meta name="author" content="Modern Mannerism" />
        <meta property="og:title" content="Our Services - Modern Mannerism" />
        <meta property="og:description" content="Explore our wide range of programs designed to empower you. Unlock your full potential with our Personality Enhancement Programme, master business etiquette, and teach your children essential etiquette skills." />
        <meta property="og:image" content="/assets/og-image.jpg" />
        <meta property="og:url" content="https://www.modernmannerism.com/services" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="w-full min-h-screen bg-gradient-to-b from-[#f9f5f0] to-[#eae6e0] dark:from-[#00001F] dark:to-[#1a1a2e] py-16">
        <div className="w-[90%] max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center">
            <motion.h4
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${dm_Sans.className} text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#28425f] dark:from-[#eabf91] dark:to-[#c3965d]`}
            >
              Our Services
            </motion.h4>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-lg text-gray-700 dark:text-gray-300"
            >
              Explore our wide range of programs designed to empower you.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <input
              type="text"
              placeholder="Search for a service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[50%] px-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#28425f] dark:focus:ring-[#eabf91] dark:bg-[#1a1a2e] dark:text-white"
            />
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.4 }}
                  className="group relative flex flex-col bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-60">
                    <Image
                      alt={course.title}
                      src={course.image}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {course.title}
                    </h5>
                    <p className="text-gray-700 dark:text-gray-400 mt-4 flex-grow">
                      {course.description}
                    </p>

                    {/* Button */}
                    <Link href={`/services/${course.id}`}>
                      <button className="mt-6 flex items-center justify-center bg-gradient-to-r from-[#28425f] via-[#345374] to-[#28425f] text-white dark:bg-[#eabf91] dark:text-[#1a1a2e] py-2 px-6 rounded-full font-semibold shadow-md hover:bg-[#1e3346] dark:hover:bg-[#d4a971] transition-colors duration-300">
                        See more
                        <MdOutlineArrowForwardIos className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="col-span-full text-center text-gray-700 dark:text-gray-300 text-lg"
              >
                No services match your search.
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesComponent;