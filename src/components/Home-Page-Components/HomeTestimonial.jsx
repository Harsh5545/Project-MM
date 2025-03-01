"use client"

import { useState } from "react"
import Image from "next/image"
import { Cormorant_Garamond } from "next/font/google"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const dmSans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
})

const HomeTestimonial = () => {
  // Sample testimonial data - replace with your actual data
  const testimonialData = [
    {
      id: 1,
      Name: "Sarah Johnson",
      Description:
        "The business etiquette workshop completely transformed how I present myself in professional settings. The personalized coaching helped me identify areas for improvement I wasn't even aware of. I've received numerous compliments on my enhanced communication skills since completing the program.",
      Image: "/assets/testimonial1.jpg",
      City: "New York",
    },
    {
      id: 2,
      Name: "Michael Chen",
      Description:
        "As a parent, I was concerned about my children's social skills. The children's etiquette program was engaging and effective. My kids now understand the importance of good manners and apply them naturally. The instructor's patience and expertise made all the difference.",
      Image: "/assets/testimonial2.jpg",
      City: "Chicago",
    },
    {
      id: 3,
      Name: "Emily Rodriguez",
      Description:
        "The dining etiquette workshop was eye-opening! I never realized how many subtle cues I was missing at business dinners. The practical, hands-on approach gave me confidence to navigate formal dining situations with ease. This has been invaluable for my career advancement.",
      Image: "/assets/testimonial3.jpg",
      City: "Los Angeles",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1))
  }

  return (
    <section
      className="relative w-full py-16 lg:py-24"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url('/assets/Website-Background.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h2 className={`${dmSans.className} text-3xl md:text-4xl font-bold text-center mb-12 text-white`}>
          Client Testimonials
        </h2>

        <Card className="bg-white dark:bg-gray-800 shadow-xl max-w-5xl w-full mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <Image
                  src={testimonialData[currentIndex].Image || "/placeholder-user.jpg"}
                  width={100}
                  height={100}
                  alt={testimonialData[currentIndex].Name}
                  className="rounded-full border-4 border-[#eabf91] shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#eabf91] text-white p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
              </div>

              <blockquote className="text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  "{testimonialData[currentIndex].Description}"
                </p>

                <footer className="flex flex-col items-center">
                  <cite className="text-xl font-semibold text-gray-900 dark:text-white not-italic">
                    {testimonialData[currentIndex].Name}
                  </cite>
                  {testimonialData[currentIndex].City && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonialData[currentIndex].City}
                    </span>
                  )}
                </footer>
              </blockquote>

              <div className="flex gap-4 mt-4">
                <Button
                  onClick={prevSlide}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-[#eabf91] text-[#eabf91] hover:bg-[#eabf91] hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  onClick={nextSlide}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-[#eabf91] text-[#eabf91] hover:bg-[#eabf91] hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pagination indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-[#eabf91] w-6" : "bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeTestimonial

