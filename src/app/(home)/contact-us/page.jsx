import ContactPage from '@/components/Contact-us Component/Contact'
import React from 'react'



export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Modern Mannerism for inquiries, consultation bookings, or more information about our services in business etiquette and personality development.",
  keywords: "contact Modern Mannerism, business etiquette inquiries, consultation bookings, children's manners contact",
  author: "Modern Mannerism",
  ogTitle: "Contact Modern Mannerism",
  ogDescription: "Have questions or want to book a consultation? Contact Modern Mannerism for personalized coaching in business etiquette and personality development.",
  ogImage: "https://www.modernmannerism.com/contact-og-image.jpg",
  ogUrl: "https://www.modernmannerism.com/contact-us",
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "Contact Modern Mannerism",
    description: "Reach out to Modern Mannerism for any inquiries or to book a consultation in business etiquette and personality development.",
    image: "https://www.modernmannerism.com/contact-twitter-image.jpg"
  }
};


const page = () => {
  return (
    <div><ContactPage /></div>
  )
}

export default page