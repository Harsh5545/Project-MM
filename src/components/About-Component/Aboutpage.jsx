import Image from "next/image";
import React from "react";

function Aboutpage() {
  return (
    <div className="flex flex-col dark:bg-[#00001F] md:flex-row  items-center gap-5 justify-evenly px-3 w-full h-full py-16 md:py-20  lg:py-24">
      <div className="md:w-[92%] w-full flex md:gap-0 gap-5 flex-col md:flex-row">
        <div className="flex-1 flex-col flex text-center gap-5 ">
          <div className="px-2 md:w-[90%] w-full flex text-center flex-col gap-4">
            <div className="flex md:pb-5 pb-2 lg:pb-10 flex-col items-center gap-2 justify-center">
              <h1 className=" text-black text-xl md:text-4xl font-semibold dark:text-white">
                ABOUT MODERN MANNERISM
              </h1>
              <hr className="h-1 bg-gradient-to-r  from-[#c3965d] via-[#eabf91] to-[#c3965d] w-24" />
            </div>

            <p className="  text-base">
              Modern Mannerism provides professional-quality training and
              learning globally. We help professionals, corporates, and
              organizations to embrace transformation and accomplish
              breakthrough performance by becoming proficient at the skills.
            </p>
            <p className="  text-base">
              Modern Mannerism is devoted to providing excellence in training
              and learning to individuals of all age groups. We help in Managing
              and Improving Self-esteem as well as Appearance management. Each
              module is designed after reviewing lifestyle, goals and
              personality traits systematically.
            </p>
            <p className="  text-base">
              Our services comprise Business Etiquette & Corporate Image
              Programme, Children’s Etiquette Programme, Ladies Grooming & Image
              Enhancement Programme, Fine Dining & Table Etiquette Workshop,
              Professional Image & Attire, Communication & Soft Skills Training
              and Personality Enhancement Programme.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full flex items-center justify-center ">
          <Image
            src="/assets/AboutUsModernMannerism.webp"
            height={300}
            width={500}
            className="border-[#06273A] dark:border-[#fff] border-5"
            alt="modern Mannerism"
          />
        </div>
      </div>
    </div>
  );
}

export default Aboutpage;
