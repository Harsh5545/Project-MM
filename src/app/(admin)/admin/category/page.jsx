
import CategoryManagement from '@/components/Admin-Components/Category-Components/CategoryManagement';
import React from 'react';


export const metadata = {
  title: 'Category | Modern Mannerisim',
  description: 'Category page',
}


const page = () => {
  return (
    <div>
      <CategoryManagement />
    </div>
  )
}

export default page