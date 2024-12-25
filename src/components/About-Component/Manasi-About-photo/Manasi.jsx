// Component/Manasi-About-photo/Manasi.jsx
import Image from "next/image";
import React from "react";

const Manasi = () => {
  return (
    <div className="w-72 h-72 bg-white rounded-3xl p-1 relative shadow-[0_70px_30px_-50px_rgba(96,75,74,0.188)] transition-all duration-500 ease-in-out hover:rounded-tl-[55px]">
      <button className="absolute right-8 top-5 bg-transparent border-none">
        <svg className="stroke-[#fbb9b6] stroke-[3px] hover:stroke-[#f55d56]" />
      </button>
      <div className="absolute w-[calc(100%-6px)] h-[calc(100%-6px)] top-[3px] left-[3px] rounded-[29px] z-10 border-0 border-[#fbb9b6] overflow-hidden transition-all duration-500 ease-in-out delay-200 hover:w-[100px] hover:h-[100px] hover:aspect-square hover:top-[10px] hover:left-[10px] hover:z-30 hover:border-[7px] hover:border-[#fbb9b6] hover:shadow-[0_5px_5px_0_rgba(96,75,74,0.188)] hover:scale-130 hover:rounded-none">
      <Image
            src="/assets/ManasiKadam.jpg"
            height={700}
            width={500}
            alt="modern Mannerism"
            className="image bg-cover border-[#06273A] dark:border-[#fff] border-5 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
          /> 
      </div>
      <div className="absolute bottom-[3px] left-[3px] right-[3px] bg-[#fbb9b6] top-[80%] rounded-[29px] z-20 shadow-[inset_0_5px_5px_0_rgba(96,75,74,0.188)] overflow-hidden transition-all duration-500 ease-in-out delay-0 hover:top-[20%] hover:rounded-[80px_29px_29px_29px]">
        <div className="absolute bottom-0 left-6 right-6 h-40">
          <span className="block text-lg text-white font-bold">Name</span>
          <span className="block text-sm text-white mt-4">About Me</span>
        </div>
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
          <div className="flex gap-4">
            <svg className="h-5 fill-white drop-shadow-[0_5px_5px_rgba(165,132,130,0.133)] hover:fill-[#f55d56] hover:scale-120" />
          </div>
          <button className="bg-white text-[#fbb9b6] border-none rounded-full text-xs py-1 px-2 shadow-[0_5px_5px_0_rgba(165,132,130,0.133)] hover:bg-[#f55d56] hover:text-white">
            Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manasi;