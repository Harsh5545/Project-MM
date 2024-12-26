import AddServices from '@/components/Admin-Components/Admin-Service-Component/Add-Service/AddServices'
import React from 'react'


export const metadata = {
  title: 'Services',
  description: 'Services page',
}


const page = () => {
  return (
    <div>
      <AddServices/>
    </div>
  )
}

export default page