import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ButtonM from "@mui/material/Button"
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
// import { Upload, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

function AddProduct({
   category,
   setCategory,
   subCategory,
   setSubCategory,
   subSubCategory,
   setSubSubCategory,
   name,
   setName,
   brand,
   setBrand,
   price,
   setPrice,
   unit,
   setUnit,
   minPrecent,
   setMinPercent,
   minCount,
   setMinCount,
   maxPercent,
   setMaxPercent,
   wholePercent,
   setWholePercent,
   minSum,
   setMinSum,
   maxSum,
   setMaxSum,
   wholeSum,
   setWholeSum,
   options,
   subs,
   doubleSubs,
   clearInput,
   display,
   setDisplay,
   display1,
   setDisplay1,
   display2,
   setDisplay2,
   wrapperRef,
   wrapperRef1,
   wrapperRef2,
   addCategoryHendle,
   getSubCategories,
   getDoubleSubCategories,
   getDoubleSubCategoriesPersent
}) {
   // ONE
   const setSelectCate = (cate, id) => {
      setCategory(cate);
      setDisplay(false);
      getSubCategories(id);
      setPrice('')
      setMinSum('')
      setMaxSum('')
      setWholeSum('')
   }

   // TWO
   const setSelectSubCate = (cate, id) => {
      setSubCategory(cate);
      setDisplay1(false);
      getDoubleSubCategories(id);
      setPrice('')
      setMinSum('')
      setMaxSum('')
      setWholeSum('')
   }

   // THREE
   const setSelectSubSubCate = (cate, id) => {
      setSubSubCategory(cate);
      setDisplay2(false);
      getDoubleSubCategoriesPersent(id);
      setPrice('')
      setMinSum('')
      setMaxSum('')
      setWholeSum('')
   }

   function changePrice(price) {
      let summ = Number(price)
      if (price !== 0 && price > -1 && minPrecent && maxPercent && wholePercent) {
         setPrice(price);
         setMinSum(summ + summ * (minPrecent / 100));
         setMaxSum(summ + summ * (maxPercent / 100));
         setWholeSum(summ + summ * (wholePercent / 100));
      }
   }

   // Display One
   const changeCateName = (name) => {
      setDisplay(true)
      setCategory(name)
   }

   // Display Two
   const changeSubCateName = (name) => {
      setDisplay1(true)
      setSubCategory(name)
   }

   // Display Three
   const changeDoubleSubCateName = (name) => {
      setDisplay2(true)
      setSubSubCategory(name)
   }
   return (
      <div className='px-4'>
         <h2 className='d-flex justify-content-center'>
            Добавлять продукты
         </h2>
         <Form onSubmit={addCategoryHendle} autoComplete="off">
            <Row>
               <Col ref={wrapperRef} xs="12" md="6" className='wrapper-slect my-1 mb-3'>
                  <TextField
                     className="w-100 for-label py-0"
                     variant="standard"
                     label="Выберите категорию"
                     type="text"
                     onClick={() => setDisplay(!display)}
                     value={category}
                     onChange={e => changeCateName(e.target.value)}
                  />
                  {display && (
                     <div className='autoContainer'>
                        {options.filter((name) => name.name.toUpperCase().indexOf(category.toUpperCase()) > -1).length > 0 ? (
                           options.filter((name) => name.name.toUpperCase().indexOf(category.toUpperCase()) > -1).map((cate, i) => {
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
               {/* Select Sub Category Section */}
               <Col ref={wrapperRef1} xs="12" md="6" className='wrapper-slect my-1 mb-3'>
                  <TextField
                     className="w-100 for-label py-0"
                     variant="standard"
                     label="Выберите Суб категорию"
                     type="text"
                     onClick={() => setDisplay1(!display1)}
                     value={subCategory}
                     onChange={e => changeSubCateName(e.target.value)}
                  />
                  {display1 && (
                     <div className='autoContainer'>
                        {subs.filter((name) => name.name.toUpperCase().indexOf(subCategory.toUpperCase()) > -1).length > 0 ? (
                           subs.filter((name) => name.name.toUpperCase().indexOf(subCategory.toUpperCase()) > -1).map((cate, i) => {
                              return <div className='option' key={i} onClick={() => setSelectSubCate(cate.name, cate.id)} tabIndex={i}>
                                 <span>{cate.name}</span>
                              </div>
                           })
                        ) : (
                           <div className='option'>Tакой категории не существует</div>
                        )}
                     </div>
                  )}
               </Col>
               {/* Select Double Sub Category */}
               <Col ref={wrapperRef2} xs="12" md="6" className='wrapper-slect my-1 mb-3'>
                  <TextField
                     className="w-100 for-label py-0"
                     variant="standard"
                     label="Выберите Суб Суб категорию"
                     type="text"
                     onClick={() => setDisplay2(!display2)}
                     value={subSubCategory}
                     onChange={e => changeDoubleSubCateName(e.target.value)}
                  />
                  {display2 && (
                     <div className='autoContainer'>
                        {doubleSubs.filter((name) => name.name.toUpperCase().indexOf(subSubCategory.toUpperCase()) > -1).length > 0 ? (
                           doubleSubs.filter((name) => name.name.toUpperCase().indexOf(subSubCategory.toUpperCase()) > -1).map((cate, i) => {
                              return <div className='option' key={i} onClick={() => setSelectSubSubCate(cate.name, cate.id)} tabIndex={i}>
                                 <span>{cate.name}</span>
                              </div>
                           })
                        ) : (
                           <div className='option'>Tакой категории не существует</div>
                        )}
                     </div>
                  )}
               </Col>
               <Col xs="12" md="6" className='my-1'>
                  <FormControl className='w-100'>
                     <TextField
                        size="small"
                        className="w-100 for-label mb-3"
                        type="text"
                        id="tavar"
                        variant="standard"
                        label="Название продукть"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder="Компьютер"
                        required
                     />
                  </FormControl>
               </Col>
               <Col xs="12" md="6" className='my-1'>
                  <FormControl className='w-100'>
                     <TextField
                        size="small"
                        className="w-100 for-label mb-3"
                        type="text"
                        id="tavar"
                        variant="standard"
                        label="Название бренда"
                        value={brand}
                        onChange={(e) => { setBrand(e.target.value) }}
                        placeholder="Компьютер"
                     />
                  </FormControl>
               </Col>
               <Col xs="12" md="6" className='my-1'>
                  <FormControl variant='standard' className='w-100'>
                     <InputLabel id="unit">Select Unit</InputLabel>
                     <Select
                        className='w-100 mb-3 for-label'
                        labelId='unit'
                        id="unitId"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        variant='standard'
                     >
                        <MenuItem value="UZS">UZS</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                     </Select>
                  </FormControl>
               </Col>
               <Col xs="12" md="6" className='my-1'>
                  <FormControl className='w-100'>
                     <TextField
                        size="small"
                        className="w-100 for-label mb-3"
                        type="number"
                        id="tavar"
                        variant="standard"
                        label="Min Product"
                        value={minCount}
                        onChange={(e) => setMinCount(e.target.value)}
                        placeholder="20"
                        required
                     />
                  </FormControl>
               </Col>
               <Col xs="12" md="6" className='my-1'>
                  <FormControl className='w-100'>
                     <TextField
                        size="small"
                        className="w-100 for-label mb-3"
                        type="number"
                        id="tavar"
                        variant="standard"
                        label="Цена"
                        value={price}
                        onChange={(e) => { changePrice(e.target.value) }}
                        placeholder="Acer"
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
                        label="Optom sum"
                        value={wholeSum}
                        placeholder="20"
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
                        label="Max sum"
                        value={maxSum}
                        placeholder="25"
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
                        label="Min sum"
                        value={minSum}
                        placeholder="15"
                        required
                     />
                  </FormControl>
               </Col>
            </Row>
            <Row className='w-100 justify-content-start m-0 p-0 my-2 my-mt-3'>
               <Col xs="12" md="4" className='w-100 d-flex justify-content-end m-0 p-0'>
                  <ButtonM variant="contained" color="primary" type='submit'>
                     Send
                  </ButtonM>
                  <ButtonM variant="outlined" color="primary" className='mx-3' onClick={clearInput}>
                     Clear
                  </ButtonM>
               </Col>
            </Row>
         </Form>
      </div>
   )
}

export default AddProduct;
