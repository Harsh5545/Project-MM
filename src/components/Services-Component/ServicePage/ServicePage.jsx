"use client"
import React from "react"
import { Cormorant_Garamond, DM_Sans, Montserrat, Playfair_Display } from "next/font/google"
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
import Link from "next/link"

const dm_Sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const dm_Sansss = DM_Sans({
  subsets: ["latin"],
  // style: ["italic"],
  weight: ["400"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: [ "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const ServicePage = ({ data }) => {
  const { heading, subheading, courseDescription, courseDetails, programDetails, testimonials } = data || {}

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="w-24 h-24 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex h-full dark:bg-[rgb(0,0,31)] bg-gradient-to-b from-neutral-50 to-neutral-100 items-center justify-center w-full flex-col">
      {/* Hero Section */}
      <div className="w-full  bg-cover bg-center flex items-end justify-center">
        <ServicesHero data={testimonials?.heroImage}  className="relative" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex absolute pb-8 lg:pb-10 flex-col justify-center items-center text-center z-10 mt-24 sm:mt-24 md:mt-24 px-4 sm:px-6 md:px-20"
        >
          <h1
            className=" text-2xl sm:text-3xl lg:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9e7033] via-[#d4a76b] to-[#9e7033] uppercase tracking-wide"  
          >
            {heading}
          </h1>
          <h2
            className={`${dm_Sans.className} mt-4 md:mt-6 text-base sm:text-lg lg:text-lg text-center max-w-6xl text-black/90`}
          >
            {courseDescription}
          </h2>
        </motion.div>
      </div>

      <div className="w-full flex items-center justify-center dark:bg-[rgb(0,0,31)] bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="w-full max-w-[90%] xl:max-w-[85%]">
          <Overview data={courseDetails} />
          <ProgramHighlights data={courseDetails} />

          <div
            
            className="mt-12 py-10 md:py-14 px-4 md:px-8 lg:px-16 bg-gradient-to-b lg:bg-none md:bg-none lg:shadow-none md:shadow-none from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl"
          >
            <h5
              className={`${cormorant.className} font-semibold bg-clip-text text-center text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] leading-tight text-4xl md:text-5xl pb-6 md:pb-8`}
            >
              Curriculum Overview
            </h5>
            <div className={` font-thin mt-6 md:mt-10 grid  grid-cols-1 md:grid-cols-2 gap-4 md:gap-6`}>
              {courseDetails?.courseDetail?.map((point, index) => (
                <div
                  key={index}
                
                  className="flex items-center gap-4 md:gap-5 p-4 md:p-6 bg-white dark:bg-gray-800/80 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gold-100"
                >
                  <div className="flex justify-center items-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] rounded-full shadow-lg flex-shrink-0">
                    {icons[point.icon]
                      ? React.cloneElement(icons[point.icon], {
                          size: 20,
                          className: "w-5 h-5 md:w-6 md:h-6",
                          color: "#ffffff",
                        })
                      : null}
                  </div>
                  <div className="flex flex-col">
                    <span className={`${dm_Sansss.className} text-sm md:text-sm lg:text-lg  font-medium text-gray-900 dark:text-white`}>
                      {point?.description || "No Heading Available"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ProgramDetails data={programDetails} />

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            viewport={{ once: true }}
            className="my-14 md:my-20 py-8 md:py-10 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] opacity-95 rounded-xl text-center px-6 md:px-10 shadow-xl"
          >
            <p
              className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl mb-6 md:mb-8 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-50 tracking-wide`}
            >
              {testimonials?.taglineHeading || "Transform Your Etiquette Today"}
            </p><Link href={"/contact-us"}>
            <ShadcnButton
              variant="contained"
              className={`${cormorant.className} rounded-full w-auto bg-white hover:bg-gray-50 text-[#c3965d] border-2 border-[#dd9f5d] hover:text-[#b07d3a] p-3 px-6 sm:px-8 md:px-10 text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
             Register Now
            </ShadcnButton></Link>
          </motion.section>

          <Testimonials data={testimonials} />
          <Faq data={testimonials} />
        </div>
      </div>
    </div>
  )
}

export default ServicePage

