"use client";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Image from "next/image";
import { Star, Award } from "lucide-react";
import { motion } from "framer-motion";

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cormorantGaramonds = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const HomeAbout = () => {
  return (
    <section className="py-16 overflow-hidden lg:py-24 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0, delay: 0 }}
            className="lg:w-2/5 w-full"
          >
            <div className="relative flex justify-center items-center">
              {/* Decorative elements */}
              <Image
                width={600}
                height={800}
                alt="Modern Mannerism Coach"
                src="/assets/AboutUsModernMannerism.jpg"
                className="rounded-lg shadow-2xl relative z-10"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.3) 0px 0px 0px 2px inset, rgba(255, 255, 255, 0.5) 10px -10px 0px -3px, rgba(201, 148, 81, 0.8) 10px -10px",
                }}
              />
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0, delay: 0 }}
            className="lg:w-3/5 w-full"
          >
            <div className="flex flex-col gap-8">
              {/* Header */}
              <div className="flex flex-col items-center gap-3">
                <h3 className={`${dm_Sans.className} text-2xl md:text-4xl font-bold text-gray-900`}>
                  About Modern Mannerism
                  {/* our services */}
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-[#c3965d] to-[#eabf91] rounded-full"></div>
              </div>

              {/* Description */}
              <p className={`${montserrat.className} text-gray-700 text-center text-sm lg:text-base leading-relaxed`}>
                Modern Mannerism provides professional-quality training and learning globally. We help professionals,
                corporates, and organizations to embrace transformation and accomplish breakthrough performance by
                becoming proficient at essential social and business skills.
              </p>

              {/* Vision and Values */}
              <div className="grid md:grid-cols-2 gap-8 mt-4">
                {/* Vision Section */}
                <motion.div
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c3965d] to-[#eabf91] flex items-center justify-center">
                    <Star size={24} className="text-white" />
                  </div>
                  <p className={`${cormorantGaramond.className} text-2xl font-bold text-gray-900`}>Our Vision</p>
                  <p className={`${montserrat.className} text-gray-700 text-sm md:text-sm text-center`}>
                    We aim to empower individuals with the confidence, polish, and grace needed to thrive in today's
                    modern world, creating lasting impressions in every interaction.
                  </p>
                </motion.div>

                {/* Values Section */}
                <motion.div
                  whileHover={{ y: -10, transition: { duration: 3 } }}
                  className="bg-white rounded-xl p-6 shadow-xl flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c3965d] to-[#eabf91] flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <p className={`${cormorantGaramond.className} text-2xl font-bold text-gray-900`}>Our Values</p>
                  <ul className={`${montserrat.className} text-sm md:text-sm flex flex-col md:gap-2 text-gray-700`}>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3965d]">▪</span> Professionalism: Excellence in every detail
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3965d]">▪</span> Personalization: Tailored strategies for unique needs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3965d]">▪</span> Inclusivity: Adapting to cross-cultural environments
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeAbout;