"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import icons from "@/hooks/icons"

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
    <section className="py-6 md:py-8 mt-8 md:mt-16 px-4 md:px-6 lg:px-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg w-full relative z-10">
      <h4 className="text-2xl sm:text-3xl md:text-4xl pb-4 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-4">
        Program Highlights
      </h4>
      <div className="relative">
        <div className={`grid gap-2 sm:gap-3 md:gap-4 ${getGridCols()} items-stretch`}>
          {data?.programHighlights?.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-1 sm:p-2 text-center h-full"
            >
              <Card
                className="h-full flex flex-col justify-between transition-all duration-100 hover:bg-gradient-to-r hover:from-[#c3965d] hover:via-[#eabf91] hover:to-[#c3965d] hover:text-white group"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Icon Section */}
                <div className="flex justify-center pt-8 md:pt-12 items-center pb-2 md:pb-4 px-2 md:px-4">
                  {icons[highlight.icon] ? (
                    <div>
                      {React.cloneElement(icons[highlight.icon], {
                        size: isMobile ? 30 : 40,
                        className: "w-8 h-8 md:w-10 md:h-10",
                        color: isHovered === index ? "#ffffff" : "#eabf91",
                      })}
                    </div>
                  ) : null}
                </div>

                {/* Header Section */}
                <CardHeader className="text-center py-1 md:py-2 space-y-1 px-2 md:px-4 flex-grow">
                  <CardTitle className="text-sm sm:text-base lg:text-lg font-bold transition-all duration-100 group-hover:text-white line-clamp-2">
                    {highlight?.heading}
                  </CardTitle>
                </CardHeader>

                {/* Content Section */}
                <CardContent className="text-center pb-4 md:pb-6 px-2 md:px-4">
                  <p className="transition-all text-xs sm:text-sm duration-100 group-hover:text-white line-clamp-3">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramHighlights

