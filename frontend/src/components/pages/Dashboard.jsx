import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useState, usxeEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';

const Dashboard = () => {
  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'>Email: </Typography>
        <Typography variant='h6'>Name: </Typography>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;