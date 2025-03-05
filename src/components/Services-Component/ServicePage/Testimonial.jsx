"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FaQuoteLeft } from "react-icons/fa"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Playfair_Display, Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1280, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 480 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
}

const Testimonials = ({ data }) => {
  const { testimonials } = data || {}

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-10 md:py-14 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl w-full relative z-10">
        <h6
          className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6 md:mb-8 tracking-wide`}
        >
          Testimonials
        </h6>
        <Card className="transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 text-center text-lg">
              No testimonials available at the moment.
            </p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-10 md:py-14 w-full lg:bg-none md:bg-none lg:shadow-none md:shadow-none px-6 md:px-10 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl text-center relative z-10"
    >
      <span
        className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl w-full font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6 md:mb-8 block tracking-wide`}
      >
        Testimonials
      </span>

      {/* Decorative element */}
      {/* <div className="w-24 h-1 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mx-auto mb-10"></div> */}

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .8s"
        transitionDuration={800}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6"
          >
            <Card className="transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto">
              <CardHeader className="flex items-center justify-center gap-2 p-2 sm:p-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#c3965d]/10 via-[#eabf91]/10 to-[#c3965d]/10">
                  <FaQuoteLeft className="text-[#c3965d] text-xl" />
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                <p
                  className={`${cormorant.className} italic text-gray-700 text-center dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed`}
                >
                  "{testimonial.comment}"
                </p>
                <footer className="text-center mt-6 md:mt-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mx-auto mb-4"></div>
                  <p className="text-gray-900 dark:text-white text-base sm:text-lg font-medium">{testimonial.name}</p>
                </footer>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Carousel>
    </motion.section>
  )
}

export default Testimonials

