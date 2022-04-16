import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { MdError } from "react-icons/md";
import '../SingleClient/SingleClient.css';

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
      <div className='single_client'>
         <p><b>Name: </b> {name ? name : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Min: </b> {minProcent ? minProcent : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Whole: </b> {wholeProcent ? wholeProcent : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         <p><b>Max: </b> {maxProcent ? maxProcent : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
      </div>
   )
}

export default SingleCategory;