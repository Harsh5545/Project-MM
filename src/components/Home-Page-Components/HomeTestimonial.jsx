"use client";

// import { Button } from "@nextui-org/react";
import TestimonialData from "@/data";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay } from "swiper/modules"; // Removed Pagination module
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper CSS for navigation
import "swiper/css/autoplay";
import Image from "next/image";
import styles from "./styles.module.css"; // Import the CSS module

const HomeTestimonial = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <div
      className="relative w-full"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url('/assets/Website-Background.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      
      <div className="absolute inset-0 bg-opacity-25 dark:bg-opacity-30 dark:bg-[#060507] bg-[#FAE7F3]"></div>
      {/* Content */}
      <div className="flex h-auto md:h-[90vh] gap-5 flex-col p-5 justify-center items-center z-10 relative">
        <h6 className="font-semibold text-xl md:text-4xl w-[100%] md:w-[100%] text-center text-white">
        Testimonials
        </h6>
        <div
          className={`bg-white w-[95%] md:w-[60%] shadow-2xl shadow-slate-400 dark:shadow-[#060507] dark:bg-[#00001F] relative p-6 md:p-16 rounded-xl ${styles.testimonialContainer}`}
          style={{ maxWidth: "100%", overflowX: "hidden" }}
        >
          <Swiper
            onSlideChange={handleSlideChange}
            autoplay={{
              delay: 5000, // Shortened the delay for a more dynamic feel
              disableOnInteraction: false,
            }}
            speed={2000} // Increased speed for smooth transition
            loop={true}
            navigation={true} // Enable navigation
            modules={[Autoplay, Keyboard, Navigation]} // Removed Pagination module
            className={`mySwiper ${styles.swiper}`}
            ref={swiperRef}
          >
            {TestimonialData.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col justify-center mt-2 md:mt-0 items-center gap-8">
                  <p className="text-sm w-[90%] md:w-[90%] text-center dark:text-white text-[#06273A] leading-relaxed">
                    {testimonial.Description}
                  </p>

                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src={testimonial.Image}
                      width={80}
                      height={80}
                      alt={testimonial.Name}
                      className="rounded-full  shadow-lg mb-3"
                    />

                    <p className="text-lg font-semibold text-center dark:text-white text-[#06273A]">
                      {testimonial.Name}
                    </p>
                    {/* <h4 className="text-md font-medium text-center dark:text-white text-[#7f8c8d]">
                      {testimonial.City}
                    </h4> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonial;
