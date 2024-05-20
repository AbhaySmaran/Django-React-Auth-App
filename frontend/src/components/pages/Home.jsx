import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { getToken } from '../../services/LocalStorageService'

const Home = () => {
    const [products, setProducts] = useState([])
    const [searchItem, setSearchItem] = useState('')
    // const [user,setUser] = useState({
    //     name: ''
    // })

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    const { access_token } = getToken()
    const { data, isSuccess} = useGetLoggedUserQuery(access_token)
    // console.log(data)
    
    // useEffect(()=>{
    //     if(data && isSuccess){
    //         setUser({
    //             name: data.name
    //         })
    //     }
    // },[data, isSuccess])

    useEffect(()=>{
        const fetchData = async()=>{
            await fetch('https://dummyjson.com/products')
                .then(res=> res.json())
                .then(res=>setProducts(res.products))          
        };
        fetchData();
    },[])

    // const lastPage = currentPage * postsPerPage
    // const firstPage = lastPage - postsPerPage
    // const currentProducts = products.slice(firstPage, lastPage

    console.log(products)
    return (
        <div>
            <h1>Home Page</h1>
            {isSuccess ? <h2>Hello {data.name}</h2> : <h2>You are not logged in</h2>}
            <input  
                placeholder='Seacrh Product...'
                type='text'
                value={searchItem}
                onChange={(e)=>setSearchItem(e.target.value)}
            />
            {
                searchItem ? filteredProducts.map(item=>(
                    <li key={item.id}><Link to={`products/${item.id}`}>{item.title}</Link></li>
                )) : 
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>id</th>
                                <th scope='col'>Product Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product=>(
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <Link to={`products/${product.id}`}>
                                            {product.title}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>

    )
}

export default Home