import React from 'react'
import { Button, Box, TextField, Alert, FormControlLabel, Checkbox, Typography, Grid, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import { useRegisterUserMutation } from '../../../services/userAuthApi';
import { storeToken,getToken } from '../../../services/LocalStorageService'
import { setUserToken } from '../../../features/authSlice';
import Pic1 from '../../Image/pic1.png';

const Registration = () => {
    const [server_error, setServerError] = useState({})
    const [registerUser, {isLoading}]= useRegisterUserMutation()
    const navigate = useNavigate()

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
        if (res.error) {
            console.log(typeof (res.error.data.errors))
            console.log(res.error.data.errors)
            setServerError(res.error.data.errors)
          }
        if (res.data) {
            storeToken(res.data.token)
            let {access_token} = getToken()
            navigate('/login')
          }
    }
    return (
        <div>
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
                    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
                        <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
                        {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.name[0]}</Typography> : ""}
                        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
                        {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
                        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
                        {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
                        <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm Password' type='password' />
                        {server_error.password2 ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography> : ""}
                        <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
                        {server_error.tc ? <span style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.tc[0]}</span> : ""}
                        <Box textAlign='center'>
                            {isLoading ?  <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Register</Button>}
                        </Box>
                        <NavLink to='/login'>Already have a account?</NavLink>
                        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
                    </Box>
                </Grid>
            </Grid>      
        </div>
    )
}

export default Registration