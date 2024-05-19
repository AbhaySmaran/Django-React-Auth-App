import React from 'react'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService'

const Navbar = () => {
  const { access_token } = getToken()
  return (
    <div>
      <Box sx={{ flexGrow:1 }}>
        <AppBar position='static' color='secondary'>
          <Toolbar>
            <Typography variant='h5' component='div' sx={{ flexGrow:1 }}>
              Auth-App
            </Typography>
            <Button component={NavLink} to='/' sx={{color: 'white' , backgroundColor: ({ isActive }) => isActive ? '#6d1b7b' : '', textTransform: 'none' }} >Home</Button>
            <Button component={NavLink} to='/contact' sx={{color: 'white', textTransform: 'none' }} >Contact</Button>
            { access_token ? 
              <Button component={NavLink} to='/dashboard' sx={{color: 'white', textTransform: 'none' }} >Logout</Button>
              :
              <Button component={NavLink} to='/login' sx={{color: 'white', textTransform: 'none' }} >Login/Registration</Button>
            }
            
            {/* <Button component={NavLink} to='/login' sx={{color: 'white', textTransform: 'none' }} >Login/Registration</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar