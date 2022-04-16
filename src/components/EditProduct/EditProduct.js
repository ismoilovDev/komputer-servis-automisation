import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField, Paper, InputLabel, Select, MenuItem } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import http from '../../Services/getData';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

function EditProduct ({
   products,
   setProducts,
   selectedProduct,
   setOpen
}) {
   const [clicked, setClicked] = useState(false)
   const [hasError, setHasError] = useState(false)
   const [name, setName] = useState('');
   const [categoryId, setCategoryId] = useState('');
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');
   const [wholePrice, setWholePrice] = useState('');
   const [price, setPrice] = useState('');
   const [brand, setBrand] = useState('');
   const [unit, setUnit] = useState('')

   useEffect(() => {
      setName(selectedProduct.name);
      setBrand(selectedProduct.brand);
      setPrice(selectedProduct.cost_price);
      setMinPrice(selectedProduct.min_price);
      setWholePrice(selectedProduct.whole_price);
      setMaxPrice(selectedProduct.max_price);
      setUnit(selectedProduct.unit);
      setCategoryId(selectedProduct.category_id);
   }, // eslint-disable-next-line
      [])
   console.log(categoryId);

   // Update Category
   const updateCategory = (e) => {
      e.preventDefault()
      setClicked(true)
      setHasError(false)
      const data = {
         category_id: Number(categoryId),
         product: {
            name: name,
            brand: brand,
            cost_price: price,
            min_price: minPrice,
            max_price: maxPrice,
            whole_price: wholePrice,
            unit: unit
         }
      }
      http
         .put(`/product/update/${selectedProduct.id}`, data)
         .then(res => {
            setClicked(false);

            // Edited Product
            const editedProduct = products.filter(item => {
               if(item.id === selectedProduct.id) {
                  item.name = name;
                  item.brand = brand;
                  item.cost_price = price;
                  item.min_price = minPrice;
                  item.whole_price = wholePrice;
                  item.max_price = maxPrice;
                  item.unit = unit;
               }
               return item;
            })
            setProducts(editedProduct);
            setOpen(false)
         })
         .catch(err => {
            setClicked(false);
            setHasError(true)
         })
   }
   return (
      <div>
         <Paper elevation={2} className="p-xs-2 p-4">
            {
               hasError ? <Alert message="Error" type="error" showIcon closable  /> : null
            }
            <Form onSubmit={updateCategory} autoComplete="off">
               <Row>
                  <Col xs="12" className="my-2">
                     <Row className='justify-content-end'>
                        <Col xs="12" md="3">
                           <FormControl className='w-100' variant='standard'>
                              <InputLabel id="demo-simple-select-standard-label">Unit</InputLabel>
                              <Select
                                 labelId="demo-simple-select-standard-label"
                                 id="demo-simple-select-standard"
                                 value={unit}
                                 onChange={e => setUnit(e.target.value)}
                                 label="Postman"
                              >
                                 <MenuItem value={"UZS"}>UZS</MenuItem>
                                 <MenuItem value={"USD"}>USD</MenuItem>
                              </Select>
                           </FormControl>
                        </Col>
                     </Row>
                  </Col>
                  <Col xs="12">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="text"
                           id="firma_name"
                           variant="standard"
                           label="Наименование предприятия"
                           value={name}
                           onChange={(e) => { setName(e.target.value) }}
                           placeholder="TexnoPos"
                           required
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="text"
                           id="firma_brand"
                           variant="standard"
                           label="Наименование марка"
                           value={brand}
                           onChange={(e) => { setBrand(e.target.value) }}
                           placeholder="Intel"
                           required
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12" md="6">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           id="cost_price"
                           variant="standard"
                           label="Cost Sum"
                           value={price}
                           onChange={(e) => { setPrice(e.target.value) }}
                           placeholder="20"
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12" md="6">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           id="min_price"
                           variant="standard"
                           label="Min Sum"
                           value={minPrice}
                           onChange={(e) => { setMinPrice(e.target.value) }}
                           placeholder="20"
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12" md="6">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           id="whole_price"
                           variant="standard"
                           label="Optom Sum"
                           value={wholePrice}
                           onChange={(e) => { setWholePrice(e.target.value) }}
                           placeholder="17"
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12" md="6">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           id="max_price"
                           variant="standard"
                           label="Max Sum"
                           value={maxPrice}
                           onChange={(e) => { setMaxPrice(e.target.value) }}
                           placeholder="25"
                        />
                     </FormControl>
                  </Col>
               </Row>
               <Button type="submit" variant="contained" color="primary">
                  {
                     clicked ? <LoadingOutlined className='h6 px-4' /> : "изменить"
                  }
               </Button>
            </Form>
         </Paper>
      </div>
   )
}

export default EditProduct;