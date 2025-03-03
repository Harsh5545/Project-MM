import AboutHero from "@/components/About-Component/AboutHero"
import Aboutpage from "@/components/About-Component/Aboutpage"
import HomeSection from "@/components/Home-Page-Components/HomeSection"
import { AboutManasi } from "@/components/About-Component/AboutManasi"

export const metadata = {
  title: "About Us | Modern Mannerism",
  description:
    "Learn about Modern Mannerism, an organization dedicated to improving business etiquette, children's manners, and personality development.",
  keywords:
    "about Modern Mannerism, business etiquette, children's manners, personality development, professionalism, coaching, etiquette training",
  author: {
    name: "Modern Mannerism",
  },
  openGraph: {
    title: "About Modern Mannerism - Elevating Etiquette and Personality",
    description:
      "Discover the story of Modern Mannerism and how we help individuals and organizations improve business etiquette, children's manners, and personality development.",
    images: [
      {
        url: "https://www.modernmannerism.com/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Modern Mannerism - About Us",
      },
    ],
    url: "https://www.modernmannerism.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "About Modern Mannerism - Elevating Etiquette and Personality",
    description:
      "Learn more about Modern Mannerism and how we help you with business etiquette, children's manners, and personality development.",
    images: ["https://www.modernmannerism.com/about-twitter-image.jpg"],
  },
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

