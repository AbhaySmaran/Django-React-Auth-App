import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import { useDispatch } from 'react-redux';
import { getToken } from '../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  })
  const { access_token } = getToken()
  const { data, isSuccess } =useGetLoggedUserQuery(access_token)

  useEffect(()=>{
    if(data && isSuccess){
      setUserData({
        name: data.name,
        email: data.email
      })
    }
  })

  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'>Email: {userData.email}</Typography>
        <Typography variant='h6'>Name: {userData.name}</Typography>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;