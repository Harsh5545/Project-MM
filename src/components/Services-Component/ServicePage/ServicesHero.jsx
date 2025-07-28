"use client"
import Image from "next/image"
import { motion } from "framer-motion"

function ServicesHero({ data }) {
  return (
    <div className="w-full relative">
        <div className="w-full min-h-[44vh] sm:min-h-[35vh] md:min-h-[30vh] lg:min-h-[40vh] relative pt-16 sm:pt-20 md:pt-24">
        <Image
          src={data || "/placeholder.svg?height=800&width=1600"}
          alt=" Modern Mannerism Service Hero"
          layout="fill"
          objectFit="cover"
          title="Service Hero Image"
          quality={100}
          priority
          className="z-0 "
        />
        <motion.div
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 dark:bg-[#060507] bg-[#BEBEBE] dark:bg-opacity-70 bg-opacity-90 z-1"
        ></motion.div>
        {/* <div className="absolute inset-0 dark:bg-[#060507] bg-[#BEBEBE] dark:bg-opacity-70 bg-opacity-90 z-1"></div> */}

        {/* Decorative elements */}
        {/* <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-[#9e7033]/20 via-[#d4a76b]/30 to-[#9e7033]/20 z-2"></div> */}
        {/* <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-[#9e7033]/20 via-[#d4a76b]/30 to-[#9e7033]/20 z-2"></div> */}
      </div>
    </div>
  )
}

export default ServicesHero

