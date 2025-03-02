"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Cormorant_Garamond, EB_Garamond, Montserrat } from "next/font/google"
import Link from "next/link"

// Font definitions
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
})

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const HeroCarousel = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <section className="relative min-h-[90vh] w-full bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
      {/* Background pattern - subtle elegant pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c3965d" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container  w-[90%] mx-auto px-3 sm:px-2 lg:px-8 py-32 lg:py-24 relative z-10">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="lg:w-1/2 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col gap-3"
            >
              <p
                className={`${ebGaramond.className} uppercase font-serif text-2xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight`}
              >
                Your personality is your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 whitespace-nowrap">
                  BRAND
                </span>
                <br />
                that Makes you{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 whitespace-nowrap">
                  SHINE!
                </span>
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <p className={`${montserrat.className} text-base md:text-lg text-gray-700 leading-relaxed max-w-xl`}>
                We help individuals & professionals from all walks of life enhance their communication, image &
                etiquette to succeed in their personal & professional life.
              </p>
              <p className={`${montserrat.className} text-base md:text-xl text-gray-800 font-medium leading-relaxed`}>
                Ready to start your image transformation journey?
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start">
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(201, 148, 81, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`${cormorantGaramond.className} flex text-lg items-center justify-center px-10 py-3 bg-gradient-to-r from-[#c3965d] to-[#eabf91] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Know more
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div variants={itemVariants} className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Decorative elements */}
              {/* <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-amber-500 rounded-tl-3xl opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-amber-500 rounded-br-3xl opacity-70"></div> */}

              {/* Main image container with gradient background */}
              <div className="relative overflow-hidden rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl bg-gradient-to-r from-[#c3965d] to-[#eabf91] shadow-2xl">
                <Image
                  src="/assets/Manasi_png_bg_png_bg.png"
                  width={500}
                  height={400}
                  alt="Modern Mannerism Coach"
                  className="object-contain w-full h-[60%]"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroCarousel

