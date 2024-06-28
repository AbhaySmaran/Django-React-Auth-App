import { getToken } from '../../services/LocalStorageService'
import { useState,useEffect } from 'react'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../features/userSlice'
import { setUserToken } from '../../features/authSlice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
 
const Contact = () => {
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)
  const [myorders,setMyorders] = useState([])

  useEffect(()=>{
    const fetchOrders = async() =>{
      const res = await axios.get('http://127.0.0.1:8000/orders/api/',{
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      setMyorders(res.data)
    };
    fetchOrders();
  },[])

  console.log(myorders)


  // const [userData, setUserData] = useState({
  //   name: '',
  //   email: ''
  // })
  const dispatch = useDispatch()
  console.log(data)

  // useEffect(()=>{
  //   if(data && isSuccess ){
  //     setUserData({
  //       name: data.name,
  //       email: data.email
  //     })
  //   }
  // },[data, isSuccess])

  useEffect(()=>{
    if(data, isSuccess){
      dispatch(setUserInfo({
        name: data.name,
        email: data.email 
      }))
    }
  }, [data, isSuccess, dispatch])

  const name = useSelector(state=> state.user.name)
  const email = useSelector(state=> state.user.email)

  if(name,email){
    localStorage.setItem('email', email)
    localStorage.setItem('name',name)
  }

  const userName = localStorage.getItem('name')
  const userEmail = localStorage.getItem('email')

  return (
    <div>
      <h2>contact</h2>
      <h3>Name:- {userName}</h3>
      <h4>Email: {userEmail}</h4>
      <Link to='/dashboard'><h5>Change Password</h5></Link>
      <h3>My Orders-</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {myorders.map((item)=>(
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>${item.product_price}</td>
              <td>{item.order_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Contact;