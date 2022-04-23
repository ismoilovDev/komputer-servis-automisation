import React, { useEffect, useState } from 'react';
import http from '../../Services/getData';
import { Box, Modal, Paper } from '@mui/material';
import EditProduct from './../../components/EditProduct/EditProduct';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import List from '../../components/ProductsList/ProductsList'
import '../Products/Products.css';
import { paginate } from '../../utils/paginate';
import MyAlert from '../../components/MyAlert/MyAlert';

const SelectedProducts = ({ match }) => {
   const [loaded, setLoaded] = useState(false);
   const [products, setProducts] = useState([]);
   const [open, setOpen] = useState(false);
   const [from, setFrom] = useState("");
   const [openSingle, setOpenSingle] = useState(false);
   const [success, setSuccess] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const [notific, setNotific] = useState(false);
   const [selectedProduct, setSlectedProduct] = useState({})
   const [selectedProductSingle, setSlectedProductSingle] = useState({})
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(8);
   let count = products.length;

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

   // For Alert
   const handleClick = () => {
      setNotific(true);
   };

   const handleCloseBackdrop = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setNotific(false)
   };

   const rows = ['Бренд', 'Стоимость', 'Минимальный', 'Оптовый', 'Максимум', 'Мин. товар (осталось)', 'Есть сейчас', 'Операции']

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
   const deleteProduct = (id, name) => {
      if(window.confirm(`Delete ${name}`)) {
         http
            .delete(`/product/delete/${id}`)
            .then(res => {
               setProducts(products.filter(item => item.id !== id));
               setFrom('delete');
               setDeleted(true);
               handleClick();

            })
            .catch(err => {
               setFrom('delete');
               setDeleted(false);
               handleClick();
            })
      }
   }

   // Change Page
   const hendleChangePage = (page) => {
      setCurrentPage(page)
      window.scroll(0, 0);
   }
   // Paginate
   const paginated = paginate(products, currentPage, pageSize)

   return (
      <>
         <div className='main px-2 px-md-3'>
            <Paper elevation={2} className="py-3 px-2">
               <h2 className='d-flex justify-content-center mb-4'>
                  Продукты
               </h2>
               <List
                  loaded={loaded}
                  paginated={paginated}
                  count={count}
                  pageSize={pageSize} 
                  hendleChangePage={hendleChangePage}
                  name="Product Name"
                  rows={rows}
                  clickedSingleObjHendle={clickedSingleObjHendle}
                  clickedObjHendle={clickedObjHendle}
                  deleteData={deleteProduct}
               />
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
                  setFrom={setFrom}
                  products={products}
                  setSuccess={setSuccess}
                  setNotific={setNotific}
                  setProducts={setProducts}
                  selectedProduct={selectedProduct}
                  handleClick={handleClick}
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
                  selectedData={selectedProductSingle}
               />
            </Box>
         </Modal>
         <MyAlert
            notific={notific}
            handleClose={handleCloseBackdrop}
            from={from}
            success={success}
            errorMessage="Product not update"
            successMessage="Product update"
            deleted={deleted}
            responseDeleteMessage="Product Deleted"
            rejectDeleteMessage="Product Not deleted"
         />
      </>
   );
}

export default SelectedProducts;