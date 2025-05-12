import { useSelector,useDispatch } from "react-redux";
import { Card,Button } from "react-bootstrap";
import { remove,setToCart } from "../../features/cartSllice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../services/LocalStorageService";
import axios from "axios";

const Cart = () => {
    const [cartItems,setCartItems] = useState([])
    const cartProducts = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const removeFromCart = (id) =>{
    //     dispatch(remove(id))
    // }
    const { access_token } = getToken();

    const fetchData=async()=>{
        const res = await axios.get('http://127.0.0.1:8000/api/cart/',{
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        setCartItems(res.data)
        setToCart(res.data)
        // console.log(res.data)
        // console.log(cartItems)
    };

    const removeFromCart = (id) =>{
        axios
            .delete('http://127.0.0.1:8000/api/cart/',{
                headers : {
                    'Authorization' : `Bearer ${access_token}`
                },
                data : {
                        product_id: id
                    }
                }
            )
            .then(fetchData())
        }


    useEffect(()=>{
        fetchData();
    },[])
    
    const getTotalPrice = () => {
        return cartProducts.reduce((total, product) => total + product.price, 0);
    };

    return (
        <div style={{  justifyContent: 'center', alignItems: 'center' }}>
            <h3>Total Price:  ${getTotalPrice().toFixed(2)}</h3>

            {cartItems.map(product => {
                return (
                    <div key={product.product.id}>
                            <Card className='col-md-3'>
                                <div className="h-100">
                                    <Card.Img src={`http://localhost:8000${product.product.image}`} alt={product.title}/> 
                                    <Card.Body as={Link} to={`/products/${product.product.id}`}>
                                        <Card.Title>{product.product.title}</Card.Title>
                                        <Card.Text>Price: ${product.product.price}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button onClick={()=>removeFromCart(product.product.id)}>
                                            Remove From Cart
                                        </Button>
                                        {/* <Button onClick={()=>navigate(`products/${product.id}`)}>
                                            Order Now
                                        </Button> */}
                                    </Card.Footer>
                                </div>
                            </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default Cart