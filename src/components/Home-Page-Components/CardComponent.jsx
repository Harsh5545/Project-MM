"use client"
import Image from "next/image"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import { useRouter } from "next/navigation"
import { Cormorant_Garamond } from "next/font/google"
import { useMediaQuery } from "react-responsive"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import styles from "./styles.module.css"

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
})

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const CardComponent = () => {
  const router = useRouter()
  const isMobile = useMediaQuery({ maxWidth: 1024 })

  const courses = [
    {
      image: "/assets/Personality Development.jpeg",
      title: "Young Adult Finishing Programme",
      description: "Elevate Confidence, Charm, and Life Skills for a Bright Future.",
      isBestSelling: false,
    },
    {
      image: "/assets/BusinessHandshake.jpg",
      title: "Building Business Programme",
      description: "Master the art of business etiquette and elevate your corporate image.",
      isBestSelling: true,
    },
    {
      image: "/assets/Etiquettechildren.jpg",
      title: "Children’s Etiquette Programme",
      description: "Teach your children essential etiquette skills in a fun and engaging way.",
      isBestSelling: false,
    },
  ]

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

  const handleReadMore = (title) => {
    const slug = generateSlug(title)
    router.push(`/services/${slug}`)
  }

  return (
    <div className="w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:bg-[#00001F] flex flex-col justify-center items-center pb-16">
      <div className="md:w-[90%] w-[95%]">
      <div className="flex flex-col items-center lg:mb-5 mb-4 gap-0 lg:gap-3">
                <h2 className={`${dm_Sans.className} text-2xl md:text-4xl font-bold text-gray-900`}>
                  Our Services
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#c3965d] to-[#eabf91] rounded-full"></div>
              </div>

        {isMobile ? (
          <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} itemClass="px-2 py-2">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} handleReadMore={handleReadMore} />
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 w-full px-4">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} handleReadMore={handleReadMore} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const CourseCard = ({ course, handleReadMore }) => (
  <div
    onClick={() => handleReadMore(course.title)}
    className={`relative ${styles.container} w-full bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] 
    dark:bg-[rgb(18,32,49)] rounded-3xl text-black p-3 text-center flex flex-col items-center h-[400px] lg:h-[450px] 
    dark:hover:bg-[#0e1a2b] shadow-2xl hover:shadow-md hover:shadow-[#8c9c88] 
    dark:hover:shadow-[#3a4e4f] transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer`}
  >
    {course.isBestSelling && (
      <div className={`${styles.card_box}`}>
        <span></span>
      </div>
    )}
    <div className="w-full h-[200px] lg:h-[240px] flex justify-center items-center dark:bg-[#021625] rounded-2xl overflow-hidden">
      <Image
        alt={course.title}
        className="object-cover w-full h-full"
        height={250}
        width={380}
        src={course.image || "/placeholder.svg"}
      />
    </div>
    <div className="flex flex-col justify-center items-center gap-3 lg:gap-4 flex-grow py-4">
      <p className="font-semibold lg:text-xl text-lg dark:text-white text-[#000000]">{course.title}</p>
      <p className="dark:text-gray-400 w-full lg:w-[90%] text-gray-900 lg:text-base text-sm">{course.description}</p>
    </div>
    <div className="mb-4">
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleReadMore(course.title)
        }}
        className={`${dm_Sans.className} flex items-center justify-center tracking-wider bg-black 
        text-[#DEC29F] font-bold p-2 px-4 rounded-xl transition-colors duration-300 ease-in-out text-sm`}
      >
        Read more <MdOutlineArrowForwardIos className="ml-2" />
      </button>
    </div>
  </div>
)

export default CardComponent

