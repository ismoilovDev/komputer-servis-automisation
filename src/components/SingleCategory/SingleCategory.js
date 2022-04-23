import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { MdError } from "react-icons/md";
import { BsArrowDownCircle, BsArrowUpCircle, BsArrowRepeat } from "react-icons/bs";
import './SingleCategory.css';

function SingleCategory({ singleCont }) {
   const [name, setName] = useState('')
   const [maxProcent, setMaxProcent] = useState('')
   const [minProcent, setMinProcent] = useState('')
   const [wholeProcent, setWholeProcent] = useState('')
   const [hasError, setHasError] = useState(false)
   useEffect( () => {
      setName(singleCont.name);
      setMaxProcent(singleCont.max_percent);
      setMinProcent(singleCont.min_percent);
      setWholeProcent(singleCont.whole_percent);
      setHasError(true)
   }, // eslint-disable-next-line
      [])

   return (
      <div className='single_product'>
         <p className='product_name'>{name ? name : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p><hr/>
         <p className='max_price'>
            <BsArrowUpCircle /><span>Max procent: </span>{maxProcent ? maxProcent: "No Protsent"}
         </p>
         <p className='min_price'>
            <BsArrowDownCircle /><span>Min procent: </span>{minProcent ? minProcent: "No Protsent"}
         </p>
         <p className='whole_price'>
            <BsArrowRepeat /><span>Whole procent: </span>{wholeProcent ? wholeProcent: "No Protsent"}
         </p>
      </div>
   )
}

export default SingleCategory;