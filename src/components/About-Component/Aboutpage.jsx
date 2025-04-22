import { Montserrat } from "next/font/google";
import Image from "next/image";
import React from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
 
});

function Aboutpage() {
  return (
    <div className="flex flex-col dark:bg-[#00001F] md:flex-row items-center gap-5 justify-center px-3 w-full h-full py-16 md:py-20 lg:py-24">
      <div className="md:w-[88%] w-[92%] flex items-center md:gap-0 gap-5 flex-col-reverse md:flex-row-reverse">
        <div className="pl-0 md:pl-5 lg:pl-10 md:w-[60%] w-full flex-col  flex text-center gap-5">
          <div className={`${montserrat.className} md:px-2 w-full items-center flex text-center flex-col gap-3`}>
            <div className="md:flex hidden md:pb-5 pb-2 lg:pb-6 flex-col items-center gap-2 justify-start">
              <h1 className="text-black text-xl md:text-4xl font-semibold dark:text-white">
                ABOUT MODERN MANNERISM
              </h1>
              <hr className="h-1 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] w-24" />
            </div>

            <p className="text-gray-700 leading-relaxed  dark:text-gray-300 md:text-base text-sm">
              Modern Mannerism provides professional-quality training and
              learning globally. We help professionals, corporates, and
              organizations to embrace transformation and accomplish
              breakthrough performance by becoming proficient at the skills.
            </p>
            <p className="text-gray-700 leading-relaxed  dark:text-gray-300 md:text-base text-sm">
              Modern Mannerism is devoted to providing excellence in training
              and learning to individuals of all age groups. We help in Managing
              and Improving Self-esteem as well as Appearance management. Each
              module is designed after reviewing lifestyle, goals and
              personality traits systematically.
            </p>
            <p className="text-gray-700 leading-relaxed  dark:text-gray-300 md:text-base text-sm">
              Our services comprise Business Etiquette & Corporate Image
              Programme, Children’s Etiquette Programme, Ladies Grooming & Image
              Enhancement Programme, Fine Dining & Table Etiquette Workshop,
              Professional Image & Attire, Communication & Soft Skills Training
              and Personality Enhancement Programme.
            </p>
          </div>
        </div>
        <div className=" md:w-[40%] w-full flex flex-col md:flex-row items-center justify-stretch">
        <div className=" flex  md:hidden  pb-8 lg:pb-6 flex-col items-center gap-2 justify-start">
              <h1 className="text-black text-xl md:text-4xl font-semibold dark:text-white">
                ABOUT MODERN MANNERISM
              </h1>
              <hr className="h-1 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] w-24" />
            </div>
          <Image
            src="/assets/AboutUsModernMannerism.webp"
            height={300}
            width={500}
            className="border-2 border-[#c3965d] dark:border-[#eabf91] shadow-2xl rounded-lg  border-5"
            alt="modern Mannerism"
          />
        </div>
      </div>
    </div>
  );
}

export default Aboutpage;