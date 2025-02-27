import HomeSection from '@/components/Home-Page-Components/HomeSection';
import ServicesComponent from '@/components/Services-Component/ServicesComponent';
import ServicesHero from '@/components/Services-Component/servicesHero';


export const metadata = {
  title: "Services",
  description: "Explore our personalized coaching services on business etiquette, children's manners, and personality development for individuals and organizations.",
  keywords: "services, business etiquette coaching, children's manners, personality development, etiquette training, modern manners, professional skills",
  author: "Modern Mannerism",
  ogTitle: "Our Services - Modern Mannerism",
  ogDescription: "Learn more about the services offered by Modern Mannerism, including personalized coaching for business etiquette, children's manners, and personality development.",
  ogImage: "https://www.modernmannerism.com/services-og-image.jpg",
  ogUrl: "https://www.modernmannerism.com/services",
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "Our Services - Modern Mannerism",
    description: "Explore Modern Mannerism's personalized coaching services for business etiquette, children's manners, and personality development.",
    image: "https://www.modernmannerism.com/services-twitter-image.jpg"
  }
};


const Page = async () => {
  // Fetch data from your API endpoint
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/frontend-list`);
  const result = await response.json();

  return (
    <div>
      <ServicesHero />
      <ServicesComponent data={result?.data} />
      <HomeSection/>
    </div>
  );
};

export default Page;
