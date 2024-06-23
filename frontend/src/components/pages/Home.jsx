import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { getToken } from '../../services/LocalStorageService';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
// import { addListener } from '@reduxjs/toolkit';
import { addtoCart } from '../../features/cartSllice';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchItem = searchParams.get('search') || '';

    const { access_token } = getToken();
    const { data, isSuccess } = useGetLoggedUserQuery(access_token);

    const dispatch = useDispatch()

    const addToCart = (product)=>{
        dispatch(addtoCart(product))
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://dummyjson.com/products')
                .then(res => res.json())
                .then(res => setProducts(res.products));
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    const handleSearch = () => {
        setSearchParams({ search: searchItem });
    };

    const renderedProducts = products.map(product => {
        return (
            <div className='col-md-3' style={{ marginBottom: '10px' }} key={product.id}>
                <Link to={`products/${product.id}`}><Card  className='h-100'>
                    <div className='text-center'>
                        <Card.Img variant="top" src={product.thumbnail} style={{ width: '100px', height: '130px' }}/>
                        <Card.Body >
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>Price: ${product.price}</Card.Text>
                        </Card.Body>
                        <Card.Footer >
                            <Button variant="primary" onClick={()=>addToCart(product)}>
                                Add To Cart
                            </Button>
                        </Card.Footer>
                    </div>
                </Card>
                </Link>
            </div>)
    })

    return (
        <div>
            <h1>Home Page</h1>
            {isSuccess ? <h2>Hello {data.name}</h2> : <h2>You are not logged in</h2>}
            <label htmlFor="search">Search Product:</label>
            <input
                id="search"
                placeholder="Search Product..."
                type="text"
                value={searchItem}
                onChange={(e) => setSearchParams({ search: e.target.value })}
            />
            <button onClick={handleSearch}>Search</button>
            {
                searchItem ? filteredProducts.map(item => (
                    <li key={item.id}>
                        <Link to={`products/${item.id}`}>{item.title}</Link>
                    </li>
                )) :
                <div className='row'>
                    {renderedProducts}
                </div>
                // <div className="container">
                //     <table className="table">
                //         <thead>
                //             <tr>
                //                 <th scope="col">ID</th>
                //                 <th scope="col">Product Name</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {products.map(product => (
                //                 <tr key={product.id}>
                //                     <td>{product.id}</td>
                //                     <td>
                //                         <Link to={`products/${product.id}`}>
                //                             {product.title}
                //                         </Link>
                //                     </td>
                //                 </tr>
                //             ))}
                //         </tbody>
                //     </table>
                // </div>
            }
        </div>
    )
}

export default Home;
