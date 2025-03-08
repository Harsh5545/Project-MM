import { auth } from '@/auth';
import UserForm from '@/components/SignUp/UserForm'
import { redirect } from 'next/navigation';
import React from 'react';



export const metadata = {
  title: "Sign Up",
  description: "Sign up for Modern Mannerism and start your journey towards mastering business etiquette, children's manners, and personality development.",
  keywords: "sign up, register, Modern Mannerism sign up, create account, register for coaching, etiquette training sign up",
  openGraph: {
    title: "Modern Mannerism - Sign Up",
    description:"Sign up for Modern Mannerism and start your journey towards mastering business etiquette, children's manners, and personality development.",
    images: [
      {
        url: "https://ik.imagekit.io/giol62jyf/static/MM.png?updatedAt=1741423895125",
        width: 1200,
        height: 630,
        alt: "Modern Mannerism - Sign up",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/sign-up`,
    type: "website",
  }
};


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