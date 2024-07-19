import React from 'react'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink,useNavigate } from 'react-router-dom';
import { getToken,removeToken,removeUser } from '../services/LocalStorageService'
import { unSetUserToken } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cart = useSelector(state => state.cart)
  const { access_token } = getToken()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () =>{
    dispatch(unSetUserToken({access_token: null}))
    removeToken();
    removeUser();
    navigate('/login')
  }
  return (
    <div>
      <Box sx={{ flexGrow:1 }}>
        <AppBar position='fixed' color='secondary'>
          <Toolbar>
            <Typography variant='h5' component='div' sx={{ flexGrow:1 }}>
              Product Listing Portal
            </Typography>
            <Button component={NavLink} to='/home' sx={{color: 'white' , backgroundColor: ({ isActive }) => isActive ? '#6d1b7b' : '', textTransform: 'none' }} >Home</Button>
            <Button component={NavLink} to='/contact' sx={{color: 'white', textTransform: 'none' }} >Profile</Button>
            <Button component={NavLink} to='/cart' sx={{color: 'white', textTransform: 'none' }}>Cart</Button>
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