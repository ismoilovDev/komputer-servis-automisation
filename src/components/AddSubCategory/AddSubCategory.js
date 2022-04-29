import React from 'react';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import { TextField } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import './AddSubCategory.css'

function AddCategory(
   {
      category,
      setCategory,
      name,
      setName,
      minPrecent,
      setMinPercent,
      maxPercent,
      setMaxPercent,
      wholesale,
      setWholesale,
      addCategory,
      display,
      setDisplay,
      options,
      wrapperRef,
      setCategoryId
   }) {
   const setSelectCate = (cate, id) => {
      setCategory(cate);
      setDisplay(false);
      setCategoryId(id)
   }

   const changeProductName = (name) => {
      setDisplay(true)
      setCategory(name)
   }
   
   return (
      <div className='px-4'>
         <Form onSubmit={addCategory} autoComplete="off">
            <Row>
               <Col ref={wrapperRef} xs="12" md="6" className='wrapper-slect my-2 mb-3'>
                  <TextField
                     className="w-100 for-label py-0"
                     variant="standard"
                     label="Выберите категорию"
                     type="text"
                     onClick={() => setDisplay(!display)}
                     value={category}
                     onChange={e => changeProductName(e.target.value)}
                     required
                  />
                  {display && (
                     <div className='autoContainer'>
                        {options.filter((option) => option.name.toUpperCase().indexOf(category.toUpperCase()) > -1).length > 0 ? (
                           options.filter((option) => option.name.toUpperCase().indexOf(category.toUpperCase()) > -1).map((cate, i) => {
                              return <div className='option' key={i} onClick={() => setSelectCate(cate.name, cate.id)} tabIndex={i}>
                                 <span>{cate.name}</span>
                              </div>
                           })
                        ) : (
                           <div className='option'>Tакой категории не существует</div>
                        )}
                     </div>
                  )}
               </Col>
               <Col xs="12" md="6" className='my-2 mb-3'>
                  <FormControl className='w-100'>
                     <TextField
                        size="small"
                        className="w-100 for-label"
                        type="text"
                        id="tavar"
                        variant="standard"
                        label="Название категории"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder="Компьютеры"
                        required
                     />
                  </FormControl>
               </Col>
               <Col xs="12" md="4" className='my-1'>
                  <FormControl className='w-100'>
                     <TextField
                        size="small"
                        className="w-100 for-label mb-3"
                        type="number"
                        variant="standard"
                        label="Optom %"
                        value={wholesale}
                        onChange={(e) => { setWholesale(e.target.value) }}
                        placeholder="20"
                     />
                  </FormControl>
               </Col>
               <Col xs="12" md="4" className='my-1'>
                  <FormControl className='w-100'>
                     <TextField
                        size="small"
                        className="w-100 for-label mb-3"
                        type="number"
                        variant="standard"
                        label="Min %"
                        value={minPrecent}
                        onChange={(e) => { setMinPercent(e.target.value) }}
                        placeholder="15"
                     />
                  </FormControl>
               </Col>
               <Col xs="12" md="4" className='my-1'>
                  <FormControl className='w-100'>
                     <TextField
                        size="small"
                        className="w-100 for-label mb-3"
                        type="number"
                        variant="standard"
                        label="Max %"
                        value={maxPercent}
                        onChange={(e) => { setMaxPercent(e.target.value)}}
                        placeholder="25"
                     />
                  </FormControl>
               </Col>
            </Row>
            <Row className='w-100 justify-content-start m-0 p-0 mt-2'>
               <Col xs="6" md="4" className='w-100 d-flex justify-content-start m-0 p-0'>
                  <Button type="submit" variant="contained" color="primary">
                     добавить
                  </Button>
               </Col>
            </Row>
         </Form>
      </div>
   )
}

export default AddCategory;