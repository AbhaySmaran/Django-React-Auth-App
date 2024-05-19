import { useState } from 'react'
import Layout from './components/pages/Layout'
import Contact from './components/pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import LoginReg from './components/pages/auth/LoginReg';
import SendPasswordResetEmail from './components/pages/auth/SendPasswordResetEmail';
import ResetPassword from './components/pages/auth/ResetPassword';
import Dashboard from './components/pages/Dashboard';
import ProductDetail from './components/functions/product-details';
// import Products from './components/functions/Products';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='contact' element={<Contact />} />
            <Route path='login' element={<LoginReg />} />
            <Route path='passwordresetemail' element={<SendPasswordResetEmail />} />
            <Route path='reset' element={<ResetPassword />} />
            <Route path='products/:id' element={<ProductDetail />} />
            {/* <Route path='products' element={<Products />} /> */}
          </Route>
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
