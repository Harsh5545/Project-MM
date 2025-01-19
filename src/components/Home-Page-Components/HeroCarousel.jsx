"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Lato } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import Head from "next/head";
import { Button } from "@/components/ui/button"; // Assuming ShadCN button is correctly imported

const dm_Sans = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
});

const HeroCarousel = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };
  const scrollToTestimonials = () => {
    const testimonialSection = document.getElementById("testimonials");
    if (testimonialSection) {
      testimonialSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const slides = [
    {
      id: 1,
      image: "/assets/ModernHomeHero.jpg",
      text: "Welcome to Modern Mannerism!",
      description: "A sophisticated guide to cultural manner & etiquette.",
      description2:
        "We help individuals and professionals from all walks of life enhance their image, communication, and etiquette to succeed in personal and professional settings.",
      button: "Explore",
    },
    {
      id: 2,
      image: "/assets/OneonOneConsulting.jpeg",
      text: "One-on-One Consulting",
      description:
        "Help individuals refine their personal and professional image, develop strong communication skills, and boost their confidence. Our one-on-one sessions are customized to meet the unique needs of each client.",
      button: "Book an appointment",
    },
    {
      id: 3,
      image: "/assets/CorporateWorkshops&Training.jpeg",
      text: "Corporate Workshops & Training",
      description:
        "We offer customized training programs designed to improve workplace professionalism, communication, and team dynamics. These workshops are perfect for teams, managers, and executives who want to refine their professional image and etiquette.",
      button: "Know more",
    },
    {
      id: 4,
      image: "/assets/YoungAdultGroomingProgramme.jpeg",
      text: "Young Adult Grooming Programmee",
      description:
        "Prepare teens and young adults for success by teaching them essential grooming, communication, and etiquette skills. This program is ideal for young adults entering the workforce, preparing for interviews, or simply wanting to build confidence in their daily lives.",
      button: "Know more",
    },
    {
      id: 5,
      image: "/assets/ChildrenEtiquetteProgramme.jpeg",
      text: "Children's Etiquette Programmee",
      description:
        "Help children learn good manners, respect, and social skills in a fun and engaging way. This program focuses on building the foundation for positive behavior and respectful interactions, preparing children for both social and school environments.",
      button: "Know more",
    },
    {
      id: 6,
      image: "/assets/OnlineCoursesWorkshops.jpeg",
      text: "Online Courses & Webinars",
      description:
        "Our online offerings allow you to learn at your own pace or join live sessions to enhance your skills in image, etiquette, and communication.",
      button: "Know more",
    },
  ];

  const styles = {
    container: `md:h-screen w-full bg-cover z-0 relative`,
    slide: `md:h-screen h-[65vh] w-full relative`,
    image: `object-cover w-full h-full`, // Ensure the image covers the container
    overlay: `absolute inset-0 dark:bg-[#060507] bg-[#3a4e5d] dark:bg-opacity-60 bg-opacity-50`,
    text: `md:text-4xl ${cormorant.className} dark:text-white text-white font-bold text-2xl text-black lato-font`,
    button: `px-8 ${dm_Sans.className} py-5 px-8 tracking-wider bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-md lg:text-xl text-white rounded-full mt-4 sm:mt-10`,
  };

  return (
    <>
      <Head>
        <title>Modern Mannerism - Enhance Your Professional & Personal Etiquette</title>
        <meta
          name="description"
          content="Modern Mannerism offers personalized consulting, workshops, and programs to help individuals and professionals master etiquette, communication, and image-building skills."
        />
        <meta
          name="keywords"
          content="etiquette, communication, personal image, professional image, workshops, consulting, children etiquette, young adult grooming"
        />
        <meta name="author" content="Modern Mannerism" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Modern Mannerism" />
        <meta
          property="og:description"
          content="Empowering individuals with the skills to succeed through refined etiquette and communication."
        />
        <meta property="og:image" content="/assets/One-on-One Consulting.jpeg" />
        <meta property="og:url" content="https://modernmannerism.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={styles.container}>
        <style jsx>{`
      @media (max-width: 767px) {
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
      }
      .swiper-button-next,
      .swiper-button-prev {
        color: #ff0000; /* Customize this color as needed */
      }
      .swiper-pagination-bullet {
        background-color: #c70ba8; /* Customize this color as needed */
      }
      .swiper-pagination-bullet-active {
        background-color: #ff0000 !important; /* Customize active dot color */
      }
      @media (max-width: 480px) {
        .${styles.slide} {
          height: 50vh; /* Adjust for smaller devices */
        }
      }
    `}</style>
        <Swiper
          onSlideChange={handleSlideChange}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={800}
          loop={true}
          navigation={false}
          modules={[Autoplay, Keyboard, Pagination, Navigation]}
          className="mySwiper"
          ref={swiperRef}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={styles.slide}>
                <Image
                  src={slide.image}
                  alt={slide.text}
                    layout="fill" // Ensures the image fills the parent
                     // Ensures the image covers the space without distortion
                  className={styles.image}
                  priority // Optimizes loading for carousel images
                />
                <div className={styles.overlay}></div>
                <div className="absolute text-white flex gap-5 md:gap-9 flex-col text-center items-center justify-center w-full h-full z-10 p-8">
                  <span className={styles.text}>{slide.text}</span>
                  <div className="flex flex-col md:w-[50%] text-sm font-medium md:text-lg">
                    <p>{slide.description}</p>
                    <p>{slide.description2}</p>
                  </div>
                  <Button onClick={scrollToTestimonials} className={styles.button}>
                    {slide.button}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HeroCarousel;
