import React from "react"
import { Cormorant_Garamond } from "next/font/google"
import icons from "@/hooks/icons"
import Image from "next/image"

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const Overview = ({ data}) => {
  return (
    <div className="flex flex-col py-6 md:py-6 lg:py-8 w-full">
      {/* Main Content */}
      <div className="flex relative dark:bg-[#00001F] gap-4 md:gap-6 justify-center flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="w-full max-w-[90%] md:max-w-none md:w-2/5 relative flex justify-center mx-auto md:mx-2 mb-6 md:mb-0 items-center">
          <div className="relative">
            <div className="absolute right-[-80px] top-[-180px] circle-animation">
              {/* Animation circle placeholder */}
            </div>
            <Image
              width={800}
              height={600}
              alt={`${data?.overviewDescription?.slice(0, 3) || "Overview image"}`}
              src={data?.overviewImage || "/placeholder.svg?height=500&width=400"}
              className="shadow-2xl h-auto max-h-[40vh] md:max-h-[50vh] lg:max-h-[60vh] rounded-2xl object-cover p-0 lg:p-0.5 shadow-[#d1d9df]"
              style={{
                boxShadow:
                  "black 0px 0px 0px 2px inset, rgba(255, 255, 255, 1) 10px -10px 0px -2px, #eabf91 10px -10px",
              }}
            />
          </div>
        </div>

        {/* About Section */}
        <div className="w-full px-4 md:px-0 md:w-3/5 flex flex-col justify-between items-center gap-6 md:gap-10">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3
              className={`${dm_Sans.className} text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-4 md:mb-6`}
            >
              Overview
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-800 dark:text-white p-2 text-center text-sm md:text-base">
            {data?.overviewDescription}
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:gap-4 lg:gap-8 justify-between items-stretch p-2 md:p-4 lg:p-6">
            {data?.courseHeadings?.map((option, index) => (
              <div key={index} className="flex justify-center items-center gap-2 md:gap-4 lg:gap-8">
                <div className="flex flex-col items-center gap-3 md:gap-4 border-2 border-[#eabf91] border-opacity-90 dark:border-[#eabf91]  bg-gray-50 dark:bg-[#1A1A3B] p-3 md:p-4 lg:p-6 rounded-lg shadow-lg w-full">
                  {icons[option.icon]
                    ? React.cloneElement(icons[option.icon], {
                        size: 30,
                        className: "w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10",
                        color: "#eabf91",
                      })
                    : null}
                  <span
                    className={`${dm_Sans.className} font-bold dark:text-white text-lg md:text-xl lg:text-2xl text-[#06273A] text-center`}
                  >
                    {option.heading}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm text-center">{option.subheading}</p>
                </div>
                <div
                  className={`hidden md:block ${index == data?.courseHeadings?.length - 1 ? "invisible" : "visible"}`}
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
    </div>
  )
}

export default Overview