"use client"
import { Cormorant_Garamond } from "next/font/google"
import Image from "next/image"
import { Star, Award } from "lucide-react"
import { motion } from "framer-motion"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
})
const cormorantGaramonds = Cormorant_Garamond({
  subsets: ["latin"],
  weight: [ "700"],
})
const HomeAbout = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/5 w-full"
          >
            <div className="relative">
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
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-3/5 w-full"
          >
            <div className="flex flex-col gap-8">
              {/* Header */}
              <div className="flex flex-col items-center  gap-3">
                <h2 className={`${cormorantGaramonds.className} text-2xl md:text-4xl font-bold text-gray-900`}>
                  About Modern Mannerism
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#c3965d] to-[#eabf91] rounded-full"></div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm lg:text-lg leading-relaxed">
                Modern Mannerism provides professional-quality training and learning globally. We help professionals,
                corporates, and organizations to embrace transformation and accomplish breakthrough performance by
                becoming proficient at essential social and business skills.
              </p>

              {/* Vision and Values */}
              <div className="grid md:grid-cols-2 gap-8 mt-4">
                {/* Vision Section */}
                <motion.div
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center  gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c3965d] to-[#eabf91] flex items-center justify-center">
                    <Star size={24} className="text-white" />
                  </div>
                  <p className={`${cormorantGaramond.className} text-2xl font-bold text-gray-900`}>Our Vision</p>
                  <p className="text-gray-700">
                    We aim to empower individuals with the confidence, polish, and grace needed to thrive in today's
                    modern world, creating lasting impressions in every interaction.
                  </p>
                </motion.div>

                {/* Values Section */}
                <motion.div
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center  gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c3965d] to-[#eabf91] flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <p className={`${cormorantGaramond.className} text-2xl font-bold text-gray-900`}>Our Values</p>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▪</span> Professionalism: Excellence in every detail
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▪</span> Personalization: Tailored strategies for unique needs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">▪</span> Inclusivity: Adapting to cross-cultural environments
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeAbout

