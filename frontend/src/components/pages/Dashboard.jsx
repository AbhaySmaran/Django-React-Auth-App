import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useState, usxeEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import { getToken,removeToken } from '../../services/LocalStorageService'
import { useDispatch } from 'react-redux';
import { unSetetUserToken } from '../../features/authSlice';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)
  const [userData, setUserData ] = useState({
    name: '',
    email: ''
  })
  console.log(data)
  const handleLogout = () => {
    dispatch(unSetetUserToken({access_token: null}))
    removeToken();
    navigate('/login')
  }
  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'>Email: abhay@gmail.com</Typography>
        <Typography variant='h6'>Name: abhay</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;