import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import ProductsDetails from './pages/product-details';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/product' Component={Products} />
          <Route path= '/product/:id' Component={ProductsDetails} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
