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
import { Button } from "@/components/ui/button";

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

  const slides = [
    {
      id: 1,
      image: "/assets/Bg_Manasi_kadam.png",
      text: "Welcome to Modern Mannerism!",
      description: "A sophisticated guide to cultural manner & etiquette.",
      description2:
        "We help individuals and professionals enhance their image, communication, and etiquette to succeed in personal and professional settings.",
      right_side_image: "/assets/Manasi_madam.png",
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
      <div className="w-full relative">
        <Swiper
          onSlideChange={handleSlideChange}
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={800}
          loop={true}
          navigation={false}
          modules={[Autoplay, Keyboard, Pagination, Navigation]}
          className="mySwiper"
          ref={swiperRef}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div
                className={`relative w-full h-[50vh] md:h-[60vh] lg:h-screen flex items-center ${index === 0 ? "flex-row justify-center items-end lg:items-center" : "flex justify-center  items-end "
                  }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              > {index === 0 ? (
                <>
                  <div className="w-full text-center md:w-3/4 lg:w-1/2 flex flex-col items-center justify-end p-4 lg:pl-48 md:p-10 z-10 relative">
                    <h1 className={`text-lg md:text-4xl lg:text-5xl font-bold ${cormorant.className}`}>{slide.text}</h1>
                    <p className="mt-2 md:mt-4 text-xs md:text-lg">{slide.description}</p>
                    <p className="mt-1 md:mt-2 text-xs md:text-lg">{slide.description2}</p>
                    <Button className="mt-2 md:mt-6 text-xs md:text-lg bg-gradient-to-r from-[#c3965d] to-[#eabf91] text-white px-4 md:px-10 py-2 md:py-5 rounded-full">
                      {slide.button}
                    </Button>
                  </div>
                  <div className="w-full md:w-3/4 lg:w-1/2 relative flex justify-center">
                    <div className="relative w-[100%] h-[50vh] md:w-[70%] md:h-[60vh] lg:w-full lg:h-[100vh]">
                      <Image
                        src={slide.right_side_image}
                        alt={slide.text}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                </>
              ) : (
                <> <div className="absolute inset-0 dark:bg-[#060507] bg-[#3a4e5d] dark:bg-opacity-60 bg-opacity-50"></div>
                  <div className="w-full z-10 h-full flex flex-col justify-center items-center text-center p-5 md:p-8">
                    <h1 className={`text-2xl md:text-4xl font-bold ${cormorant.className}`}>{slide.text}</h1>
                    <p className="mt-2 w-full md:w-[60%] md:mt-4 text-sm md:text-xl ">{slide.description}</p>
                    <Button className="mt-4 md:mt-6 bg-gradient-to-r from-[#c3965d] to-[#eabf91] text-white px-6 md:px-8 py-2 md:py-4 rounded-full">
                      {slide.button}
                    </Button>
                  </div></>
              )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HeroCarousel;
