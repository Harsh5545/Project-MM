"use client"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Playfair_Display, Cormorant_Garamond, Montserrat } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const Faq = ({ data }) => {
  if (!data) return null

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] my-12 md:my-20 flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-10 lg:px-16 lg:py-20 xl:py-24 rounded-xl shadow-xl w-full relative z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] opacity-90 rounded-xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-white/10"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10"></div>

      <div className="relative flex flex-col md:flex-row gap-8 md:gap-10 w-full">
        {/* Left Side */}
        <div className="md:w-1/2">
          <span
            className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left text-white mb-6 md:mb-8 block tracking-wide`}
          >
            Why Choose Modern Mannerism?
          </span>

          <Card className="dark:bg-gray-800/90 tracking-wider bg-white/95 w-full md:w-[90%] lg:w-[85%] shadow-lg border-0">
            <CardHeader className="p-4 md:p-6">
              <CardTitle
                className={`${cormorant.className} tracking-wide text-gray-800 dark:text-gray-200 text-xl md:text-4xl font-bold`}
              >
                Benefits of Modern Mannerism
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <p className= {`${montserrat.className} font-semibold tracking-wide text-gray-700 dark:text-gray-300 text-base md:text-base leading-relaxed`}>
                {data?.mmDescription}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[60%]">
          <span
            className={`${playfair.className}  text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left my-6 md:my-8 text-white mb-6 md:mb-8 block tracking-wide`}
          >
            Frequently Asked Questions
          </span>
          <Accordion type="single" collapsible className="space-y-4 out md:space-y-6">
            {data?.faqs?.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-transparent tracking-wider border-none outline-none shadow-lg overflow-hidden">
                    <AccordionTrigger
                      className={`${cormorant.className} text-base md:text-lg font-bold lg:text-xl bg-white/95 dark:bg-gray-800/90  text-gray-900 dark:text-white p-4 md:p-6 rounded-t-xl`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className={`${montserrat.className} text-gray-800 bg-white/80 dark:bg-gray-800/70 dark:text-gray-200 p-4 md:p-6 rounded-b-xl text-sm md:text-base`}>
                      {faq.answer}
                    </AccordionContent>
                  </Card>
                </motion.div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </motion.section>
  )
}

export default Faq

