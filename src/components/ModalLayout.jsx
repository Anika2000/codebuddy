import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { MdGroupAdd } from "react-icons/md";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const ModalLayout = ({name}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  return (
    <div>
    <MdGroupAdd className='text-2xl ml-2 cursor-pointer hover:scale-125 
              transition-transform duration-200 ease-out' onClick={handleOpen}/>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Joining as {name}
          </Typography>
          {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
  <div className='flex'>
  <input
    type="text"
    style={{
      borderWidth: '4px',
      borderColor: 'pink',
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'black',
    }}
  />
  <button className='bg-[#f472b6] ml-2 hover:bg-rose-200 text-white font-bold py-2 px-4 rounded'>
  Join
</button>

  </div>
  
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export default ModalLayout