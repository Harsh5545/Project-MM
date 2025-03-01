"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Cormorant_Garamond } from "next/font/google"
import { useMediaQuery } from "react-responsive"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const dmSans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
})

const CardComponent = () => {
  const router = useRouter()
  const isMobile = useMediaQuery({ maxWidth: 1024 })

  const courses = [
    {
      image: "/assets/Personality Development.jpeg",
      title: "Personality Enhancement Programme",
      description:
        "Unlock your full potential with our Personality Enhancement Programme. Develop confidence, communication skills, and a polished presence.",
      isBestSelling: false,
    },
    {
      image: "/assets/BusinessHandshake.jpg",
      title: "Business Etiquette & Corporate Image Programme",
      description:
        "Master the art of business etiquette and elevate your corporate image. Learn professional networking, meeting protocols, and executive presence.",
      isBestSelling: true,
    },
    {
      image: "/assets/Etiquettechildren.jpg",
      title: "Children's Etiquette Programme",
      description:
        "Teach your children essential etiquette skills in a fun and engaging way. Build social confidence, table manners, and respectful communication.",
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
    <section className="w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:bg-gray-900 py-16">
      <div className="container  w-[90%] mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2
            className={`${dmSans.className} text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#28425f] dark:from-[#eabf91] dark:to-[#c3965d] mb-4`}
          >
            Our Services
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#28425f] to-[#76766b] dark:from-[#eabf91] dark:to-[#c3965d] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="overflow-hidden h-full transition-all flex flex-col justify-between duration-300 hover:shadow-lg dark:bg-gray-800 border-0 shadow-md"
            >
              <div className="relative">
                {course.isBestSelling && (
                  <div className="absolute top-0 right-0 z-10">
                    <Badge className="bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold px-3 py-1 m-2">
                      Best Selling
                    </Badge>
                  </div>
                )}
                <div className="w-full h-[220px] overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <CardHeader>
                <h3 className={`${dmSans.className} text-xl font-semibold text-gray-900 dark:text-white`}>
                  {course.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleReadMore(course.title)}
                  variant="outline"
                  className="w-full bg-gradient-to-r from-[#c3965d] to-[#eabf91] text-white border-0 hover:bg-[#793600] transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CardComponent

