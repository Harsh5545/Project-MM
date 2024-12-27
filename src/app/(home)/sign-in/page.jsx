
import { LoginForm } from '@/components/LoginMethod/SignIn'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex mt-20 justify-center'>
      <div className='flex flex-col w-[400px]'>
        <h1 className='text-4xl w-full text-center font-bold mb-10'>Sign In</h1>
        <div className='flex flex-col gap-4 mx-2 py-2'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default page