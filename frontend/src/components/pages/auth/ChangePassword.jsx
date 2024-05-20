import { Box, TextField, Button, Alert } from '@mui/material';
import { useState,useEffect } from 'react';
import { getToken } from '../../../services/LocalStorageService';
import { useChangeUserPasswordMutation } from '../../../services/userAuthApi';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
  const [server_erroe, setServerError] = useState({});
  const [server_msg,setServerMsg] = useState({});

  const [changeUserPassword] = useChangeUserPasswordMutation()
  const { access_token } = getToken()

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    }
    const res = await changeUserPassword({actualData, access_token});
    
    console.log(res.data)
    // if(res.error){
    //   setErrorMsg({})
    //   setServerError(res.error.data.errors) 
    // }
    // if(res.data){
    //   console.log(res.data)
    //   setServerError({})
    //   setServerMsg(res.data)
    // }

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