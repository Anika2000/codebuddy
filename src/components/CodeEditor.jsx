"use client";
import React, {useState, useContext, useEffect} from 'react'
import Editor from '@monaco-editor/react';
import AppContext from './AppContext';
import ModalLayout from './ModalLayout';
import { BsQrCode } from "react-icons/bs";
import ChatHistory from './ChatHistory';
import Link from 'next/link'
import { IoSettingsOutline } from "react-icons/io5";
import Stack from '@mui/material/Stack';
import { signIn, useSession, signOut } from "next-auth/react";
import { languageOptions } from "../constants/languageOptions";
import LanguagesDropdown from './LanguageDropdown';
import MainLayout from './MainLayout';
import { FaRegShareSquare } from "react-icons/fa";



import { toast } from 'react-toastify'
import Chatbot from './Chatbot';



const CodeEditor = ({code = "//whateverhere"}) => {

  const { data: session } = useSession();
  const [language, setLanguage] = useState(languageOptions[0]);
  const { value, setValue } = useContext(AppContext);
  const [joinedRoomId, setJoinedRoomId] = useState(null);
  
  const [editorCode, setEditorCode] = useState(code);
    
   const [socket, setSocket] = useState(null);
  
    const [roomId, setRoomId] = useState(null);
    const userId = session?.user?.uid || 'dummy-user-id';

    const onSelectChange = (sl) => {
      setLanguage(sl);
      setValue(sl);
    };


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

              socket.send(JSON.stringify({ 
                  type: 'create_collaboration',
                  userId : userId,
                  roomId: data.room_id,
                 }));

          } else {
              console.error('Failed to generate room ID');
          }
      } catch (error) {
          console.error('Network error:', error);
      }
  };


    const onChange = (action, data) => {
        switch (action) {
          case "code": {
            setEditorCode(data);
            break;
          }
          default: {
            console.log("case not handled!");
          }
        }
      };

      const handleJoin = (roomId) => {
        setJoinedRoomId(roomId);
        if (socket && socket.readyState === WebSocket.OPEN) {
          console.log("do i come here?")
         //sending a message to our server
         //routing.py receive will listen to incoming messages from my client here
          socket.send(JSON.stringify({ 
            type: 'join_collaboration',
              roomId: joinedRoomId,
             }));
          //console.log('Sent message:', newValue);
        }
      };


    const handleEditorChange = (newValue) => {
      console.log("here 2")
      setEditorCode(newValue);
      onChange('code', newValue);
  
      // Send the new code to the server via WebSocket
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("do i come here?")
       //sending a message to our server
       //routing.py receive will listen to incoming messages from my client here
        socket.send(JSON.stringify({ 
          type: 'code_change',
           code: newValue,
            roomId: joinedRoomId,
           }));
        console.log('Sent message:', newValue);
      }
    };

  useEffect(() => {
    console.log("here")
    const socketInstance = new WebSocket('ws://localhost:8000/ws/socket-server/');

    socketInstance.onopen = () => {
      console.log('WebSocket connection established');
    };

    socketInstance.onmessage = (event) => {
      console.log("hi")
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      if (message.type === 'code_change') {
        console.log("i should come here if there was code change so monaco editor is set")
        setEditorCode(message.code);
      }
    };

    socketInstance.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, []);



    return (
      <>
      <MainLayout 
      childOne={
        <>
        <div className='shadow-sm  bg-black z-30 p-3'>
      <div className='flex justify-between'>
        <Stack direction="row" spacing={2}>
        <Link href='/'>
            <BsQrCode className='text-2xl ml-2 text-white'/>
        </Link>
        <LanguagesDropdown onSelectChange={onSelectChange} />
        <ModalLayout name='Join Room' onJoin={handleJoin}/>
        <FaRegShareSquare className='text-2xl ml-2 cursor-pointer hover:scale-125 
              transition-transform duration-200 ease-out'
        onClick={handleShareClick}/>

        </Stack>

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
      
      <Editor
        height="100vh"
        language={value}
        value={editorCode}
        theme= "vs-dark"
        onChange={handleEditorChange}
    />
    </>}
      childTwo={<Chatbot />}
      />
      </>
        
    );
}

export default CodeEditor
