"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Cormorant_Garamond, EB_Garamond, Montserrat } from "next/font/google";
import Link from "next/link";

// Font definitions
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const HeroCarousel = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative max-h-fit md:max-h-fit  lg:min-h-[90vh] w-full bg-gradient-to-t from-neutral-50 to-neutral-200 overflow-hidden">
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

      <div className="container w-[95%] md:w-[86%] mx-auto px-3 sm:px-2 lg:px-1 py-24 lg:py-24 relative z-10">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="lg:w-1/2 w-full flex flex-col gap-12 lg:gap-16 z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <h1
                className={`${ebGaramond.className} uppercase md:text-left text-center whitespace-normal md:whitespace-nowrap font-serif text-3xl md:text-3xl lg:text-5xl font-light text-gray-900 leading-tight`}
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
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="flex md:text-left text-center flex-col gap-5 lg:gap-8">
              <p className={`${montserrat.className} text-base md:text-base text-gray-700 leading-relaxed max-w-xl`}>
                We help individuals & professionals from all walks of life enhance their communication, image &
                etiquette to succeed in their personal & professional life.
              </p>
              <p className={`${montserrat.className} text-lg md:text-lg text-gray-800 font-medium leading-relaxed`}>
                Ready to start your image transformation journey?
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex md:justify-start justify-center items-center">
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
          <motion.div variants={itemVariants} className="lg:w-1/3 relative z-10">
            <div className="relative hidden lg:flex overflow-hidden shadow-3xl bg-[#F4DCD3] rounded-br-[40%] rounded-tl-[60%] lg:rounded-br-[150px] lg:rounded-tl-[150px] rounded-tr-3xl px-2 p-0 items-center justify-center">
              <Image
                src={"/assets/Manasi_png_bg_png_bg.png"}
                width={500}
                height={400}
                alt="Modern Mannerism"
                className="object-contain max-w-screen-2xl rounded-3xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
                <div className="absolute bottom-8 left-8 right-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white text-sm font-medium"
                  >
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:w-1/2 lg:hidden hidden relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="relative flex justify-center w-full"
            >
              <div className="relative w-full flex justify-center">
                <div className="relative flex min-h-xl w-[75%] bg-[#F4DCD3] bg-opacity-35 justify-center lg:justify-end overflow-hidden rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl shadow-2xl">
                  <Image
                    src="/assets/Manasi_png_bg_png_bg.png"
                    width={600}
                    height={500}
                    alt="Modern Mannerism Coach Manasi Kadam"
                    className="object-contain w-full"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCarousel;