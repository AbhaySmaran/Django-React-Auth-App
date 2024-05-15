import React from 'react'
import { Button, Box, TextField, Alert, FormControlLabel, Checkbox } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const[error,setError] = useState({
        status: false,
        msg: '',
        type: ''
    })
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data =new FormData(e.currentTarget);
        const actualdata = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            confirm_password: data.get('confirm_password'),
            tc: data.get('tc')
        };
        if(actualdata.name && actualdata.email && actualdata.password &&  actualdata.tc !== null){
           if(actualdata.password === actualdata.confirm_password){
            console.log(actualdata)
            document.getElementById('registration-form').reset()
            setError({ 
                status: true,
                msg: 'Registration success',
                type: 'success',
            })
           }else{
            setError({ 
                status: true,
                msg: 'Passwords does not match',
                type: 'error',
            })
           }
        }else{
            setError({
                status: true, 
                msg: 'all field are required',
                type: 'error',
            })
        }
        console.log(actualdata)
    }
    return (
        <div>
            <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
                <TextField margin='normal' required fullWidth id='email' name='email' label='Email' />
                <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
                <TextField margin='normal' required fullWidth id='comfirm_password' name='confirm_password' label='Confirm Password' type='password' />
                <FormControlLabel control={<Checkbox value='agree' color='primary' name='tc' id='tc' />} label='I agree to terms and conditions' />
                <Box textAlign='center'>
                    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Register</Button>
                </Box>
                {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            </Box>
        </div>
    )
}

export default Registration