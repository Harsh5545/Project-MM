import HomeSection from '@/components/Home-Page-Components/HomeSection';
import ServicesComponent from '@/components/Services-Component/ServicesComponent';
import ServicesHero from '@/components/Services-Component/servicesHero';


export const metadata = {
  title: "Services",
  description: "Explore our personalized coaching services on business etiquette, children's manners, and personality development for individuals and organizations.",
  keywords: "services, business etiquette coaching, children's manners, personality development, etiquette training, modern manners, professional skills",
  author: {
    name: "Modern Mannerism",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
  },
  openGraph: {
    title: "Modern Mannerism - Services",
    description:"Explore our personalized coaching services on business etiquette, children's manners, and personality development for individuals and organizations.",
    images: [
      {
        url: "https://ik.imagekit.io/giol62jyf/static/MM.png?updatedAt=1741423895125",
        width: 1200,
        height: 630,
        alt: "Modern Mannerism - About Us",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
    type: "website",
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
