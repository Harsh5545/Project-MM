import { AddCategoryDialog } from '@/components/Admin-Components/Category-Components/AddCategoryDailog'
import CategoryTable from '@/components/Admin-Components/Category-Components/CategoryTable'
import React from 'react'


export const metadata = {
  title: 'Category',
  description: 'Category page',
}


const page = () => {
  return (
    <div>
      <AddCategoryDialog />
      <CategoryTable/>
    </div>
  )
}

export default page