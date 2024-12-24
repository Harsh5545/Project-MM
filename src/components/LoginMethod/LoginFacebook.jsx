'use client'
import { FaFacebook } from "react-icons/fa";
import React from 'react'
import { login } from "@/app/Actions";
import { signIn } from "next-auth/react";

const LoginFacebook = () => {
    return (
        <div onClick={() => login('facebook')} className='w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-blue-500 rounded-md p-4 flex items-center justify-center'>
            <FaFacebook className='text-white' />
            <p className='text-white'>Login with Facebook</p>
        </div>
    )
}

export default LoginFacebook