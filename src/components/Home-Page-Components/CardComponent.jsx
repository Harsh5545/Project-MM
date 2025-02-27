"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { useMediaQuery } from "react-responsive";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./styles.module.css";

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CardComponent = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const courses = [
    {
      image: "/assets/Personality Development.jpeg",
      title: "Personality Enhancement Programme",
      description:
        "Unlock your full potential with our Personality Enhancement Programme.",
      isBestSelling: false,
    },
    {
      image: "/assets/BusinessHandshake.jpg",
      title: "Business Etiquette & Corporate Image Programme",
      description:
        "Master the art of business etiquette and elevate your corporate image.",
      isBestSelling: true,
    },
    {
      image: "/assets/Etiquettechildren.jpg",
      title: "Children’s Etiquette Programme",
      description:
        "Teach your children essential etiquette skills in a fun and engaging way.",
      isBestSelling: false,
    },
  ];

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleReadMore = (title) => {
    const slug = generateSlug(title);
    router.push(`/services/${slug}`);
  };

  return (
    <div className="w-full dark:bg-[#00001F] flex flex-col justify-center items-center py-10">
      <div className="md:w-[90%] w-[95%]">
        <div className="flex flex-col items-center justify-center">
          <h4
            className={`${dm_Sans.className} py-10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#28425f] dark:from-[#eabf91] dark:to-[#c3965d]`}
          >
            Our Services
            <hr className="bg-gradient-to-r from-[#28425f] to-[#76766b] dark:from-[#eabf91] dark:to-[#c3965d] h-1 rounded-full w-16 self-center" />
          </h4>
        </div>

        {isMobile ? (
          <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} itemClass="px-2">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} handleReadMore={handleReadMore} isMobile={isMobile} />
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-28 w-full px-4">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} handleReadMore={handleReadMore} isMobile={isMobile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CourseCard = ({ course, handleReadMore, isMobile }) => (
  <div
    className={`relative ${styles.container} w-full bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] dark:bg-[#122031] rounded-3xl text-black p-4 text-center flex flex-col items-center justify-between gap-3 ${isMobile ? 'h-[400px] w-[90%] mx-auto' : 'h-[500px]'} dark:hover:bg-[#0e1a2b] shadow-2xl hover:shadow-md hover:shadow-[#8c9c88] dark:hover:shadow-[#3a4e4f] transform hover:scale-105 transition-transform duration-300 ease-in-out`}
  >
    {course.isBestSelling && (
      <div className={`${styles.card_box}`}>
        <span></span>
      </div>
    )}
    <div className="w-full mb-2 flex justify-center items-center dark:bg-[#021625] rounded-2xl overflow-hidden">
      <Image
        alt={course.title}
        className="object-cover w-full"
        height={isMobile ? 200 : 200}
        width={isMobile ? 200 : 200}
        src={course.image}
      />
    </div>
    <div className="flex flex-col gap-3 flex-grow">
      <p className="font-semibold text-lg dark:text-white text-[#000000]">
        {course.title}
      </p>
      <p className="dark:text-gray-400 text-gray-900 text-sm">
        {course.description}
      </p>
    </div>
    <button
      onClick={() => handleReadMore(course.title)}
      className={`${dm_Sans.className} flex items-center justify-center tracking-wider bg-black text-[#DEC29F] font-bold p-2 px-4 rounded-xl transition-colors duration-300 ease-in-out text-sm`}
    >
      Read more <MdOutlineArrowForwardIos className="ml-2" />
    </button>
  </div>
);

export default CardComponent;