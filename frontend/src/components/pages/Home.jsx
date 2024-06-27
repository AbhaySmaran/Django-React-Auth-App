// Home.js
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { getToken } from '../../services/LocalStorageService';
import { useSelector, useDispatch } from 'react-redux';
import { addtoCart } from '../../features/cartSllice';
import Filters from '../functions/Filters';
import { Container, Grid, Card, CardContent, CardMedia, CardActions, Typography, Button, TextField, Box } from '@mui/material';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchItem = searchParams.get('search') || '';

    const { access_token } = getToken();
    const { data, isSuccess } = useGetLoggedUserQuery(access_token);

    const dispatch = useDispatch();

    const addToCart = (product) => {
        dispatch(addtoCart(product));
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://127.0.0.1:8000/products/')
                .then((res) => res.json())
                .then((result) => setProducts(result));
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    const handleSearch = () => {
        setSearchParams({ search: searchItem });
    };

    const handleFilterChange = (e, type) => {
        // Handle filter change logic here based on type
        console.log(type, e ? e.target.checked : null);
    };

    const renderedProducts = filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
                <Link to={`products/${product.id}`}><CardMedia
                    component="img"
                    height="140"
                    image={`http://127.0.0.1:8000${product.image}`}
                    alt={product.title}
                /></Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: ${product.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => addToCart(product)}>
                        Add To Cart
                    </Button>
                    <Button size="small" color="primary" >
                        Order Now
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    ));

    return (
        <Container sx={{ display: 'flex', marginTop: 4 }}>
            <Box sx={{ width: '20%', marginRight: 2 }}>
                <Filters handleFilterChange={handleFilterChange} />
            </Box>
            <Box sx={{ width: '80%' }}>
                <Typography variant="h4" gutterBottom>
                    Home Page
                </Typography>
                {isSuccess ? <Typography variant="h6">Hello {data.name}</Typography> : <Typography variant="h6">You are not logged in</Typography>}
                <TextField
                    label="Search Product"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchItem}
                    onChange={(e) => setSearchParams({ search: e.target.value })}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {renderedProducts}
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;
