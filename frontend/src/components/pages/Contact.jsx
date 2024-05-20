import { getToken } from '../../services/LocalStorageService'
import { useState,useEffect } from 'react'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../features/userSlice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
 
const Contact = () => {
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)

  const [userData, setUserData] = useState({
    name: '',
    email: ''
  })
  const dispatch = useDispatch()
  console.log(data)

  useEffect(()=>{
    if(data && isSuccess ){
      setUserData({
        name: data.name,
        email: data.email
      })
    }
  },[data, isSuccess])

  // useEffect(()=>{
  //   if(data, isSuccess){
  //     dispatch(setUserInfo({
  //       name: data.name,
  //       email: data.name 
  //     }))
  //   }
  // }, [data, isSuccess, dispatch])

  return (
    <div>
      <h2>contact</h2>
      <h3>Name:- {userData.name}</h3>
      <h4>Email: {userData.email}</h4>
      <Link to='/dashboard'><h5>Change Password</h5></Link>
    </div>
  )
}

export default Contact;