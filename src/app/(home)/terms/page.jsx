import TermsPage from '@/components/Terms&Condition/Term&Condition'
import React from 'react'



export const metadata = {
  title: "Terms of Service",
  description: "Read the terms of service for Modern Mannerism, which govern your use of our website and services.",
  keywords: "terms of service, user agreement, website terms, Modern Mannerism terms, terms and conditions",
  author: "Modern Mannerism",
  ogTitle: "Terms of Service - Modern Mannerism",
  ogDescription: "Review the terms of service for Modern Mannerism, outlining the rules for using our website and services.",
  ogImage: "https://www.modernmannerism.com/terms-of-service-og-image.jpg",
  ogUrl: "https://www.modernmannerism.com/terms",
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "Terms of Service - Modern Mannerism",
    description: "Read the terms of service for using Modern Mannerism's website and services.",
    image: "https://www.modernmannerism.com/terms-of-service-twitter-image.jpg"
  }
};



const page = () => {
  return (
    <div><TermsPage/></div>
  )
}

export default page