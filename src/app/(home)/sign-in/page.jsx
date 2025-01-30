
import { auth } from '@/auth'
import { LoginForm } from '@/components/LoginMethod/SignIn'
import { redirect } from 'next/navigation';
import React from 'react';



export const metadata = {
  title: "Sign In",
  description: "Sign in to your Modern Mannerism account to access personalized coaching services, courses, and content.",
  keywords: "sign in, login, Modern Mannerism login, account login, coaching platform sign in",
  author: "Modern Mannerism",
  ogTitle: "Sign In - Modern Mannerism",
  ogDescription: "Sign in to your Modern Mannerism account to access your personalized learning and coaching programs.",
  ogImage: "https://www.modernmannerism.com/sign-in-og-image.jpg",
  ogUrl: "https://www.modernmannerism.com/sign-in",
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "Sign In - Modern Mannerism",
    description: "Log in to access personalized coaching, business etiquette programs, and personality development courses.",
    image: "https://www.modernmannerism.com/sign-in-twitter-image.jpg"
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