
import ServicePage from '@/components/Services-Component/ServicePage/ServicePage';
import React from 'react'
const page = async ({ params }) => {
  const slug = (await params).slug

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/service-details?slug=${slug}`);
  const result = await response.json();
  
  return (
    <>
      <ServicePage data={result?.data} />
    </>
  )
};

export default page;