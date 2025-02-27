"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import parse from "html-react-parser";
import { useSocket } from "@/hooks/useSocket";

const BlogPage = ({ data }) => {
  const { socket, sendNotification, isSocketReady } = useSocket();
  const [visitCount, setVisitCount] = useState(0);
  const [latestVisit, setLatestVisit] = useState(null);
  const blogId = data?.id;

  useEffect(() => {
    if (isSocketReady && socket) {
      socket.emit("view-blog", { blogId });

      socket.on("update-visit-data", (data) => {
        if (data.blogId === blogId) {
          setVisitCount(data.visitCount);
          setLatestVisit(data.latestVisit);
        }
      });

      return () => {
        socket.off("update-visit-data");
      };
    }
  }, [isSocketReady, socket, blogId]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        Blog not found
      </div>
    );
  }

  return (
    <div className="container max-w-max px-4 sm:px-6 lg:pl-16 lg:pr-24 py-16 md:py-24 flex justify-center flex-col md:flex-row gap-10">
      {/* Left Section (Blog Content) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-[68%] dark:bg-gray-900 p-6 md:p-10"
      >
        <div className="text-center flex flex-col gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {data.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{data.meta_desc}</p>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">{data.author.name}</p>
        </div>

        <div className="w-full flex justify-center h-60 md:h-80 lg:h-96 mb-8">
          <img
            src={data.image || "/assets/manasi-box.png"}
            alt={data.title}
            className="object-cover w-[100%] h-full rounded-lg"
          />
        </div>

        <div className="w-full h-full overflow-hidden">
          <div className="ck-content w-[90%]  prose dark:prose-invert">
            {parse(data?.content) || "No Content"}
          </div>
        </div>
      </motion.div>

      {/* Right Section (Author & Extras) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-[32%] space-y-10"
      >
        <div className="bg-gray-100 flex flex-col justify-center items-center gap-5 dark:bg-gray-800 p-4 text-center">
          <div className="flex flex-1 items-center justify-center w-full relative group">
            <Image
              src="/assets/Manasi_kadam_image.jpg"
              height={400}
              width={200}
              alt="Modern Mannerism"
              className="bg-cover rounded-full border-[#06273A] dark:border-[#fff] border-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Hi, I’m Manasi Kadam!</p>
          <p className="text-gray-800 text-center text-sm dark:text-gray-400">
            I’m a Certified Image & Etiquette Consultant and Soft Skills Coach, here to help you feel confident, polished, and at ease in any setting. Whether it’s personal style, communication, or etiquette, I make it simple and practical—so you can shine effortlessly!
          </p>
          <button className="bg-[#eabf91] bg-opacity-45 font-normal text-gray-900 min-w-fit px-6 md:px-6 py-2 md:py-3 rounded-lg">
            Know More
          </button>
        </div>

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
