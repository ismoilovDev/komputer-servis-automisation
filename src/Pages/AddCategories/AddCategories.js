import React, { useState } from 'react';
import { Backdrop, Paper } from '@mui/material';
import { CircularProgress } from '@mui/material';
import AddCategory from '../../components/AddCategory/AddCategory';
import http from '../../Services/getData';
import MyAlert from '../../components/MyAlert/MyAlert';
import { IoLayersOutline } from "react-icons/io5";
import Title from '../../components/Title/Title';



function AddCategories() {

   // States ------>
   const [name, setName] = useState('');
   const [minPrecent, setMinPercent] = useState('');
   const [maxPercent, setMaxPercent] = useState('');
   const [wholesale, setWholesale] = useState('');
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
      let data = {
         name,
         parent_id: 0,
         min_percent : minPrecent,
         max_percent: maxPercent,
         whole_percent: wholesale
      }
      http
         .post("/category/create", data)
         .then(res => {
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

   return (
      <>
         <div className='main px-2 px-md-3'>
            <Title
               title="Добавление Категорий"
               children={<IoLayersOutline />}
            />
            <Paper elevation={2} className="py-3">
               <AddCategory
                  name={name}
                  setName={setName}
                  minPrecent={minPrecent}
                  setMinPercent={setMinPercent}
                  maxPercent={maxPercent}
                  setMaxPercent={setMaxPercent}
                  wholesale={wholesale}
                  setWholesale={setWholesale}
                  addCategory={addCategoryHendle}
                  open={open}
                  handleClose={handleClose}
                  handleToggle={handleOpen}
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
