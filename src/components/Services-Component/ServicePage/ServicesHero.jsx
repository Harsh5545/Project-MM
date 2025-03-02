import Image from "next/image"

function ServicesHero({ data }) {
  return (
    <div className="w-full relative">
      <div className="w-full min-h-[25vh] sm:min-h-[30vh] md:min-h-[35vh] relative">
        <Image
          src={data || "/placeholder.svg?height=500&width=1000"}
          alt="Service Hero"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 dark:bg-[#060507] bg-[#BEBEBE] dark:bg-opacity-60 bg-opacity-80"></div>
      </div>
    </div>
  )
}

export default ServicesHero

