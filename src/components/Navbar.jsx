import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LoginMethod/LogoutButton';
import Image from 'next/image';

const Navbar = async () => {
    const session = await auth();
    return (
        <nav className='border-b border-gray-300 bg-background w-full flex items-center'>
            <div className='flex w-full items-center justify-between my-4'>
                <Link href="/" className='font-bold'>
                    Home
                </Link>

                <div className='flex items-center gap-x-5'>
                    <Link href="/admin">
                        Dashboard
                    </Link>
                    <Link href="/add-new">
                        Add New
                    </Link>
                </div>

                <div className='flex items-center gap-x-5'>
                    {
                        !session?.user ?
                            (
                                <Link href="/sign-in">
                                    <div className='bg-indigo-600 text-white px-4 py-2 rounded-md'>
                                        Sign In
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <div className='flex items-center gap-x-2 text-sm'>
                                        {session?.user?.name}
                                        {session?.user?.image && (
                                            <Image src={session?.user?.image} width={30} height={30} className='w-10 h-10 rounded-full' alt='user image' />
                                        )}
                                    </div>
                                    <LogoutButton />
                                </>
                            )

                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar