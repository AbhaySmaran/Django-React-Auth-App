import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import { getToken } from '../../../services/LocalStorageService';
import { useChangeUserPasswordMutation,useGetLoggedUserQuery } from '../../../services/userAuthApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../features/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [server_error, setServerError] = useState({});
  const [server_msg,setServerMsg] = useState({});
  const dispatch = useDispatch()
  const { access_token } = getToken()
  // console.log(access_token)
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [changeUserPassword, {isLoading}] = useChangeUserPasswordMutation()
  const [password,setPassword] = useState('')
  const [password2,setPassword2] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // const data = new FormData(e.currentTarget)
    // const actualData = {
    //   password: data.get('password'),
    //   password2: data.get('password2')
    // };
    // await changeUserPassword({actualData, access_token})
    // console.log(res)
    const res = await axios.post('http://127.0.0.1:8000/api/user/changepassword/',{
      password: password,
      password2: password2
    },{
      headers:{
        'Authorization': `Bearer ${access_token}`
      }
    })
    navigate('/')
    if(res.errer){
      setServerError(res.error.data.errors)
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
        <h1>Change Password</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
          <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            {server_error.password ? <Typography>{server_error.password[0]}</Typography> : ''}
          <TextField margin="normal" required fullWidth name="password2" label="Confirm New Password" type="password" id="password2" value={password2} onChange={(e)=>setPassword2(e.target.value)} />
            {server_error.password2 ? <Typography>{server_error.password2[0]}</Typography> : ''}
          <Box textAlign='center'>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
          </Box>
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''} 
        </Box>
      </Box>
    </>
  );
}
  

export default ChangePassword;