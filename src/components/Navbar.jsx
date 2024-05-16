"use client";
import React from 'react'
import { BsQrCode } from "react-icons/bs";
import ChatHistory from './ChatHistory';
import Link from 'next/link'
import { RxAvatar } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import Stack from '@mui/material/Stack';
import { signIn, useSession, signOut } from "next-auth/react";


const Navbar = () => {
    const { data: session } = useSession();

  return (
    <>
        <div className='shadow-sm sticky top-0 bg-black z-30 p-3'>
      <div className='flex justify-between'>

        {/* logo */}
        <Link href='/'>
            <BsQrCode className='text-4xl ml-12'/>
        </Link>

        {/* redirects */}
        <Stack direction="row" spacing={2}>
        {session ? (
          <div className="flex gap-2 items-center">
            <IoMdAddCircleOutline
              className="text-2xl cursor-pointer transform hover:scale-125 
              transition duration-300 hover:text-red-600"
              onClick={() => setIsOpen(true)}
            />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-8 w-8 rounded-full 
            cursor-pointer"
              onClick={signOut}
            />
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="test-sm font-semibold text-blue-500"
          >
            Log In
          </button>
        )}

        <div className="mt-3">
        <IoSettingsOutline className='text-2xl mt-3 cursor-pointer'/>
        </div>

        {/* Chathistory */}
        <div>
            <ChatHistory />
        </div>
        </Stack>
        
      </div>
    </div>
    </>
  )
}

export default Navbar