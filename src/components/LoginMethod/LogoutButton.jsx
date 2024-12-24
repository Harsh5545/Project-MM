'use client';

import { logout } from '@/app/Actions'
import React from 'react'

const LogoutButton = () => {
  return (
    <div onClick={() => logout()} className='bg-gray-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer'>Logout</div>
  )
}

export default LogoutButton