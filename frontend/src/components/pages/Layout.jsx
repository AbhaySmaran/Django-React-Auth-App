import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Breadcrumbs from '../functions/breadcrumbs';

const Layout = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Breadcrumbs />
      <Outlet />
    </div>
  )
}

export default Layout