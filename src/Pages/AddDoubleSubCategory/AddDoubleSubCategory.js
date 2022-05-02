import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, Paper } from '@mui/material';
import { CircularProgress } from '@mui/material';
import AddDoubleSubCategory from '../../components/AddDoubleSubCategory/AddDoubleSubCategory';
import http from '../../Services/getData'
import MyAlert from '../../components/MyAlert/MyAlert';
import Title from '../../components/Title/Title';
import { IoLayersOutline } from "react-icons/io5";


function AddCategories() {

   // States ------>
   const [category, setCategory] = useState('');
   const [categoryId, setCategoryId] = useState('');
   const [subCategory, setSubCategory] = useState('');
   const [display, setDisplay] = useState(false);
   const [display1, setDisplay1] = useState(false);
   const [options, setOptions] = useState([]);
   const [name, setName] = useState('');
   const [minPrecent, setMinPercent] = useState('');
   const [maxPercent, setMaxPercent] = useState('');
   const [wholesale, setWholesale] = useState('');
   const [alertCount, setAlertCount] = useState('');
   const wrapperRef = useRef(null);
   const wrapperRef1 = useRef(null);
   const [open, setOpen] = useState(false);
   const [success, setSuccess] = useState(false);
   const [notific, setNotific] = useState(false);

   const handleClick = () => {
      setNotific(true);
   };

   const handleClose = (reason) => {
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
      const data = {
         parent_id: categoryId,
         name: name,
         min_percent: minPrecent ? minPrecent : null,
         max_percent: maxPercent ? maxPercent : null,
         whole_percent: wholesale ? wholesale : null,
      }
      http
      .post("/category/create", data)
      .then(res => {
         setCategory("")
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
         setSuccess(false)
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
               if (item.children.length !== 0) {
                  item.children.map(subCateEle => {
                     if (!options.some(child => child.id !== subCateEle.id)) {
                        setOptions(options => [...options, subCateEle]);
                     }
                     return subCateEle;
                  })
               }
               return res.data
            });
         })
   }, // eslint-disable-next-line
      [])


   // Display one
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   // Display two
   // useEffect(() => {
   //    document.addEventListener('mousedown', handleClickOutside1);

   //    return () => {
   //       document.removeEventListener('mousedown', handleClickOutside1)
   //    }
   // }, [])

   // One display hendle
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
               title="Добавить Двойные Подкатегории"
               children={<IoLayersOutline />}
            />
            <Paper elevation={2} className="py-3">
               <AddDoubleSubCategory
                  category={category}
                  setCategory={setCategory}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
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
                  display1={display1}
                  setDisplay={setDisplay}
                  setDisplay1={setDisplay1}
                  options={options}
                  setOptions={setOptions}
                  wrapperRef={wrapperRef}
                  wrapperRef1={wrapperRef1}
                  setCategoryId={setCategoryId}
               />
            </Paper>
         </div>;
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
