import React from "react";
import Image from "next/image";

function ServicesHero({ data }) {
  return (
    <div className="w-full  relative">
      <div className="w-full min-h-[40vh] md:min-h-[30vh] relative">
        <Image
          src={data}
          alt="Service Hero"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 dark:bg-[#060507] bg-[#BEBEBE] dark:bg-opacity-60 bg-opacity-80"></div>
      </div>
    </div>
  );
}

export default ServicesHero;

