import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

const Layout = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout