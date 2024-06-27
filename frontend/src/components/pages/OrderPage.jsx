import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from '../functions/product-details'

const OrderPage = () => {
    const { id } = useParams()

  return (
    <div>
        <ProductDetail />
    </div>
  )
}

export default OrderPage