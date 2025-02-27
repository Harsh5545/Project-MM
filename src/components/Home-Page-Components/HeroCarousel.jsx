"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});
const EBGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});

const HeroSection = () => {
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
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-[95vh] mx-auto flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-900">
  <div className="w-[85%]  px-[1vw] mx-auto">

        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24"
        >
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 flex flex-col gap-8 lg:pr-12 mb-10 lg:mb-0"
          >
           <h1 className={`${EBGaramond.className} font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight `}>
  Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r whitespace-nowrap from-amber-500 to-amber-700">Modern Mannerism</span>
</h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 font-light leading-relaxed">
              Discover the epitome of sophistication and elegance. Where tradition meets modern luxury, creating unforgettable moments.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${dm_Sans.className} flex items-center max-w-max px-8 py-4 bg-gradient-to-r from-[#793600] to-[#eabf91] text-slate-50 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Begin Your Journey
              <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:w-1/3 relative"
          >

            <div className="relative hidden lg:flex overflow-hidden shadow-3xl bg-[#F4DCD3] rounded-br-[40%] rounded-tl-[60%] lg:rounded-br-[150px] lg:rounded-tl-[150px] rounded-tr-3xl px-2 p-0 items-center justify-center">
              <Image
                src={"/assets/Manasi_png_bg_png_bg.png"}
                  width={500}
                  height={400}
                alt="Modern Mannerism "
                className="object-contain  max-w-screen-2xl rounded-3xl"
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
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;