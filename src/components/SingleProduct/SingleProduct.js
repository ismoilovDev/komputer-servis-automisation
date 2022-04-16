import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { MdError } from "react-icons/md";
import '../SingleClient/SingleClient.css';

function SingleProduct({ selectedProduct }) {
   const [name, setName] = useState('')
   const [brand, setBrand] = useState('')
   const [price, setPrice] = useState('')
   const [maxPrice, setMaxPrice] = useState('')
   const [minPrice, setMinPrice] = useState('')
   const [wholePrice, setWholePrice] = useState('')
   const [unit, setUnit] = useState('')
   const [hasError, setHasError] = useState(false)
   useEffect( () => {
      setName(selectedProduct.name);
      setBrand(selectedProduct.brand);
      setPrice(selectedProduct.cost_price);
      setMinPrice(selectedProduct.min_price);
      setWholePrice(selectedProduct.whole_price);
      setMaxPrice(selectedProduct.max_price);
      setUnit(selectedProduct.unit);
      setHasError(true)
   }, // eslint-disable-next-line
      [])

   return (
      <div className='single_client'>
         <p><b>Name: </b> {name ? name : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Name: </b> {brand ? brand : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Name: </b> {price ? price : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Min: </b> {minPrice ? minPrice : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Whole: </b> {wholePrice ? wholePrice : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Max: </b> {maxPrice ? maxPrice : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Max: </b> {unit ? unit : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
      </div>
   )
}

export default SingleProduct;