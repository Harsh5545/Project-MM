"use client"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Cormorant_Garamond } from "next/font/google"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
})

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    Name: "Sarah Johnson",
    Description:
      "The business etiquette workshop completely transformed how I present myself in professional settings. The personalized coaching helped me identify areas for improvement I wasn't even aware of. Now I feel confident in any business situation!",
    Image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    Name: "Michael Chen",
    Description:
      "I enrolled my 10-year-old daughter in the children's etiquette program, and the results have been remarkable. She's more confident, polite, and socially aware. The coach made learning manners fun and engaging!",
    Image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    Name: "Priya Sharma",
    Description:
      "The fine dining workshop was eye-opening! I learned so much about proper table manners and dining etiquette that I now feel completely at ease during business dinners. Highly recommend for any professional.",
    Image: "/placeholder.svg?height=80&width=80",
  },
]

const HomeTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-16 lg:py-16 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-2 overflow-hidden sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <h5 className={`${cormorantGaramond.className} text-4xl font-bold text-gray-900 mb-4`}>
            Client Testimonials
          </h5>
          <div className="h-1 w-16 bg-gradient-to-r from-[#c3965d] to-[#eabf91] rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Large quote mark */}
          <div className="absolute -top-10 -left-10 opacity-10">
            <Quote size={80} className="text-[#c3965d]" />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <p className="text-gray-700 text-lg md:text-xl italic text-center mb-8 leading-relaxed">
                  "{testimonials[currentIndex].Description}"
                </p>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-amber-200">
                    <Image
                      src={testimonials[currentIndex].Image || "/placeholder.svg"}
                      width={80}
                      height={80}
                      alt={testimonials[currentIndex].Name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className={`${cormorantGaramond.className} text-xl font-bold text-gray-900`}>
                    {testimonials[currentIndex].Name}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 hover:bg-[#eabf91] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-[#c3965d] w-3 h-3" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 hover:bg-[#eabf91] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeTestimonial

