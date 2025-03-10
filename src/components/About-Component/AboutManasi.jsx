import { Montserrat } from "next/font/google";
import Image from "next/image";
import React from "react";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  
});
export const AboutManasi = () => {
  return (
    <div className="flex justify-evenly dark:bg-[rgb(0,0,31)] w-full items-center gap-5 py-20">
      <div className="flex gap-5 md:gap-1 w-[92%] md:w-[88%] items-center flex-col justify-evenly h-full md:flex-row-reverse">
        <div className="flex w-full md:w-[35%] items-center justify-center   relative group">
        <div className="absolute -inset-y-0.5 bg-gradient-to-r from-[#c3965d] to-[#eabf91] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative group overflow-hidden rounded-lg">
            {/* <div className="header flex md:hidden  pb-6 flex-col items-center gap-1 justify-center">
              <h2 className="text-black text-center text-xl md:text-4xl font-semibold dark:text-white">
                ABOUT FOUNDER
              </h2>
              <hr className="h-1 bg-gradient-to-r  from-[#c3965d] via-[#eabf91] to-[#c3965d]  w-16" />
            </div> */}
              <Image
                src="/assets/AboutMMM.png"
                height={600}
                width={400}
                alt="Manasi Kadam - Modern Mannerism"
                className="rounded-lg border-2  transition-transform duration-500 ease-in-out transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full hover:rounded-lg group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-center font-medium">Manasi Kadam</p>
                <p className="text-[#eabf91] text-center text-sm">Founder </p>
              </div>
            </div>
          
          
        </div>
        <div className="flex-col w-full md:w-[65%] flex items-start justify-center  gap-5">
          <div className={`${montserrat.className} content px-2 md:w-[88%] w-full flex flex-col gap-5`}>
            <div className="header flex md:pb-2 pb-2 lg:pb-2 flex-col items-center gap-1 justify-center">
              <h2 className="text-black text-center text-xl md:text-4xl font-semibold dark:text-white">
                ABOUT FOUNDER
              </h2>
              <hr className="h-1 bg-gradient-to-r  from-[#c3965d] via-[#eabf91] to-[#c3965d]   w-36" />
            </div>

            <p className="text-center leading-relaxed text-gray-700 dark:text-gray-300 md:text-base text-sm">
              Manasi Kadam is the visionary behind Modern Mannerism, bringing
              her extensive expertise in Image & Etiquette Consulting to the
              forefront. Her unique background, enriched by diverse experiences across various industries, allows her to craft personalized strategies that enhance her clients' professional presence and social confidence.
            </p>
            <p className="text-center text-gray-700 dark:text-gray-300 md:text-base text-sm leading-relaxed">
              She is a certified Image Consultant and Soft Skills Trainer,
              having completed specialized programs at renowned institutions
              like the Image Consulting Business Institute (ICBI), Classes of
              Professional Studies by Dr. Shivani Sharma, and Presence
              Institute of Image Consulting. Additionally, Manasi honed her
              communication skills under the mentorship of Mrs. Sabira Merchant
              at Celebrity School, and further enhanced her expertise by exploring{" "}
              Neuro-Linguistic Programming. Her commitment
              to ongoing learning ensures that she stays at the forefront of
              industry trends, offering clients the highest standard of image
              consulting and etiquette training.
            </p>

            <p className="md:text-base text-sm text-gray-700 dark:text-gray-300 text-center leading-relaxed ">
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
