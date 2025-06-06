import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { addtoCart } from "../../features/cartSllice";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { getToken } from "../../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { access_token } = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(access_token)
    const navigate = useNavigate()

    console.log(access_token)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data));
    }, [id]);

    const dispatch = useDispatch()

    const addToCart = async(product) => {
        await 
            axios.post('http://127.0.0.1:8000/api/cart/',{
                user: data.id,
                product: product.id
            },{
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            alert('Product added to Cart')
    };

    const orderCLick = async(product) =>{
        try{
            const res = await axios.post('http://127.0.0.1:8000/orders/api/',{
                user: data.id,
                product_id: product.id,
                product_name: product.title,
                product_price: product.price,
            },{
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            alert("Order Placed Successfully")
            navigate(-1)
            console.log(res.data)
        }catch(err){
            console.error('Problem Placing Order', err)
        }
    }


    return (
        <div>
            <h2>Product Detail Page</h2>
            {product ? (
                <div>
                    <img src={`http://127.0.0.1:8000${product.image}`} alt="Product" style={{heigth: '100px'}}/>
                    <h3>{product.title}</h3>
                    <h3>$ {product.price}</h3>
                    <p>{product.description}</p>
                    <i>Rating: {product.rating}</i>
                    <br />
                    <i>Availibility: {product.stock} in stocks now.</i>
                    <br />
                    <Button onClick={()=>addToCart(product)}>Add To Cart</Button>
                    <Button onClick={()=>orderCLick(product)}>Order Now</Button>
                </div>
            ) : (
                // this is not the right way to do loading, create a separate state for this
                // This is temporary solution for breadcrumbs tutorial
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetail;