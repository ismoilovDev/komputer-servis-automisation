import React, { useState, useEffect, useRef } from 'react';
import { Backdrop, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Paper, Select } from '@mui/material';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import AddBasket from '../../components/AddBasket/AddBasket'
import ProductsList from './../../components/Table/ProductsList';
import http from './../../Services/getData';
import './AddBaskets.css';
import MyAlert from '../../components/MyAlert/MyAlert';

function Test() {
   const [products, setProducts] = useState([]);
   const [orders, setOrders] = useState([]);
   const [postmans, setPostmans] = useState([]);
   const [postmanId, setPostmanId] = useState('');
   const [description, setDescription] = useState('');
   const [open, setOpen] = useState(false);
   const [openBackdrop, setOpenBackdrop] = useState(false);
   const [display, setDisplay] = useState(false);
   const [success, setSuccess] = useState(false);
   const [notific, setNotific] = useState(false);
   const wrapperRef = useRef(null);


   // For Alert
   const handleClick = () => {
      setNotific(true);
   };

   const handleCloseBackdrop = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setNotific(false)
      setOpenBackdrop(false);
   };
   const handleOpen = () => {
      setOpenBackdrop(true);
   };


   // For Modal --------------->
   const handleClose = () => setOpen(false);
   const openBasketForm = () => {
      setOpen(true)
   }

   useEffect(() => {
      getAllPostman()
      getAllProducts()
   }, [])

   // Get All Products for ID --------------->
   const getAllProducts = async () => {
      await http
         .get('/product/all')
         .then(res => {
            setProducts(res.data)
            console.log(res.data);
         })
         .catch(err => {
            console.log(err)
         })
   }

   // Get All Postmans ----------->
   const getAllPostman = async () => {
      await http
         .get('/postman/all')
         .then(res => {
            setPostmans(res.data)
         })
         .catch(err => {
            console.log(err)
         })
   }

   // Display ------------>
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, []);
   const handleClickOutside = (e) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(e.target)) {
         setDisplay(false)
      }
   }

   // Delete Order ------------>
   const deleteOrder = (id) => {
      setOrders(orders.filter(item => item.id !== id))
   }

   function filteredData() {
      const filteredOrders = orders.filter(item => {
         let { product_id, count, unit, price, description } = item;
         return {
            product_id,
            count,
            unit,
            price,
            description
         }
      })
      return filteredOrders
   }

   // Add Basket //---------->
   const addBaketHendle = (e) => {
      e.preventDefault();
      handleOpen()
      if(filteredData().length !== 0) {
         const data = {
            postman_id: postmanId,
            description: description,
            orders: filteredData()
         }
         http
            .post('/warehouse-order/create', data)
            .then(res => {
               setSuccess(true)
               handleCloseBackdrop();
               handleClick();
            })
            .catch(err => {
               setSuccess(false)
               handleCloseBackdrop();
               handleClick();
            })
      } else {
         setSuccess(false)
         handleClick();
         setOpenBackdrop(false)
      }
   }

   const clearData = () => {
      setOrders([]);
      filteredData();
      setPostmanId('')
   }

   return (
      <>
         <div className='main px-2 px-md-3'>
            <Paper elevation={2} className="py-3 px-2 for-bottom">
               <h2 className='d-flex justify-content-center mb-4'>
                  Создание заявки
               </h2>
               <Container>
                  <Row>
                     <Form onSubmit={addBaketHendle} autoComplete="off">
                        <Row className='mb-4'>
                           <Col xs="6" className='my-2'>
                              <FormControl className='w-100' variant="outlined" size='small'>
                                 <InputLabel id="pastavshik">Pastavshik Name</InputLabel>
                                 <Select
                                    size='small'
                                    labelId="pastavshik"
                                    id="pastavshikId"
                                    value={postmanId}
                                    onChange={e => setPostmanId(e.target.value)}
                                    required
                                    input={<OutlinedInput label="Pastavshik Name" />}
                                 >
                                    {
                                       postmans.map(postman => (
                                          <MenuItem key={postman.full_name} value={postman.id}>{postman.full_name}</MenuItem>
                                       ))
                                    }
                                 </Select>
                              </FormControl>
                           </Col>
                           <Col xs="6" className='my-2 d-flex justify-content-end'>
                              <Button variant='outlined' className='d-flex mx-md-4 px-3 py-0' onClick={openBasketForm}>Add Form</Button>
                           </Col>
                        </Row>
                        <div className='to-bottom'>
                           <Row className='w-100 justify-content-start m-0 p-0 mt-2'>
                              <Col>
                                 <FloatingLabel className='my-2' controlId="floatingTextarea2" label="Дополнительная информация">
                                    <Form.Control
                                       as="textarea"
                                       placeholder="Дополнительная информация"
                                       style={{ height: '130px', width: '100%' }}
                                       value={description}
                                       onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                 </FloatingLabel>
                              </Col>
                           </Row>
                           <Row className='w-100 justify-content-end mt-2'>
                              <Col className='d-flex justify-content-end m-0 p-0'>
                                 <Button
                                    type="button"
                                    variant="outlined"
                                    color="primary"
                                    className='px-5'
                                    onClick={clearData}
                                 >
                                    Clear
                                 </Button>
                                 <Button
                                    className='px-5 mx-3'
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                 >
                                    Send
                                 </Button>
                              </Col>
                           </Row>
                        </div>
                     </Form>
                  </Row>
                  <Row>
                     <ProductsList
                        orders={orders}
                        setOrders={setOrders}
                        products={products}
                        deleteOrder={deleteOrder}
                     />
                  </Row>
               </Container>
            </Paper>
         </div>
         <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className='modal_box modal_box_product'>
               <AddBasket
                  handleClose={handleClose}
                  orders={orders}
                  setOrders={setOrders}
                  display={display}
                  setDisplay={setDisplay}
                  wrapperRef={wrapperRef}
                  products={products}
                  setProducts={setProducts}
               />
            </Box>
         </Modal>
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
         <MyAlert
            notific={notific}
            handleClose={handleCloseBackdrop}
            success={success}
            errorMessage="Zayavka не добавлена"
            successMessage="Zayavka категория"
            emptyMessage="Pustoy zayavka"
         />
      </>
   )
}

export default Test;