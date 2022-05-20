import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Col, Form, Row } from 'react-bootstrap';
import { useTabIndex } from 'react-tabindex';
import { BiXCircle } from "react-icons/bi";
import './AddBasket.css';

const useStyles = makeStyles({
   myBtn: {
      background: '#f83266',
      border: 0,
      borderRadius: 3,
      color: 'red',
      minWidth: 30,
      padding: '6px 8px',
      transition: '.3s',
      margin: 0,
      '&:hover': {
         backgroundColor: '#f83240',
         transform: 'scale(1)'
      }
   },
   font: {
      fontSize: "22px",
      margin: 0
   }
});

function Basket({ orders, handleClose, setOrders, display, setDisplay, wrapperRef, products }) {
   const classes = useStyles();
   const [productId, setProductId] = useState('');
   const [productName, setProductName] = useState('');
   const [price, setPrice] = useState('');
   const [unit, setUnit] = useState('');
   const [count, setCount] = useState('');
   const [description, setDescription] = useState('')
   const tabIndex = useTabIndex();

   // Add Order
   const addOrder = (e) => {
      e.preventDefault()
      if (productId) {
         const name = products.filter(item => item.id === Number(productId))
         setProductName(name[0].name);;
      }
      const data = {
         id: Math.random() * 10000,
         name: productName,
         product_id: productId,
         count: count,
         unit: unit,
         price: price,
         isSelected: true,
         description: description
      }
      setOrders(prev => [...prev, data]);

      setPrice("")
      setProductName("")
      setProductId("")
      setUnit("")
      setCount("")
      setDescription("")
   }

   const setSelectCate = (proName, id) => {
      setProductName(proName);
      setDisplay(false);
      setProductId(id)
   }

   const changeProductName = (name) => {
      setDisplay(true)
      setProductName(name)
   }
   return (
      <div>
         <Row className='align-items-center justify-content-between px-4'>
            <Col>
               <h3 className='py-3 pb-1 basket-title'>Add Product</h3>
            </Col>
            <Col className='d-flex justify-content-end'>
               <button className={classes.myBtn} variant='contained' color='info' size='small' onClick={() => handleClose()}>
                  <BiXCircle className={classes.font} />
               </button>
            </Col>
         </Row>
         <div className='hr'></div>
         <Form className='py-3 px-4' autoComplete='off' onSubmit={addOrder}>
            <Row>
               <Col ref={wrapperRef} xs="12" className='wrapper-slect my-2 mb-3'>
                  <TextField
                     className="w-100 for-label py-0"
                     variant="outlined"
                     label="Выберите продукт"
                     type="text"
                     onClick={() => setDisplay(!display)}
                     value={productName}
                     onChange={e => changeProductName(e.target.value)}
                     required
                  />
                  {display && (
                     <div className='autoContainer'>
                        {products.filter((option) => option.name.toUpperCase().indexOf(productName.toUpperCase()) > -1).length > 0 ? (
                           products.filter((option) => option.name.toUpperCase().indexOf(productName.toUpperCase()) > -1).map((productObj, i) => {
                              return <div className='option' key={i} onClick={() => setSelectCate(productObj.name, productObj.id)} tabIndex={i}>
                                 <span tabIndex={tabIndex}>{productObj.name}</span>
                              </div>
                           })
                        ) : (
                           <div className='option'>Tакой product не существует</div>
                        )}
                     </div>
                  )}
               </Col>
               <Col xs="12" className='my-2'>
                  <FormControl className='w-100'>
                     <TextField
                        size="medium"
                        className="w-100 for-label mb-3"
                        type="number"
                        variant="outlined"
                        label="Tovar soni"
                        value={count}
                        onChange={(e) => { setCount(e.target.value) }}
                        placeholder="25"
                        required
                     />
                  </FormControl>
               </Col>
               <Col xs="12" className='my-2'>
                  <FormControl className='w-100'>
                     <Row>
                        <Col xs="7">
                           <TextField
                              size="medium"
                              className="for-label mb-3 w-100"
                              type="number"
                              variant="outlined"
                              label="Tovar summ"
                              value={price}
                              onChange={(e) => { setPrice(e.target.value) }}
                              placeholder="10000000"
                              required
                           />
                        </Col>
                        <Col xs="5">
                           <FormControl className='w-100' variant="outlined">
                              <InputLabel id="unit">Select Unit</InputLabel>
                              <Select
                                 size='medium'
                                 labelId="unit"
                                 id="unitId"
                                 value={unit}
                                 onChange={e => setUnit(e.target.value)}
                                 input={<OutlinedInput label="Slect Unit" />}
                              >
                                 <MenuItem key={"unit1"} value="UZS">UZS</MenuItem>
                                 <MenuItem key={"unit2"} value="USD">USD</MenuItem>
                              </Select>
                           </FormControl>
                        </Col>
                        {/* <Col xs="12" className='my-1 mt-3'>
                           <FloatingLabel className='my-2' controlId="descpr" label="Дополнительная информация">
                              <Form.Control
                                 as="textarea"
                                 placeholder="Дополнительная информация"
                                 style={{ height: '100px' }}
                                 value={description}
                                 onChange={(e) => { setDescription(e.target.value) }}
                              />
                           </FloatingLabel>
                        </Col> */}
                        <Col xs="12" className='m-2'>
                           <Button type="submit" variant='contained'>Add Order</Button>
                        </Col>
                     </Row>
                  </FormControl>
               </Col>
            </Row>
         </Form>
      </div>
   )
}

export default Basket;
