import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField, Paper } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import http from '../../Services/getData';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

function EditCategory({
   selectedCategory,
   categories,
   subCategories,
   doubleSubCategories,
   setCategories,
   setSubCategories,
   setDoubleSubCategories,
   setOpen,
   handleClick,
   setSuccess,
   setFrom
}) {
   const [clicked, setClicked] = useState(false);
   const [hasError, setHasError] = useState(false);
   const [name, setName] = useState('');
   const [categoryId, setCategoryId] = useState('')
   const [minProsent, setMinProsent] = useState('');
   const [maxProsent, setMaxProsent] = useState('');
   const [wholeProsent, setWholeProsent] = useState('');
   
   
   useEffect(() => {
      setCategoryId(selectedCategory.id)
      setName(selectedCategory.name);
      setMinProsent(selectedCategory.min_percent);
      setWholeProsent(selectedCategory.whole_percent);
      setMaxProsent(selectedCategory.max_percent);
   }, // eslint-disable-next-line
      [])


   // Update Category
   const updateCategory = (e) => {
      e.preventDefault()
      setClicked(true)
      setHasError(false)
      const data = {
         category_id: Number(categoryId),
         name: name,
         min_percent: Number(minProsent),
         whole_percent: Number(wholeProsent),
         max_percent: Number(maxProsent)
      }
      http
         .patch(`/category/update`, data)
         .then(res => {
            setClicked(false);
            console.log('updated');
            // Edited Categories
            const editedCate = categories.filter(item => {
               if(item.id === selectedCategory.id) {
                  item.name = name;
                  item.min_percent = minProsent;
                  item.max_percent = maxProsent;
                  item.whole_percent = wholeProsent;
               }
               return item;
            })
            setCategories(editedCate);

            // Edited Sub Categories
            const editedSubCate = subCategories.filter(item => {
               if(item.id === selectedCategory.id) {
                  item.name = name;
                  item.min_percent = minProsent;
                  item.max_percent = maxProsent;
                  item.whole_percent = wholeProsent;
               }
               return item;
            })
            setSubCategories(editedSubCate);

            // Edited Sub Categories
            const editedDoubleSubCate = doubleSubCategories.filter(item => {
               if(item.id === selectedCategory.id) {
                  item.name = name;
                  item.min_percent = minProsent;
                  item.max_percent = maxProsent;
                  item.whole_percent = wholeProsent;
               }
               return item;
            })
            setDoubleSubCategories(editedDoubleSubCate);
            setOpen(false);
            setFrom('update');
            setSuccess(true);
            handleClick();
         })
         .catch(err => {
            setClicked(false);
            setHasError(true);
            setSuccess(false);
            setClicked(false);
            setHasError(true);
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
                           type="number"
                           id="min_prosent"
                           variant="standard"
                           label="Min prosent"
                           value={minProsent}
                           onChange={(e) => { setMinProsent(e.target.value) }}
                           placeholder="20"
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           id="whole_prosent"
                           variant="standard"
                           label="Optom prosent"
                           value={wholeProsent}
                           onChange={(e) => { setWholeProsent(e.target.value) }}
                           placeholder="17"
                        />
                     </FormControl>
                  </Col>
                  <Col xs="12">
                     <FormControl className='w-100 my-2'>
                        <TextField
                           size="small"
                           className="w-100 for-label mb-3"
                           type="number"
                           id="max_prosent"
                           variant="standard"
                           label="Max prosent"
                           value={maxProsent}
                           onChange={(e) => { setMaxProsent(e.target.value) }}
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

export default EditCategory;