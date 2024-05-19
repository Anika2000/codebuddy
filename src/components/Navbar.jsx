"use client";
import React from 'react'
import { BsQrCode } from "react-icons/bs";
import ChatHistory from './ChatHistory';
import Link from 'next/link'
import { IoSettingsOutline } from "react-icons/io5";
import Stack from '@mui/material/Stack';
import { signIn, useSession, signOut } from "next-auth/react";
import { languageOptions } from "../constants/languageOptions";
import { useState, useContext  } from 'react'
import LanguagesDropdown from './LanguageDropdown';

import { FaRegShareSquare } from "react-icons/fa";
import ModalLayout from './ModalLayout';
import AppContext from './AppContext';
import { toast } from 'react-toastify'



const Navbar = () => {
    const { data: session } = useSession();
    const [language, setLanguage] = useState(languageOptions[0]);
    const { value, setValue } = useContext(AppContext);

    const onSelectChange = (sl) => {
      setLanguage(sl);
      setValue(sl);
    };


    const [roomId, setRoomId] = useState(null);
    const userId = session?.user?.id || 'dummy-user-id';

    const handleShareClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/codebuddy/generate-room-id/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }), 
            });
            if (response.ok) {
                const data = await response.json();
                setRoomId(data.room_id);
                // Copy the room ID to the clipboard
                console.log('Room ID:', data.room_id);
                navigator.clipboard.writeText(data.room_id);
                // Show a toast notification
                toast.success(`Room ID (${data.room_id}) has been copied to clipboard`);
            } else {
                console.error('Failed to generate room ID');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
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
        <FaRegShareSquare className='text-2xl ml-2 cursor-pointer hover:scale-125 
              transition-transform duration-200 ease-out'
        onClick={handleShareClick}/>
        </Stack>
       

        {/* redirects */}
        <Stack direction="row" spacing={2}>
        {session ? (
          <div className="flex gap-2 items-center">
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
        <IoSettingsOutline className='text-2xl mt-1 cursor-pointer text-white
        hover:scale-125 transition-transform duration-200 ease-out'/>
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