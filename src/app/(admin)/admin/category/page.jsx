
import CategoryManagement from '@/components/Admin-Components/Category-Components/CategoryManagement';
import React from 'react';


export const metadata = {
  title: 'Manage Category',
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