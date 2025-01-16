import ServicesComponent from '@/components/Services-Component/ServicesComponent';
import ServicesHero from '@/components/Services-Component/servicesHero';

const Page = async () => {
  // Fetch data from your API endpoint
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/frontend-list`);
  const result = await response.json();

  return (
    <div>
      <ServicesHero />
      <ServicesComponent data={result?.data} />
    </div>
  );
};

export default Page;
