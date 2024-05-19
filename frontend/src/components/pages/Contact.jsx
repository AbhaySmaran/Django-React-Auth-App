import { getToken } from '../../services/LocalStorageService'
import { useState,useEffect } from 'react'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'

const Contact = () => {
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  })
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

  //   }
  // })

  return (
    <div>
      <h2>contact</h2>
      <h3>Name:- {userData.name}</h3>
      <h4>Email: {userData.email}</h4>
    </div>
  )
}

export default Contact;