import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, CircularProgress, Paper } from '@mui/material';
import MyAlert from '../../components/MyAlert/MyAlert';
import AddProduct from '../../components/AddProduct/AddProduct';
import http from '../../Services/getData';

function AddProducts() {
   const [name, setName] = useState('');
   const [brand, setBrand] = useState('');
   const [price, setPrice] = useState('');
   const [unit, setUnit] = useState('');
   const [mainId, setMainId] = useState('');
   const [minPrecent, setMinPercent] = useState('');
   const [maxPercent, setMaxPercent] = useState('');
   const [wholePercent, setWholePercent] = useState('');
   const [minSum, setMinSum] = useState('');
   const [maxSum, setMaxSum] = useState('');
   const [wholeSum, setWholeSum] = useState('');
   const [minCount, setMinCount] = useState('');
   const [options, setOptions] = useState([]);
   const [subs, setSubs] = useState([]);
   const [doubleSubs, setDoubleSubs] = useState([]);
   const [display, setDisplay] = useState(false);
   const [display1, setDisplay1] = useState(false);
   const [display2, setDisplay2] = useState(false);
   const [category, setCategory] = useState('');
   const [subCategory, setSubCategory] = useState('');
   const [subSubCategory, setSubSubCategory] = useState('');
   const wrapperRef = useRef(null);
   const wrapperRef1 = useRef(null);
   const wrapperRef2 = useRef(null);

   // Notific States ------>
   const [success, setSuccess] = useState(false);
   const [notific, setNotific] = useState(false);
   const [openBackdrop, setOpenBackdrop] = useState(false);

   // Categories
   useEffect(() => {
      http
      .get('/category/categories')
      .then(res => {
         res.data.map(item => {
            if (!options.some(child => child.id !== item.id)) {
               setOptions(options => [...options, item]);
            }
            return res.data
         });
      })
   }, // eslint-disable-next-line
      [])

   // Sub Categories
   function getSubCategories(i) {
      setMainId(i)
      http
         .get(`/category/${i}`)
         .then(res => {
            setSubs(res.data.children);
            setMinPercent(res.data.min_percent);
            setMaxPercent(res.data.max_percent);
            setWholePercent(res.data.whole_percent);
            console.log(res.data);
         })
         .catch(err => console.log(err.response));
   }

   // Double Sub Categories
   function getDoubleSubCategories(i) {
      setMainId(i)
      http
      .get(`/category/${i}`)
         .then(res => {
            setDoubleSubs(res.data.children);
            setMinPercent(res.data.min_percent);
            setMaxPercent(res.data.max_percent);
            setWholePercent(res.data.whole_percent);
            console.log(res.data);
         })
         .catch(err => console.log(err));
   }

   // Double Sub Categories Persent
   function getDoubleSubCategoriesPersent(i) {
      setMainId(i);
      const doublePer = doubleSubs.filter(item => item.id === i);
      setMinPercent(doublePer[0].min_percent);
      setMaxPercent(doublePer[0].max_percent);
      setWholePercent(doublePer[0].whole_percent);
   }

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

   // Display one
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   // Display two
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside1);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside1)
      }
   }, [])

   // Display third
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside2);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside2)
      }
   }, [])

   // First display hendle
   const handleClickOutside = (e) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(e.target)) {
         setDisplay(false)
      }
   }

   // Second display hendle
   const handleClickOutside1 = (e) => {
      const { current: wrap } = wrapperRef1;
      if (wrap && !wrap.contains(e.target)) {
         setDisplay1(false)
      }
   }

   // Third display hendle
   const handleClickOutside2 = (e) => {
      const { current: wrap } = wrapperRef2;
      if (wrap && !wrap.contains(e.target)) {
         setDisplay2(false)
      }
   }

   // Clear TextFields ----------->
   const clearInput = () => {
      setCategory('')
      setSubCategory('')
      setSubSubCategory('')
      setBrand('')
      setName('')
      setPrice('')
      setMinSum('')
      setMaxSum('')
      setWholeSum('')
      setUnit('')
      setMinCount('')
   }
   // AddProduct
   const addProduct = (e) => {
      e.preventDefault()
      handleOpen()
      const data = {
         category_id: mainId,
         product: {
            name: name,
            brand: brand,
            cost_price: price,
            min_price: minSum,
            whole_price: wholeSum,
            max_price: maxSum,
            unit: unit,
            min_count: minCount
         }
      }
      console.log(data);
      http
         .post('/product/create', data)
         .then(res => {
            setSuccess(true)
            handleCloseBackdrop();
            handleClick();
            clearInput();
         })
         .catch(err => {
            setSuccess(false)
            handleCloseBackdrop();
            handleClick();
         })
   }

   return (
      <>
         <div className='main px-2 px-md-3 mt-3'>
            <Paper elevation={2} className="py-3">
               <AddProduct
                  options={options}
                  subs={subs}
                  doubleSubs={doubleSubs}
                  setDoubleSubs={setDoubleSubs}
                  category={category}
                  setCategory={setCategory}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                  subSubCategory={subSubCategory}
                  setSubSubCategory={setSubSubCategory}
                  display={display}
                  setDisplay={setDisplay}
                  display1={display1}
                  setDisplay1={setDisplay1}
                  display2={display2}
                  setDisplay2={setDisplay2}
                  handleClickOutside={handleClickOutside}
                  handleClickOutside1={handleClickOutside1}
                  handleClickOutside2={handleClickOutside2}
                  addCategoryHendle={addProduct}
                  name={name}
                  setName={setName}
                  brand={brand}
                  setBrand={setBrand}
                  price={price}
                  setPrice={setPrice}
                  minPrecent={minPrecent}
                  setMinPercent={setMinPercent}
                  maxPercent={maxPercent}
                  setMaxPercent={setMaxPercent}
                  wholePercent={wholePercent}
                  setWholePercent={setWholePercent}
                  minSum={minSum}
                  setMinSum={setMinSum}
                  maxSum={maxSum}
                  setMaxSum={setMaxSum}
                  wholeSum={wholeSum}
                  setWholeSum={setWholeSum}
                  unit={unit}
                  setUnit={setUnit}
                  minCount={minCount}
                  setMinCount={setMinCount}
                  clearInput={clearInput}
                  wrapperRef={wrapperRef}
                  wrapperRef1={wrapperRef1}
                  wrapperRef2={wrapperRef2}
                  getSubCategories={getSubCategories}
                  getDoubleSubCategories={getDoubleSubCategories}
                  getDoubleSubCategoriesPersent={getDoubleSubCategoriesPersent}
               />
            </Paper>
         </div>
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
         <MyAlert
            notific={notific}
            handleClose={handleCloseBackdrop}
            from="create"
            created={success}
            unCreatedMessage="Product не добавлена"
            createdMessage="Product добавлена"
         />
      </>
   )
}

export default AddProducts;
