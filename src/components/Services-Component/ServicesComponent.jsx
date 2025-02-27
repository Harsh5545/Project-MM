"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Cormorant_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import Pagination from "@/hooks/Pagination"; // Example for pagination

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});

function ServicesComponent({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Default items per page

  useEffect(() => {
    // Update items per page based on screen size
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 5 : 9);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredCourses = data.filter((course) => {
    const title = course?.heading || "";
    const description = course?.subheading || "";

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-[#f9f5f0] to-[#eae6e0] dark:from-[#00001F] dark:to-[#1a1a2e] py-16">
        <div className=" lg:max-w-7xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-12 items-stretch">
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course, index) => (
                <Link key={course?.id} href={`/services/${course?.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.4 }}
                    className="group flex flex-col bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out h-full"
                  >
                    {/* Image Section */}
                    <div className="relative w-full h-60">
                      <Image
                        alt={course.heading}
                        src={course.image}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col flex-grow justify-between p-6">
                      <h5 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {course?.heading}
                      </h5>
                      <p className="text-gray-700 dark:text-gray-400 mt-4 flex-grow line-clamp-2">
                        {course?.subheading}
                      </p>

                      {/* Button */}
                      <div className="mt-4">
                        <button className="mt-6 flex items-center justify-center bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white text-sm dark:bg-[#eabf91] dark:text-[#1a1a2e] py-2 px-6 rounded-full font-semibold shadow-md hover:bg-[#1e3346] dark:hover:bg-[#d4a971] transition-colors duration-300">
                          See more
                          <MdOutlineArrowForwardIos className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
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



          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ServicesComponent;
