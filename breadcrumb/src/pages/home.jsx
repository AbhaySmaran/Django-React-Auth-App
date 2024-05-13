import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const[products, setProducts] = useState([])

    useEffect(()=>{
        fetch('https://dummyjson.com/products')
            .then(res=> res.json())
            .then(res=> {

                setProducts(res.data)
            })
    })
    return (
        <div>Home</div>
        
    )
}

export default Home