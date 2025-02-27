"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import parse from 'html-react-parser';



const BlogPage = ({ data }) => {


  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        Blog not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Left Side - Blog Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:col-span-2  dark:bg-gray-900 p-6 md:p-10"
      >
        {/* Blog Header */}
        <div className="text-center flex flex-col gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {data.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{data.meta_desc}</p>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300"> {data.author.name}</p>
        </div>

        {/* Blog Image */}
        <div className="w-full h-60 md:h-80 lg:h-96 mb-8">
          <img
            src={data.image || "/assets/manasi-box.png"}
            alt={data.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Blog Content */}
        <div className="w-full h-full overflow-hidden">
          <div className=" ck-content prose dark:prose-invert "  >
            {
              parse(data?.content) || "No Content"
            }
          </div>
        </div>
      </motion.div>

      {/* Right Side - Author & Additional Features */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Author Section */}
        <div className="bg-gray-100 hidden md:flex flex-col justify-center items-center gap-5 dark:bg-gray-800 p-6  text-center">
          <div className="flex flex-1 items-center justify-center w-full  relative group">
            <Image
              src="/assets/Manasi_kadam_image.jpg"
              height={400}
              width={200}
              alt="modern Mannerism"
              className=" bg-cover rounded-full    border-[#06273A] dark:border-[#fff] border-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />

          </div>
          {/* <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Manasi Kadam</h3> */}
          <p className="text-gray-600 dark:text-gray-400">Hi, I’m Manasi Kadam!
          </p>  <p className="text-gray-800 text-center text-sm  dark:text-gray-400">   I’m a Certified Image & Etiquette Consultant and Soft Skills Coach, here to help you feel confident, polished, and at ease in any setting. Whether it’s personal style, communication, or etiquette, I make it simple and practical—so you can shine effortlessly!</p>
          <button className=" bg-[#eabf91] bg-opacity-45 font-normal text-gray-900 min-w-fit px-6 md:px-6 py-2 md:py-3 rounded-lg">
            Know More
          </button>
        </div>

        {/* Recent Blogs */}
        <div className="bg-gray-100 shadow-md shadow-slate-400 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">Latest Blog</h3>
          <ul className="space-y-2">
            {data.recentBlogs?.map((blog, index) => (
              <li key={index} className="text-blue-600 dark:text-blue-400 hover:underline">
                <a href={`/blog/${blog.slug}`}>{blog.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
