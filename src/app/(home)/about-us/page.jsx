import AboutHero from "@/components/About-Component/AboutHero"
import Aboutpage from "@/components/About-Component/Aboutpage"
import HomeSection from "@/components/Home-Page-Components/HomeSection"
import { AboutManasi } from "@/components/About-Component/AboutManasi"


export const metadata = {
  title: "About Us",
  description:"Learn about Modern Mannerism, an organization dedicated to improving business etiquette, children's manners, and personality development.",
  keywords:"about Modern Mannerism, business etiquette, children's manners, personality development, professionalism, coaching, etiquette training",
  author: {
    name: "Modern Mannerism",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
  },
  openGraph: {
    title: "About Modern Mannerism - Elevating Etiquette and Personality",
    description:
      "Discover the story of Modern Mannerism and how we help individuals and organizations improve business etiquette, children's manners, and personality development.",
    images: [
      {
        url: "https://ik.imagekit.io/giol62jyf/static/MM.png?updatedAt=1741423895125",
        width: 1200,
        height: 630,
        alt: "Modern Mannerism - About Us",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
    type: "website",
  }
}

const AboutUsPage = () => {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <Aboutpage />
      <HomeSection />
      <AboutManasi />
    </main>
  )
}

export default AboutUsPage

