"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FaQuoteLeft } from "react-icons/fa"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

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
      <section className="py-6 md:py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg w-full relative z-10">
        <h6 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-4 md:mb-6">
          Testimonials
        </h6>
        <Card className="transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">No testimonials available at the moment.</p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="py-6 md:py-8 w-full px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg text-center shadow-lg relative z-10">
      <span className="text-2xl sm:text-3xl md:text-4xl w-full font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-4 md:mb-6 block">
        Testimonials
      </span>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
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
            className="p-2 sm:p-4"
          >
            <Card className="transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
              <CardHeader className="flex items-center gap-2 p-2 sm:p-3">
                <FaQuoteLeft className="text-gray-400 dark:text-gray-500" />
              </CardHeader>
              <CardContent className="px-2 sm:px-4 pb-4">
                <p className="italic text-gray-700 text-center dark:text-gray-300 text-sm sm:text-base">
                  {testimonial.comment}
                </p>
                <footer className="text-right mt-3 md:mt-4 text-gray-900 dark:text-white text-sm sm:text-base">
                  - {testimonial.name}
                </footer>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Carousel>
    </section>
  )
}

export default Testimonials

