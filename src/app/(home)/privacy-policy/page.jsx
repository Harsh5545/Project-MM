import PrivacyPolicyPage from '@/components/Privacy-Policy/PrivacyPolicy'
import React from 'react'



export const metadata = {
  title: "Privacy Policy",
  description: "Read the privacy policy of Modern Mannerism and understand how we collect, use, and protect your personal information.",
  keywords: "privacy policy, personal information protection, Modern Mannerism privacy, data protection, user privacy",
  author: "Modern Mannerism",
  ogTitle: "Privacy Policy - Modern Mannerism",
  ogDescription: "Learn about the privacy practices of Modern Mannerism, including how we handle your personal data and protect your information.",
  ogImage: "https://www.modernmannerism.com/privacy-policy-og-image.jpg",
  ogUrl: "https://www.modernmannerism.com/privacy-policy",
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "Privacy Policy - Modern Mannerism",
    description: "Read the privacy policy of Modern Mannerism and understand how we handle your personal data.",
    image: "https://www.modernmannerism.com/privacy-policy-twitter-image.jpg"
  }
};




const page = () => {
  return (
    <div><PrivacyPolicyPage/></div>
  )
}

export default page