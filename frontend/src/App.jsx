import { useState } from 'react'
import Layout from './components/pages/Layout'
import Contact from './components/pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import LoginReg from './components/pages/LoginReg';

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
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
