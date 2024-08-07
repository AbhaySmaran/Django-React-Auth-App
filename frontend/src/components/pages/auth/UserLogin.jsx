import { TextField, Button, Box, Alert, Typography, CircularProgress,Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUserToken } from '../../../features/authSlice';
import { setUserInfo } from '../../../features/userSlice';
import { getToken, storeToken } from '../../../services/LocalStorageService';
import { useLoginUserMutation } from '../../../services/userAuthApi';
import Pic1 from '../../Image/pic1.png';

const UserLogin = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
    console.log(res)
    if (res.error) {
      setServerError(res.error.data.errors)
      console.log(res.error.data.errors)
    }
    if (res.data) {
      storeToken(res.data.token) 
      let { access_token } = getToken()
      dispatch(setUserToken({access_token: access_token}))
      navigate('/home')
    }
  }

  // let { access_token } = getToken()
  // useEffect(()=>{
  //   dispatch(setUserToken({access_token: access_token}))
  // },[access_token, dispatch])
  

  return <>
    <Grid container sx={{ height: '90vh',marginTop: '64px' }}>
      <Grid item lg={7} sm={5} sx={{
        backgroundImage: `url(${Pic1})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: { xs: 'none', sm: 'block' }
      }}>
      </Grid>
      <Grid item lg={5} sm={7} xs={12}>
        <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
          {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
          <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
          {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
          <NavLink to='/register'>Sign Up</NavLink>
          <Box textAlign='center'>
            {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
          </Box>
          <NavLink to='/passwordresetemail' >Forgot Password ?</NavLink>
          <br />
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        </Box>
      </Grid>
    </Grid>
  </>;
};

export default UserLogin;