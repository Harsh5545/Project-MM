'use client';
import { signIn, useSession } from 'next-auth/react';
import React from 'react'
import { FaPassport } from 'react-icons/fa'

const LoginWithPassKey = () => {
    const { data: session, update, status } = useSession();
    
    return (
        <div onClick={() => signIn('passkey')} className='w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-blue-500 rounded-md p-4 flex items-center justify-center'>
            <div>
                {status === "authenticated" ? (
                    <button onClick={() => signIn("passkey", { action: "register" })}>
                        Register new Passkey
                    </button>
                ) : status === "unauthenticated" ? (
                    <button onClick={() => signIn("passkey")}>Sign in with Passkey</button>
                ) : null}
            </div>
        </div>
    )
}

export default LoginWithPassKey