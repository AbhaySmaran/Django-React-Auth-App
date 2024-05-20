import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import { useDispatch } from 'react-redux';
import { getToken } from '../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { setUserInfo } from '../../features/userSlice';

// import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [userData,setUserData] = useState({
    name: '',
    email: ''
  })
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)  

  useEffect(()=>{
    if(data && isSuccess){
      setUserData({
        name: data.name,
        email: data.email
      }) 
    }
  },[data,isSuccess])

  useEffect(()=>{
    if(data && isSuccess){
      dispatch(setUserData({
        name: data.name,
        email: data.email
      }))
    }
  },[data,isSuccess,dispatch])

  console.log(data)

  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'>Email: {data.email}</Typography>
        <Typography variant='h6'>Name: {data.name}</Typography>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;