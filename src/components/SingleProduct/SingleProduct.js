import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { MdError, MdCardMembership } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";
import { RiCurrencyLine } from "react-icons/ri";
import './SingleProduct.css';

function SingleProduct({ selectedData }) {
   const [name, setName] = useState('')
   const [brand, setBrand] = useState('')
   const [price, setPrice] = useState('')
   const [maxPrice, setMaxPrice] = useState('')
   const [minPrice, setMinPrice] = useState('')
   const [wholePrice, setWholePrice] = useState('')
   const [unit, setUnit] = useState('')
   const [hasError, setHasError] = useState(false)
   useEffect( () => {
      setName(selectedData?.name);
      setBrand(selectedData?.brand);
      setPrice(selectedData?.cost_price);
      setMinPrice(selectedData?.min_price);
      setWholePrice(selectedData?.whole_price);
      setMaxPrice(selectedData?.max_price);
      setUnit(selectedData?.unit);
      setHasError(true)
   }, // eslint-disable-next-line
      [])

   return (
      <div className='single_product'>
         <p className='product_name'>{name ? name : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p><hr/>
         <p className='brand'>
            <MdCardMembership /><span>Brand: </span> {brand ? brand : "No Data"}
         </p>
         <p className='price'>
            <RiCurrencyLine /><span>Price: </span>{price ? ( unit === "USD" ? price + ' $' : price + " Сум")  : "No Data"}
         </p>
         <p className='max_price'>
            <IoMdPricetags /><span>Max Price: </span>{maxPrice ? ( unit === "USD" ? maxPrice + ' $' : maxPrice + " Сум") : "No Data"}
         </p>
         <p className='min_price'>
            <IoMdPricetags /><span>Min Price: </span>{minPrice ? ( unit === "USD" ? minPrice + ' $' : minPrice + " Сум") : "No Data"}
         </p>
         <p className='max_price'>
            <IoMdPricetags /><span>Whole price: </span>{wholePrice ? ( unit === "USD" ? wholePrice + ' $' : wholePrice + " Сум") : "No Data"}
         </p>
         <p className='unit'>
            <BsCurrencyExchange /><span>Unit: </span>{unit ? unit : "No Data"}
         </p>
      </div>
   )
}

export default SingleProduct;