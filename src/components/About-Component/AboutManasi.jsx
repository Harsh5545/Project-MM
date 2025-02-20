import Image from "next/image";
import React from "react";

export const AboutManasi = () => {
  return (
    <div className="flex justify-evenly dark:bg-[rgb(0,0,31)] w-full items-center gap-5 py-24">
      <div className="flex gap-5 md:gap-1 w-[90%] items-center flex-col justify-evenly h-full md:flex-row">
        <div className="flex flex-1 items-center justify-center w-full md:w-[30%] relative group">
          <Image
            src="/assets/Manasi_kadam_image.jpg"
            height={700}
            width={500}
            alt="modern Mannerism"
            className="image bg-cover border-[#06273A] dark:border-[#fff] border-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
          />
          
        </div>
        <div className="flex-col flex-1 flex items-end justify-end gap-5 md:w-[70%]">
          <div className="content px-2 md:w-[90%] w-full flex flex-col gap-6">
            <div className="header flex md:pb-5 pb-2 lg:pb-10 flex-col items-center gap-2 justify-center">
              <h2 className="text-black text-center text-xl md:text-4xl font-semibold dark:text-white">
                ABOUT HEAD CONSULTANT & FOUNDER
              </h2>
              <hr className="h-1 bg-gradient-to-r  from-[#c3965d] via-[#eabf91] to-[#c3965d]  w-40" />
            </div>

            <p className="text-center text-gray-700 dark:text-gray-300 text-base">
              Manasi Kadam is the visionary behind Modern Mannerism, bringing
              her extensive expertise in Image & Etiquette Consulting to the
              forefront. With a deep passion for empowering individuals and
              professionals, Manasi offers a comprehensive range of services,
              from Personal Branding and Communication Skills to Corporate Etiquette and Fine Dining Manners. Her unique background, enriched by diverse experiences across various industries, allows her to craft personalized strategies that enhance her clients' professional presence and social confidence.
            </p>
            <p className="text-center text-gray-700 dark:text-gray-300 text-base">
              She is a certified Image Consultant and Soft Skills Trainer,
              having completed specialized programs at renowned institutions
              like the Image Consulting Business Institute (ICBI), Classes of
              Professional Studies by Dr. Shivani Sharma, and Presence
              Institute of Image Consulting. Additionally, Manasi honed her
              communication skills under the mentorship of Mrs. Sabira Merchant
              at Celebrity School, and further enhanced her expertise by exploring{" "}
              Neuro-Linguistic Programming with NetEdu Academy. Her commitment
              to ongoing learning ensures that she stays at the forefront of
              industry trends, offering clients the highest standard of image
              consulting and etiquette training.
            </p>

            <p className="text-base text-gray-700 dark:text-gray-300 text-center">
              Join Manasi at Modern Mannerism, and let’s work together to refine
              your image, enhance your etiquette, and unlock your full
              potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
