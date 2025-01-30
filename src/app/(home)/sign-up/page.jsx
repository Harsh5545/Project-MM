import { auth } from '@/auth';
import UserForm from '@/components/SignUp/UserForm'
import { redirect } from 'next/navigation';
import React from 'react';



export const metadata = {
  title: "Sign Up",
  description: "Sign up for Modern Mannerism and start your journey towards mastering business etiquette, children's manners, and personality development.",
  keywords: "sign up, register, Modern Mannerism sign up, create account, register for coaching, etiquette training sign up",
  author: "Modern Mannerism",
  ogTitle: "Sign Up - Modern Mannerism",
  ogDescription: "Create an account with Modern Mannerism to unlock personalized coaching and programs in business etiquette and personality development.",
  ogImage: "https://www.modernmannerism.com/sign-up-og-image.jpg",
  ogUrl: "https://www.modernmannerism.com/sign-up",
  twitter: {
    card: "summary_large_image",
    site: "@modernmannerism",
    creator: "@modernmannerism",
    title: "Sign Up - Modern Mannerism",
    description: "Sign up for Modern Mannerism to begin your personalized coaching in business etiquette, children's manners, and more.",
    image: "https://www.modernmannerism.com/sign-up-twitter-image.jpg"
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