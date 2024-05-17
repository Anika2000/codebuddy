import React from 'react'
import { Box } from '@mui/material';
import { FaAsterisk } from "react-icons/fa";

const Chathistory = () => {
  return (
    <>
    <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: 2,
          bgcolor: 'black',
          border: '1px solid white',
          display: 'flex',
          '&:hover': {
            cursor: 'pointer',
          }, 
          
        }}
      >
        <FaAsterisk className='text-2xl text-white m-auto'/>
      </Box>
    </>

  )
}

export default Chathistory

