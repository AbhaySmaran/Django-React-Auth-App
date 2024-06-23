import { useSelector,useDispatch } from "react-redux";
import { Card,Button } from "react-bootstrap";
import { remove } from "../../features/cartSllice";
import { Link } from "react-router-dom";

const Cart = () => {
    const cartProducts = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    const removeFromCart = (id) =>{
        dispatch(remove(id))
    }
    
    return (
        <div>
            {cartProducts.map(product => {
                return (
                    <div key={product.id}>
                            <Card className='col-md-3' style={{ marginBottom: '10px' }}>
                                <div className="h-100">
                                    <Card.Img src={product.thumbnail} alt={product.title}/>
                                    <Card.Body as={Link} to={`/products/${product.id}`}>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>Price: ${product.price}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button onClick={()=>removeFromCart(product.id)}>
                                            Remove From Cart
                                        </Button>
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