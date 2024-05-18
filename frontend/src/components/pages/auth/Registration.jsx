import React from 'react'
import { Button, Box, TextField, Alert, FormControlLabel, Checkbox } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../../services/userAuthApi';

const Registration = () => {
    const [server_error, setServerError] = useState()
    const navigate = useNavigate()
    const [registerUser, {isLoading}]= useRegisterUserMutation()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const data =new FormData(e.currentTarget);
        const actualdata = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            password2: data.get('password2'),
            tc: data.get('tc')
        };
        const res = await registerUser(actualdata)
        console.log(res)
    }
    return (
        <div>
            <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
                <TextField margin='normal' required fullWidth id='email' name='email' label='Email' />
                <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
                <TextField margin='normal' required fullWidth id='comfirm_password' name='password2' label='Confirm Password' type='password' />
                <FormControlLabel control={<Checkbox value={true} color='primary' name='tc' id='tc' />} label='I agree to terms and conditions' />
                <Box textAlign='center'>
                    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Register</Button>
                </Box>
            </Box>
        </div>
    )
}

export default Registration