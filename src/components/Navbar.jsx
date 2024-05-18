"use client";
import React from 'react'
import { BsQrCode } from "react-icons/bs";
import ChatHistory from './ChatHistory';
import Link from 'next/link'
import { IoSettingsOutline } from "react-icons/io5";
import Stack from '@mui/material/Stack';
import { signIn, useSession, signOut } from "next-auth/react";
import { languageOptions } from "../constants/languageOptions";
import { useState } from 'react'
import LanguagesDropdown from './LanguageDropdown';

import { FaRegShareSquare } from "react-icons/fa";
import ModalLayout from './ModalLayout';



const Navbar = () => {
    const { data: session } = useSession();
    const [language, setLanguage] = useState(languageOptions[0]);

    const onSelectChange = (sl) => {
      setLanguage(sl);
    };


  return (
    <>
        <div className='shadow-sm sticky top-0 bg-black z-30 p-3'>
      <div className='flex justify-between'>

        {/* logo */}
        <Stack direction="row" spacing={2}>
        <Link href='/'>
            <BsQrCode className='text-2xl ml-2 text-white'/>
        </Link>
        <LanguagesDropdown onSelectChange={onSelectChange} />
        <ModalLayout />
        <FaRegShareSquare className='text-2xl ml-2 cursor-pointer'/>
        </Stack>
       

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

        {/* {session &&  */}
         <div className="mt-3">
        <IoSettingsOutline className='text-2xl mt-1 cursor-pointer text-white'/>
        </div>
        {/* } */}

        {/* Chathistory */}
        {/* {session &&  */}
        <div>
            <ChatHistory />
        </div>
        {/* } */}
        </Stack>
        
      </div>
    </div>
    </>
  )
}

export default Navbar