import React, { useState } from 'react'
import { Button, Box, TextField, Alert } from '@mui/material'
import { NavLink,useNavigate } from 'react-router-dom'

const UserLogin = () => {
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
            email: data.get('email'),
            password: data.get('password')
        };
        if(actualdata.email && actualdata.password){
            console.log(actualdata)
            document.getElementById('login-form').reset()
            setError({
                status: true,
                msg: 'Login success',
                type: 'success',
            })
            navigate('/')
        }else{
            setError({
                status: true,
                msg: 'all field are required',
                type: 'error',
            })
        }
    }
    return (
        <div>
            <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='email' name='email' label='Email' />
                <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
                <Box textAlign='center'>
                    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>
                </Box>
                <NavLink to='/passwordresetrmail' >Forgot Password ?</NavLink>
                {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            </Box>
        </div>
    )
}

export default UserLogin