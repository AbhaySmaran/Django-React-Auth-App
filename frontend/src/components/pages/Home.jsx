import React from 'react'
import { useState,useEffect } from 'react'

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
            Home Page
            <ul>
                {products.map(product=>(
                    <li key={product.id}>
                        {product.id}--{product.title}
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default Home