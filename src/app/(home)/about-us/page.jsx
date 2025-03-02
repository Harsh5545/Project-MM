import AboutHero from '@/components/About-Component/AboutHero'
import Aboutpage from '@/components/About-Component/Aboutpage'
import React from 'react'
import HomeSection from '@/components/Home-Page-Components/HomeSection'
import { AboutManasi } from '@/components/About-Component/AboutManasi'



export const metadata = {
  title: "About Us",
  description: "Learn about Modern Mannerism, an organization dedicated to improving business etiquette, children's manners, and personality development.",
  keywords: "about Modern Mannerism, business etiquette, children's manners, personality development, professionalism, coaching, etiquette training",
  // author: "Modern Mannerism",
  author:{
    name:"Modern Mannerism",
  },
  ogTitle: "About Modern Mannerism - Elevating Etiquette and Personality",
  ogDescription: "Discover the story of Modern Mannerism and how we help individuals and organizations improve business etiquette, children's manners, and personality development.",
  ogImage: "https://www.modernmannerism.com/about-og-image.jpg",
  ogUrl: "https://www.modernmannerism.com/about",
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "About Modern Mannerism - Elevating Etiquette and Personality",
    description: "Learn more about Modern Mannerism and how we help you with business etiquette, children's manners, and personality development.",
    image: "https://www.modernmannerism.com/about-twitter-image.jpg"
  }
};




const page = () => {
  return (
    <div><AboutHero/>
    <Aboutpage/>
    
    <AboutManasi/>
    <HomeSection/>
    </div>
    )
}

export default page