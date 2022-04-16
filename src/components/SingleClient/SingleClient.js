import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { MdError } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineDocumentScanner } from "react-icons/md";
import './SingleClient.css';


function SingleContent({ singleCont }) {
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const [inn, setInn] = useState('')
   const [descpr, setDescpr] = useState('')
   const [hasError, setHasError] = useState(false)

   useEffect(() => {
      console.log(singleCont);
      setName(singleCont.full_name);
      setPhone(singleCont.phone);
      setInn(singleCont.inn);
      setDescpr(singleCont.description);
      setHasError(true)
   }, // eslint-disable-next-line
      [])

   return (
      <div className='modal_box single_client'>
         <p className='name'>{name ? name : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p><hr/>
         <p className='phone'><BsTelephone />{phone ? phone : hasError ? <MdError className='text-red' /> : <LoadingOutlined className='px-3' />}</p>
         {
            inn ? <p className='inn'><MdOutlineDocumentScanner />{ inn }</p> : ""
         }
         <span>{descpr}</span>
      </div>
   )
}

export default SingleContent;