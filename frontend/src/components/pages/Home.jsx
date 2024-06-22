import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { getToken } from '../../services/LocalStorageService';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchItem = searchParams.get('search') || '';

    const { access_token } = getToken();
    const { data, isSuccess } = useGetLoggedUserQuery(access_token);

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
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Product Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
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
    );
}

export default Home;
