import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, Paper } from '@mui/material';
import { CircularProgress } from '@mui/material';
import AddSubCategory from '../../components/AddSubCategory/AddSubCategory';
import http from '../../Services/getData';
import MyAlert from '../../components/MyAlert/MyAlert';
import Title from '../../components/Title/Title';
import { IoLayersOutline } from "react-icons/io5";



function AddCategories() {

   // States ------>
   const [category, setCategory] = useState('');
   const [categoryId, setCategoryId] = useState('');
   const [display, setDisplay] = useState(false);
   const [options, setOptions] = useState([]);
   const [name, setName] = useState('');
   const [minPrecent, setMinPercent] = useState('');
   const [maxPercent, setMaxPercent] = useState('');
   const [wholesale, setWholesale] = useState('');
   const [alertCount, setAlertCount] = useState('');
   const wrapperRef = useRef(null);
   const [open, setOpen] = useState(false);
   const [success, setSuccess] = useState(false);
   const [notific, setNotific] = useState(false);


   const handleClick = () => {
      setNotific(true);
   };

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setNotific(false)
      setOpen(false);
   };

   const handleOpen = () => {
      setOpen(true);
   };

   // Add Category Hendler
   const addCategoryHendle = (e) => {
      e.preventDefault()
      handleOpen()
      let data = {}
      if (minPrecent !== '' && maxPercent !== '' && wholesale !== '') {
         data = {
            name,
            parent_id: categoryId,
            min_percent : minPrecent,
            max_percent: maxPercent,
            whole_percent: wholesale
         }
      } else {
         data = {
            name,
            parent_id: categoryId,
         }
      }
      http
         .post("/category/create", data)
         .then(res => {
            setCategory('');
            setName('')
            setMinPercent('')
            setMaxPercent('')
            setWholesale('')
            setSuccess(true)
            handleClose();
            handleClick();
         })
         .catch(err => {
            console.log(err);
            setName('')
            setMinPercent('')
            setMaxPercent('')
            setWholesale('')
            setSuccess(false);
            handleClose();
            handleClick();
         })
   }

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
         <div className='main px-2 px-md-3'>
            <Title
               title="Добавление Подкатегорий"
               children={<IoLayersOutline />}
            />
            <Paper elevation={2} className="py-3">
               <AddSubCategory
                  category={category}
                  setCategory={setCategory}
                  name={name}
                  setName={setName}
                  minPrecent={minPrecent}
                  setMinPercent={setMinPercent}
                  maxPercent={maxPercent}
                  setMaxPercent={setMaxPercent}
                  wholesale={wholesale}
                  setWholesale={setWholesale}
                  alertCount={alertCount}
                  setAlertCount={setAlertCount}
                  addCategory={addCategoryHendle}
                  display={display}
                  setDisplay={setDisplay}
                  options={options}
                  setOptions={setOptions}
                  wrapperRef={wrapperRef}
                  setCategoryId={setCategoryId}
               />
            </Paper>
         </div>
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
         <MyAlert
            notific={notific}
            handleClose={handleClose}
            from="create"
            created={success}
            unCreatedMessage="Категория не добавлена"
            createdMessage="Добавлена категория"
         />
      </>
   )
}

export default AddCategories;
