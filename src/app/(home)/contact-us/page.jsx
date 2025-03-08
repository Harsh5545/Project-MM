import ContactPage from '@/components/Contact-us Component/Contact'
import React from 'react'



export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Modern Mannerism for inquiries, consultation bookings, or more information about our services in business etiquette and personality development.",
  keywords: "contact Modern Mannerism, business etiquette inquiries, consultation bookings, children's manners contact",
  author: "Modern Mannerism",
  openGraph: {
    title: "About Modern Mannerism - Elevating Etiquette and Personality",
    description:"Discover the story of Modern Mannerism and how we help individuals and organizations improve business etiquette, children's manners, and personality development.",
    images: [
      {
        url: "https://ik.imagekit.io/giol62jyf/static/MM.png?updatedAt=1741423895125",
        width: 1200,
        height: 630,
        alt: "Modern Mannerism - About Us",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
    type: "website",
  }
};


const page = () => {
  return (
    <div><ContactPage /></div>
  )
}

export default page