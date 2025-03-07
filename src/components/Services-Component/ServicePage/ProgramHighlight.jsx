"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import icons from "@/hooks/icons"
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const ProgramHighlights = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getGridCols = () => {
    if (isMobile) return "grid-cols-1"
    if (isTablet) return "grid-cols-2"
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-10 md:py-14 px-6  md:px-8 lg:px-10 lg:bg-none md:bg-none lg:shadow-none md:shadow-none bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl w-full relative z-10"
    >
      <h4
        className={`${cormorant.className} md:mb-10 text-4xl md:text-5xl pb-6 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d]  to-[#eabf91] mb-8 tracking-wide`}
      >
        Program Highlights
      </h4>

      {/* Decorative elements */}
      {/* <div className="w-24 h-1 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mx-auto mb-10"></div> */}

      <div className="relative">
        <div className={`grid gap-4 sm:gap-5 md:gap-6 ${getGridCols()} items-stretch`}>
          {data?.programHighlights?.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-2 sm:p-3 text-center h-full"
            >
              <Card
                className="h-full flex flex-col justify-between transition-all duration-300 hover:bg-gradient-to-r hover:from-[#c3965d] hover:via-[#eabf91] hover:to-[#c3965d] hover:text-white group border border-gray-200 dark:border-gray-700 overflow-hidden rounded-xl"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Remove the top border line since we'll have the hover effect */}

                {/* Icon Section */}
                <div className="flex justify-center pt-10 md:pt-12 items-center pb-4 md:pb-6 px-4 md:px-6">
                  {icons[highlight.icon] ? (
                    <div className="p-4 rounded-full bg-gradient-to-r from-[#c3965d]/10 via-[#eabf91]/10 to-[#c3965d]/10">
                      {React.cloneElement(icons[highlight.icon], {
                        size: isMobile ? 32 : 40,
                        className: "w-8 h-8 md:w-10 md:h-10",
                        color: isHovered === index ? "#ffffff" : "#eabf91",
                      })}
                    </div>
                  ) : null}
                </div>

                {/* Header Section */}
                <CardHeader className="text-center py-2 md:py-3 space-y-1 px-4 md:px-6 flex-grow">
                  <CardTitle
                    className={`${dmsans.className} font-medium  tracking-wide  leading-relaxed text-base md:text-lg lg:text-xl  transition-all duration-300 line-clamp-2 group-hover:text-white text-gray-800 dark:text-gray-100`}
                  >
                    {highlight?.heading}
                  </CardTitle>
                </CardHeader>

                {/* Content Section */}
                <CardContent className="text-center pb-6 md:pb-8 px-4 md:px-6">
                  <p className={`${dmsans.className} font-light tracking-wide text-sm md:text-sm leading-relaxed transition-all  duration-300 line-clamp-3 group-hover:text-white text-gray-600 dark:text-gray-300`}>
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default ProgramHighlights

