import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            await fetch('https://dummyjson.com/products')
                .then(res=> res.json())
                .then(res=>setProducts(res.products))          
        };
        fetchData();
    },[])
    console.log(products)
    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                {products.map(product=>(
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`} >{product.id}--{product.title}</Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default Home