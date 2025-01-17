import CardComponent from "@/components/Home-Page-Components/CardComponent";
import HeroCarousel from "@/components/Home-Page-Components/HeroCarousel";
import HomeAbout from "@/components/Home-Page-Components/HomeAbout";
import HomeConsultation from "@/components/Home-Page-Components/HomeConsultation";
import HomeDinning from "@/components/Home-Page-Components/HomeDinning";
import HomeSection from "@/components/Home-Page-Components/HomeSection";
import HomeTestimonial from "@/components/Home-Page-Components/HomeTestimonial";


const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Modern Mannerism - Home",
  "description": "Learn business etiquette, children's manners, and personality development with Modern Mannerism.",
  "url": "https://www.modernmannerism.com",
  "publisher": {
    "@type": "Organization",
    "name": "Modern Mannerism",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.modernmannerism.com/logo.png"
    }
  },
  "author": {
    "@type": "Organization",
    "name": "Modern Mannerism"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.modernmannerism.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};


export const metadata = {
  title: "Modern Mannerism - Elevating Etiquette and Personality",
  description: "Modern Mannerism offers personalized coaching in business etiquette, children's manners, and personality development.",
  keywords: "business etiquette, children's manners, personality development, modern manners, professional skills, children's etiquette, etiquette coaching",
  author: "Modern Mannerism",
  ogTitle: "Modern Mannerism - Elevating Etiquette and Personality",
  ogDescription: "Learn essential skills for professional and personal growth with Modern Mannerism's coaching programs on etiquette and personality development.",
  ogImage: "https://www.modernmannerism.com/og-image.jpg",
  ogUrl: "https://www.modernmannerism.com",
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "Modern Mannerism - Elevating Etiquette and Personality",
    description: "Learn essential skills for professional and personal growth with Modern Mannerism's coaching programs on etiquette and personality development.",
    image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <HeroCarousel />
      <CardComponent />
      <HomeDinning />
      <HomeAbout />

      <HomeTestimonial />
      <div id="testimonials">
        <HomeConsultation /></div>
      <HomeSection />
    </>
  );
}
