
import { LoginForm } from '@/components/LoginMethod/SignIn'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex h-screen items-center justify-center'>
      <div className='flex flex-col w-[400px]'>
  
        <div className='flex flex-col gap-4 mx-2 py-2'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default page