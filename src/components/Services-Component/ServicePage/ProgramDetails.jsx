"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ClipboardCopy, FilePen, FilePenLineIcon as Signature, TableColumnsSplit } from "lucide-react"
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const icons = {
  ageGroup: <ClipboardCopy className="h-6 md:h-7 md:w-7 text-[#eabf91]" />,
  duration: <Signature className="h-6 md:h-7 md:w-7 text-[#eabf91]" />,
  format: <FilePen className="h-6 md:h-7 md:w-7 text-[#eabf91]" />,
  location: <TableColumnsSplit className="h-6 md:h-7 md:w-7 text-[#eabf91]" />,
}

const ProgramDetails = ({ data }) => {
  const [selectedDetail, setSelectedDetail] = useState(null)

  if (!data || Object.keys(data).length === 0) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-10 mt-16 md:py-14 px-6 md:px-10 lg:px-16 lg:bg-transparent md:bg-none bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 lg:rounded-none lg:shadow-none  rounded-xl shadow-xl w-full"
    >
      <p
        className={`${cormorant.className} text-4xl md:text-5xl pb-6 md:pb-8 font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-8 md:mb-10  tracking-wide`}
      > 
        Program Details
      </p>

      {/* Decorative element */}

      {/* Accordion for All Devices */}
      <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto">
        {Object.keys(data).map((detail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className={`flex items-center justify-between p-5 md:p-6  bg-white dark:bg-gray-800 rounded-xl shadow-md cursor-pointer border border-gray-100 dark:border-gray-700 transition-all duration-300 ${selectedDetail === detail ? "bg-gradient-to-r from-[#c3965d]/5 via-[#eabf91]/5 to-[#c3965d]/5" : ""}`}
              onClick={() => setSelectedDetail((prev) => (prev === detail ? null : detail))}
            >
              <span className="text-base font-medium capitalize flex items-center gap-4 text-gray-900 dark:text-white">
                <span className="bg-gradient-to-r from-[#c3965d]/10 via-[#eabf91]/10 to-[#c3965d]/10 p-3 rounded-full">
                  {icons[detail]}
                </span>
                <span className={`${dmsans.className} font-light  tracking-wide  leading-relaxed text-base text-left md:text-lg lg:text-xl `}>{detail}</span>
              </span>
              <span className=" text-[#c3965d] font-semibold">{selectedDetail === detail ? "−" : "+"}</span>
            </motion.div>
            {selectedDetail === detail && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 md:p-6 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                {Array.isArray(data[selectedDetail]) ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {data[selectedDetail].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 font-medium dark:bg-gray-700 p-4 md:p-5 rounded-lg hover:shadow-md transition-all duration-300"
                      >
                        <span className={`${dmsans.className}  font-medium tracking-wide  leading-relaxed text-base text-left md:text-lg lg:text-xl   text-[#c3965d] dark:text-[#eabf91]`}>
                          {item.heading}
                        </span>
                        <p className={`${dmsans.className} font-light tracking-wide text-base md:text-base leading-relaxed text-gray-700 dark:text-gray-300 mt-2`}>{item.subheading}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">{data[selectedDetail]}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default ProgramDetails

