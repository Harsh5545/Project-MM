'use client'
import { FaGoogle } from "react-icons/fa";
import React from 'react'
import { login } from "@/app/Actions";
import { signIn } from "next-auth/react";

const LoginGoogle = () => {
    return (
        <div onClick={() => login('google')} className='w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-blue-500 rounded-md p-4 flex items-center justify-center'>
            <FaGoogle className='text-white' />
            <p className='text-white'>Login with Google</p>
        </div>
    )
}

export default LoginGoogle