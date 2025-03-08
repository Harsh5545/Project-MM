
import { auth } from '@/auth'
import { LoginForm } from '@/components/LoginMethod/SignIn'
import { redirect } from 'next/navigation';
import React from 'react';



export const metadata = {
  title: "Sign In",
  description: "Sign in to your Modern Mannerism account to access personalized coaching services, courses, and content.",
  keywords: "sign in, login, Modern Mannerism login, account login, coaching platform sign in",
  openGraph: {
    title: "Modern Mannerism - Sign In",
    description:"Sign in to your Modern Mannerism account to access personalized coaching services, courses, and content.",
    images: [
      {
        url: "https://ik.imagekit.io/giol62jyf/static/MM.png?updatedAt=1741423895125",
        width: 1200,
        height: 630,
        alt: "Modern Mannerism - Sign In",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/sign-in`,
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