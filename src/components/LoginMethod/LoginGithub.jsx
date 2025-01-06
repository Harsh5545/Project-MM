'use client'
import {  FaGithub } from "react-icons/fa";
import React from 'react'
import { login } from "@/app/Actions";


const LoginGithub = () => {
    return (
        <div onClick={() => login('github')} className='w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-blue-500 rounded-md p-4 flex items-center justify-center'>
            <FaGithub className='text-white' />
            <p className='text-white'>Login with GitHub</p>
        </div>
    )
}

export default LoginGithub