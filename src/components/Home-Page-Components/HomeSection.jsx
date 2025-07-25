"use client";
import React, { useState, useEffect, useRef } from "react";
import ShadcnButton from "../Atom/button/ShadcnButton";
import { Lato } from "next/font/google";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const dm_Sans = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const HomeSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [showThankYou, setShowThankYou] = useState(false);
  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      setShowModal(false);
    }, 3000);
    setFormData({ email: "", message: "" });
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div>
      <div
        className="relative w-full"
        style={{
          backgroundImage: "url('/assets/Website-Background.webp')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 dark:bg-[#060507] bg-[#BEBEBE] dark:bg-opacity-60 bg-opacity-80"></div>
        {/* Content */}
        <div className="flex relative flex-col md:flex-row h-auto lg:h-72 gap-5 p-4 justify-evenly items-center">
          <p
            style={{ wordSpacing: "0.1rem" }}
            className="p-1 font-semibold text-sm md:text-base lg:text-2xl w-[90%] md:w-[60%] leading-relaxed md:leading-loose text-center text-black"
          >
            Become a part of Modern Mannerism <br className="hidden lg:visible" /> community to keep up to date with
            our courses, articles, and news. <br /> <br /> Become a better, more confident, and professional you!
          </p>
          <ShadcnButton
            onClick={() => setShowModal(true)}
            className={`${dm_Sans.className} tracking-widest bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] font-extrabold text-white text-sm md:text-base px-6 py-3`}
          >
            JOIN NOW
          </ShadcnButton>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/3"
            >
              {!showThankYou ? (
                <>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
                    Join the Community
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="w-full"
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="What’s on your mind? We’re listening!"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                      rows={4}
                    ></textarea>
                    <div className="flex justify-end gap-4">
                      <ShadcnButton
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="bg-gray-400 dark:bg-gray-700 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </ShadcnButton>
                      <ShadcnButton
                        type="submit"
                        className="bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white px-4 py-2 rounded-lg"
                      >
                        Submit
                      </ShadcnButton>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500 text-6xl"
                  >
                    ✓
                  </motion.div>
                  <p className="text-gray-800 dark:text-white mt-4 text-center">
                    Thank you for joining the community!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 767px) {
          .bg-fixed {
            background-attachment: scroll;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeSection;