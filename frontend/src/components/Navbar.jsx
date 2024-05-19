import React from 'react'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink,useNavigate } from 'react-router-dom';
import { getToken,removeToken } from '../services/LocalStorageService'
import { unSetetUserToken } from '../features/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const { access_token } = getToken()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () =>{
    dispatch(unSetetUserToken({access_token: null}))
    removeToken();
    navigate('/login')
  }
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
              <Button onClick={handleLogout} sx={{color: 'white', textTransform: 'none' }} >Logout</Button>
              :
              <Button component={NavLink} to='/login' sx={{color: 'white', textTransform: 'none' }} >Login/Registration</Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar