import { useEffect, useRef, useState } from 'react';
import { Alert } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { FcDeployment } from 'react-icons/fc';
import { Box, Modal } from '@mui/material';
import EditOrder from '../EditOrder/EditOrder';


function ProductsList({ orders, setOrders, products, deleteOrder }) {
   const [open, setOpen] = useState(false);
   const [selectedProduct, setSlectedProduct] = useState({})
   const [display, setDisplay] = useState(false);
   const wrapperRef = useRef(null);

   // Edit Modal ------>
   const handleClose = () => setOpen(false);
   const clickedObjHendle = (obj) => {
      setOpen(true)
      setSlectedProduct(obj)
   }
   // Display
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   const handleClickOutside = (e) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(e.target)) {
         setDisplay(false)
      }
   }
   return (
      <>
         <div className='product-list my-3'>
            <div className='box'>
               <div className='my_table'>
                  <ul>
                     <li className='my_table_header'>
                        <span className='my_table_name'>
                           Name
                        </span>
                        <span>
                           Count
                        </span>
                        <span>
                           Price
                        </span>
                        <span className='table_description'>
                           Description
                        </span>
                        <span className='my_table_btns'>
                           Операции
                        </span>
                     </li>

                     {/* Products */}
                     <>
                        {
                           orders.length !== 0 ? (
                              orders.map((order, index) => (
                                 <li key={index} className='my_table_body'>
                                    <span className='my_table_name'>
                                       <article>
                                          <FcDeployment />
                                       </article>
                                       {order.name}
                                    </span>
                                    <span>
                                       {order.price}
                                    </span>
                                    <span>
                                       {order.count}
                                    </span>
                                    <span className='table_description'>
                                       {
                                          !order.description ? <small><i>No description</i></small> : order.description
                                       }
                                    </span>
                                    <span className='my_table_btns'>
                                       <button onClick={() => clickedObjHendle(order)} className='btn-edit'>
                                          <FaRegEdit />
                                       </button>
                                       <button onClick={(e) => deleteOrder(order.id)}>
                                          <IoMdTrash />
                                       </button>
                                    </span>
                                 </li>
                              ))
                           ) : (
                              <Alert message="Don't have Order" type="warning" showIcon />
                           )
                        }
                     </>
                  </ul>
               </div>
            </div>
      
         </div>
         <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className='modal_box modal_box_product'>
               <EditOrder
                  handleClose={handleClose}
                  setOpen={setOpen}
                  orders={orders}
                  setOrders={setOrders}
                  selectedOrder={selectedProduct}
                  display={display}
                  setDisplay={setDisplay}
                  wrapperRef={wrapperRef}
                  products={products}
               />
            </Box>
         </Modal>
      </>
   )
}
export default ProductsList;
