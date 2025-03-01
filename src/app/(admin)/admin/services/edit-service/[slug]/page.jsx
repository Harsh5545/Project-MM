import EditServices from '@/components/Admin-Components/Admin-Service-Component/Update-Service/UpdateServices';
import React from 'react'

const page = async ({params}) => {
    const slug = (await params).slug;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/service-details?slug=${slug}`);
    const result = await response.json();
  return (
    <div>
        <EditServices data={result?.data} />
    </div>
  )
}

export default page