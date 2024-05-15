import { useState } from 'react'
import Layout from './components/pages/Layout'
import Contact from './components/pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import LoginReg from './components/pages/LoginReg';
import SendPasswordResetEmail from './components/pages/auth/SendPasswordResetEmail';

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
            <Route path='passwordresetrmail' element={<SendPasswordResetEmail />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
