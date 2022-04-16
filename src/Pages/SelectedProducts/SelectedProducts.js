import React, { useEffect, useState } from 'react';
import { FcDeployment } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import SkeletonBox from '../../components/Skeleton/Skeleton';
import http from '../../Services/getData';
import { Box, Modal, Paper } from '@mui/material';
import EditProduct from './../../components/EditProduct/EditProduct';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import '../Products/Products.css';
import { Alert } from 'antd';

const SelectedProducts = ({ match }) => {
   console.log(match.params.id);
   const [loaded, setLoaded] = useState(false);
   const [products, setProducts] = useState([]);
   const [open, setOpen] = useState(false);
   const [openSingle, setOpenSingle] = useState(false);
   const [selectedProduct, setSlectedProduct] = useState({})
   const [selectedProductSingle, setSlectedProductSingle] = useState({})

   useEffect(() => {
      setLoaded(false)
      const getAllProduct = async () => {
         window.scroll(0, 0)
         await http
                  .get(`/product/all?category_id=${match.params.id}`)
                  .then(res => {
                     console.log(res.data);
                     setProducts(res.data)
                     setLoaded(true)
                  })
                  .catch(err => {
                     console.log(err);
                  })
      }
      getAllProduct()
   }, [match.params.id])


   // Edit Modal ------>
   const handleClose = () => setOpen(false);
   const clickedObjHendle = (obj) => {
      setOpen(true)
      setSlectedProduct(obj)
   }

   // Single Product Modal
   const handleCloseSingle = () => setOpenSingle(false);
   const clickedSingleObjHendle = (obj) => {
      setOpenSingle(true)
      setSlectedProductSingle(obj)
   }

   // Delete Product
   const deleteProduct = (id) => {
      http
         .delete(`/product/delete/${id}`)
         .then(res => {
            setProducts(products.filter(item => item.id !== id));
         })
         .catch(err => console.log(err))
   }
   return (
      <>
         <div className='main px-2 px-md-3'>
            <Paper elevation={2} className="py-3 px-2">
               <h2 className='d-flex justify-content-center mb-4'>
                  Продукты
               </h2>
               <div className='box'>
                  <div className='my_table'>
                     <ul>
                        <li className='my_table_header'>
                           <span className='my_table_name'>
                              Продукт
                           </span>
                           <span>
                              Бренд
                           </span>
                           <span>
                              Стоимость
                           </span>
                           <span>
                              Минимальный
                           </span>
                           <span>
                              Оптовый
                           </span>
                           <span>
                              Максимум
                           </span>
                           <span>
                              Мин. товар (осталось)
                           </span>
                           <span className='my_table_count'>
                              Есть сейчас
                           </span>
                           <span className='my_table_btns'>
                              Операции
                           </span>
                        </li>

                        {/* Products */}
                        {
                           loaded ? (
                              <>
                                 {
                                    products.length !== 0 ? (
                                       products.map((product, id) => (
                                          <li key={product.name} className='my_table_body'>
                                             <span className='my_table_name' onClick={() => clickedSingleObjHendle(product)}>
                                                <article>
                                                   <FcDeployment />
                                                </article>
                                                {product.name}
                                             </span>
                                             <span>
                                                {product.brand}
                                             </span>
                                             <span>
                                                {product.cost_price}
                                             </span>
                                             <span>
                                                {product.min_price}
                                             </span>
                                             <span>
                                                {product.whole_price}
                                             </span>
                                             <span>
                                                {product.max_price}
                                             </span>
                                             <span>
                                                0
                                             </span>
                                             <span className='my_table_count text-center'>
                                                0
                                             </span>
                                             <span className='my_table_btns'>
                                                <button className='btn-edit' onClick={() => clickedObjHendle(product)}>
                                                   <FaRegEdit />
                                                </button>
                                                <button onClick={() => deleteProduct(product.id)}>
                                                   <IoMdTrash />
                                                </button>
                                             </span>
                                          </li>
                                       ))
                                    ) : (
                                       <Alert message="Warning" type="warning" showIcon />
                                    )
                                 }
                              </>) : (
                              <SkeletonBox />
                           )
                        }
                     </ul>
                  </div>
               </div>
            </Paper>
         </div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className='modal_box modal_box_product'>
               <EditProduct
                  setOpen={setOpen}
                  products={products}
                  setProducts={setProducts}
                  selectedProduct={selectedProduct}
               />
            </Box>
         </Modal>
         <Modal
            open={openSingle}
            onClose={handleCloseSingle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className='modal_box modal_box_product'>
               <SingleProduct
                  selectedProduct={selectedProductSingle}
               />
            </Box>
         </Modal>
      </>
   );
}

export default SelectedProducts;