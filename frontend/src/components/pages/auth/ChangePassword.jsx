import { Box, TextField, Button, Alert } from '@mui/material';
import { useState,useEffect } from 'react';
import { getToken } from '../../../services/LocalStorageService';
import { useChangeUserPasswordMutation,useGetLoggedUserQuery } from '../../../services/userAuthApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../features/authSlice';

const ChangePassword = () => {
  const [server_erroe, setServerError] = useState({});
  const [server_msg,setServerMsg] = useState({});
  const dispatch = useDispatch()
  const { access_token } = getToken()
  console.log(access_token)
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [changeUserPassword, {isLoading}] = useChangeUserPasswordMutation()
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2')
    }
    const res = await changeUserPassword({actualData, access_token})
    console.log(res)
  }
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
        <h1>Change Password</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
          <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
          <TextField margin="normal" required fullWidth name="password2" label="Confirm New Password" type="password" id="password2" />
          <Box textAlign='center'>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
  

export default ChangePassword;