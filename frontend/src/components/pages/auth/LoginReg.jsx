import React from 'react'
import { Box, Grid,Card, Tab ,  Tabs } from '@mui/material';
import Pic1 from '../Image/pic1.png';
import { useState } from 'react';
import UserLogin from './UserLogin';
import Registration from './Registration';


const TabPanel = (props)=>{
  const {children, value, index} = props;
  return(
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}

const LoginReg = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newval)=>{
    setValue(newval)
  }
  return (
    <div>
      <Grid container sx={{height: '90vh'}}>
        <Grid item lg={7} sm={5} sx={{ 
          backgroundImage : `url(${Pic1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgrounsPosition: 'center',
          display: {xs:'none' ,sm:'block'}
         }}>
        </Grid>
        <Grid item lg={5} sm={7} xs={12}>
          <Card sx={{height: '100%' , width: '100%'}}>
            <Box sx={{mx: 3}}>
              <Box>
                <Tabs value={value} textColor='secondary' indicatorColor='secondadry' onChange={handleChange}>
                  <Tab label='Login' sx={{textTransform:'none', fontWeight:'bold'}}></Tab>
                  <Tab label='Registration' sx={{textTransform:'none', fontWeight:'bold'}}></Tab>
                </Tabs>
                <TabPanel index={0} value={value} >
                  <UserLogin />
                </TabPanel>
                <TabPanel index={1} value={value} >
                  <Registration />
                </TabPanel>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginReg