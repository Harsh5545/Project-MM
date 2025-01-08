import { auth } from '@/auth';
import UserForm from '@/components/SignUp/UserForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session = await auth();
  
    if (session?.user?.role === 'User') {
      redirect('/user');
    }
    
    if (session?.user?.role === 'Admin') {
      redirect('/admin');
    }
  return (
    <div>
     <UserForm/>
    </div>
  )
}

export default page