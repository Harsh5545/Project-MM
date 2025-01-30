import AddServices from '@/components/Admin-Components/Admin-Service-Component/Add-Service/AddServices'
import ServicesTable from '@/components/Admin-Components/Admin-Service-Component/Admin-service-Table/Services-Table'
import React from 'react'


export const metadata = {
  title: 'Manage Services',
}


const page = () => {
  return (
    <div>
      <ServicesTable/>
    </div>
  )
}

export default page