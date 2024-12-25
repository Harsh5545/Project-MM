import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa"; // Importing an icon from react-icons
import { MdOutlineArrowForwardIos } from "react-icons/md"; // Importing another icon
import styles from "./styles.module.css"; // Import the CSS module
import { Cormorant_Garamond } from "next/font/google";

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});

const CardComponent = () => {
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

  return (
    <div className="w-full dark:bg-[#00001F] flex flex-col justify-center items-center py-10">
      <div className="md:w-[90%] w-[95%]">
        <div className="flex flex-col items-center justify-center">
          <h4
            className={`${dm_Sans.className} py-10 text-4xl flex flex-col gap-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#28425f] dark:from-[#eabf91] dark:to-[#c3965d]`}
          >
            Our Services
            <hr className="bg-gradient-to-r from-[#28425f] to-[#76766b] dark:from-[#eabf91] dark:to-[#c3965d] h-1 rounded-full w-16 self-center" />
          </h4>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-28 w-full px-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`relative ${styles.container} w-full lg:w-full bg-[#cca26c] bg-opacity-65 dark:bg-[#122031] rounded-3xl text-black p-6 text-center flex flex-col items-center justify-between gap-5 h-[500px] dark:hover:bg-[#0e1a2b] shadow-2xl hover:shadow-md hover:shadow-[#8c9c88] dark:hover:shadow-[#3a4e4f] transform hover:scale-105 transition-transform duration-300 ease-in-out`}
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
                  height={300}
                  width={300}
                  src={course.image}
                />
                <div className="inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
              </div>
              <div className="flex flex-col gap-4 flex-grow">
                <p className="font-semibold text-xl dark:text-white text-[#000000]">
                  {course.title}
                </p>
                <p className="dark:text-gray-400 text-gray-900">
                  {course.description}
                </p>
              </div>
              <button className="flex items-center justify-center tracking-wider bg-black text-[#DEC29F] font-bold p-3 px-6 rounded-xl transition-colors duration-300 ease-in-out">
                Read more <MdOutlineArrowForwardIos className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
