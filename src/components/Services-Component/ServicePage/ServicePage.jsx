"use client"
import React from "react"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import { motion } from "framer-motion"
import ShadcnButton from "@/components/Atom/button/ShadcnButton"
import "react-multi-carousel/lib/styles.css"
import Overview from "./Overview"
import Faq from "./Faq"
import ProgramHighlights from "./ProgramHighlight"
import ProgramDetails from "./ProgramDetails"
import Testimonials from "./Testimonial"
import ServicesHero from "./ServicesHero"
import icons from "@/hooks/icons"

const dm_Sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
})

const dm_Sanss = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
})

const ServicePage = ({ data }) => {
  const { heading, subheading, courseDescription, courseDetails, programDetails, testimonials } = data || {}

  if (!data) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="flex h-full dark:bg-[rgb(0,0,31)] bg-[#FFFFFF] items-center justify-center w-full flex-col">
      <div className="w-full  bg-cover bg-center flex items-end justify-center">
        <ServicesHero data={testimonials?.heroImage} className="relative" />

        <div className="flex absolute pb-6 lg:pb-8 flex-col justify-center items-center text-center text-black z-10 mt-16 sm:mt-20 md:mt-24">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9e7033] via-[#c3965d] to-[#9e7033] uppercase px-2 md:px-0">
            {heading}
          </h1>
          <h2
            className={`${dm_Sans.className} mt-2 md:mt-4 px-4 text-base sm:text-lg lg:text-xl text-center max-w-3xl`}
          >
            {subheading}
          </h2>
        </div>
      </div>

      <div className="w-full flex items-center justify-center dark:bg-[rgb(0,0,31)] bg-[#F7F7F7]">
        <div className="w-full max-w-[96%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%]">
          <section className="md:my-10 my-6 px-4 md:px-8 lg:px-12 py-0 text-center">
            <p
              className={`${dm_Sans.className} text-center text-gray-900 dark:text-gray-100 text-sm sm:text-base lg:text-lg mx-2`}
            >
              {courseDescription}
            </p>
          </section>

          <Overview data={courseDetails} />
          <ProgramHighlights data={courseDetails} />

          <section className="mt-8 py-6 md:py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
            <h5 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-center text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] leading-tight pb-4 md:pb-6">
              Curriculum Overview
            </h5>
            <div className={`${dm_Sanss.className} mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4`}>
              {courseDetails?.courseDetail?.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <div className="flex justify-center items-center w-6 h-6 md:w-7 md:h-7 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] rounded-full shadow-lg flex-shrink-0">
                    {icons[point.icon]
                      ? React.cloneElement(icons[point.icon], {
                          size: 18,
                          className: "w-4 h-4 md:w-5 md:h-5",
                          color: "#ffffff",
                        })
                      : null}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base md:text-lg font-normal text-gray-900 dark:text-white">
                      {point?.description || "No Heading Available"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <ProgramDetails data={programDetails} />

          {/* Call to Action */}
          <section className="my-10 md:my-14 py-4 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] opacity-90 rounded-lg text-center px-4">
            <p className="text-xl sm:text-2xl lg:text-4xl mb-4 md:mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-50">
              {testimonials?.taglineHeading || "No Heading Available"}
            </p>
            <ShadcnButton
              variant="contained"
              className={`${dm_Sanss.className} rounded-full w-auto bg-gradient-to-r from-white to-slate-50 text-[#dd9f5d] border-2 border-[#dd9f5d] hover:text-gray-900 p-2 px-4 sm:px-6 md:px-8 text-sm sm:text-base shadow-lg`}
            >
              Register Now
            </ShadcnButton>
          </section>

          <Testimonials data={testimonials} />
          <Faq data={testimonials} />
        </div>
      </div>
    </div>
  )
}

export default ServicePage

