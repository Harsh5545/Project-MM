import React from "react";
import { Cormorant_Garamond } from "next/font/google";
import { UsersRound, GlobeLock, Handshake , LaptopMinimal } from 'lucide-react';

import Image from "next/image"; // Ensure Image is imported
// Import the custom ShadCN Button you created

const dm_Sans = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400"],
});

const Overview = (props) => {
    const { overview, programOptions } = props
    return (
        <div className="flex  bg-slate-50 rounded-2xl flex-col py-6 md:py-16 w-full">
            {/* Main Content */}
            <div className="flex relative dark:bg-[#00001F] gap-6 justify-center flex-col md:flex-row items-center">
                {/* Image Section */}
                <div className="w-[90%] relative md:w-2/5 flex  justify-center m-2 items-center">
                    <div className="relative">
                <div className="absolute right-[-80] top-[-180] circle-animation">
					{/* <div style={{clipPath:'circle(50% at 0 100%)'}} className="bg-gradient-to-b hidden md:block from-[#c3965d] to-[#eabf91] w-[100px] h-[200px]"></ div>														 */}
                </div>
                        <Image
                            width={400}
                            height={500}
                            alt="modern Mannerism image"
                            src="/assets/AboutUsModernMannerism.webp"
                            className="shadow-2xl h-auto lg:h-[60vh] rounded-2xl  object-cover p-0 lg:p-0.5 shadow-[#d1d9df]"
                            style={{
                                boxShadow:
                                    " black 0px 0px 0px 2px inset, rgba(255, 255, 255, 1) 10px -10px 0px -2px, #eabf91 10px -10px",
                            }}
                        />
                    </div>
                   
                </div>

                {/* About Section */}
                <div className="w-full md:w-3/5 flex flex-col gap-10">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 justify-center">
                        <h5
                            className={`${dm_Sans.className} text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6`}
                        >
                            Overview
                        </h5>
                        {/* <hr className="h-1 bg-[#eabf91] w-16" /> */}
                    </div>

                    {/* Description */}
                    <p className="text-gray-800 dark:text-white p-2 text-center">
                        {overview}
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 justify-between items-stretch p-4 md:p-6">
                        {programOptions.map((option, index) => (
                            <div key={index} className="flex gap-8">
                                <div className=" flex flex-col items-center gap-4 bg-gray-50 dark:bg-[#1A1A3B] p-6 rounded-lg shadow-lg">
                                    {index == 0 && <UsersRound size={40} color="#eabf91" />}
                                    {index == 1 && <Handshake    size={40} color="#eabf91" />}
                                    {/* {index == 1 && <p className="p-1 text-4xl font-semibold text-[#eabf91]">1:1</p>} */}
                                    {index == 2 && <LaptopMinimal size={40} color="#eabf91" />}
                                    <span
                                        className={`${dm_Sans.className} font-bold dark:text-white md:text-2xl text-xl text-[#06273A]`}
                                    >
                                        {option.title}
                                    </span>
                                    <p className="text-gray-700 dark:text-gray-300 md:text-sm text-xs text-start">
                                        {option.description}
                                    </p>
                                </div>
                                <div
                                    className={`hidden md:block ${index == programOptions.length - 1 ? "invisible" : "visible"
                                        }`}
                                    style={{
                                        height: "auto",
                                        width: 2,
                                        backgroundColor: "#eabf91",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vision and Values Section */}
        </div>
    );
};

export default Overview;
