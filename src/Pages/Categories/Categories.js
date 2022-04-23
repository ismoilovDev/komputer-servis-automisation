import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import http from '../../Services/getData';
import { Modal, Box, Paper } from '@mui/material';
import EditCategory from '../../components/EditCategory/EditCategory';
import '../Clients/Clients.css';
import SingleCategory from '../../components/SingleCategory/SingleCategory';
import { paginate } from '../../utils/paginate';
import MyAlert from '../../components/MyAlert/MyAlert';
import CategoriesList from '../../components/CategoriesList/CategoriesList';


const { TabPane } = Tabs;

function Categories() {
   const [loaded, setLoaded] = useState(false);
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [doubleSubCategories, setDoubleSubCategories] = useState([]);
   const [selectedCategory, setSlectedCategory] = useState({});
   const [open, setOpen] = useState(false);
   const [openSingleCont, setOpenSingleCont] = useState(false);
   const [singleCont, setSingleCont] = useState({});
   const [from, setFrom] = useState("");
   const [success, setSuccess] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const [notific, setNotific] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(8);
   let count = categories.length;

   useEffect(() => {
      getMainCategories()
      getSubCategories()
      getDoubleSubCategories()
   }, // eslint-disable-next-line
      [])

   // Edit Modal --------------->
   const handleClose = () => setOpen(false);
   const clickedObjHendle = (obj) => {
      setOpen(true);
      setSlectedCategory(obj)
   }


   // Single Content Modal ------------->
   const handleSingleContClose = () => setOpenSingleCont(false);
   const clickedSingleObjHendle = (singleCate) => {
      setOpenSingleCont(true);
      setSingleCont(singleCate);
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
   };

   const rows = ['Min prosent', 'Whole prosent', 'Max prosent', 'Операции'];

   // Get Main Categories
   const getMainCategories = async () => {
      await http
         .get('/category/categories')
         .then(res => {
            res.data.map(item => {
               if (categories.every(child => child.id !== item.id)) {
                  setCategories(options => [...options, item]);
               }
               setLoaded(true)
               return res.data
            });
         })
         .catch()
   }


   // Get Sub Categories
   const getSubCategories = async () => {
      await http
         .get('/category/categories')
         .then(res => {
            res.data.map(item => {
               if (item.children.length !== 0) {
                  item.children.map(subCateEle => {
                     if (subCategories.every(child => child.id !== subCateEle.id)) {
                        setSubCategories(options => [...options, subCateEle]);
                     }
                     return subCateEle;
                  })
               }
               return res.data
            });
            setLoaded(true)
         })
         .catch()
   }

   // Get Double Sub Categories
   const getDoubleSubCategories = async () => {
      await http
         .get('/category/categories')
         .then(res => {
            res.data.map(item => {
               if (item.children.length !== 0) {
                  item.children.map(subCateEle => {
                     if (subCateEle) {
                        subCateEle.children.map(doubleSub => {
                           if (!doubleSubCategories.some(child => child.id !== subCateEle.id)) {
                              setDoubleSubCategories(doubleSubCategories => [...doubleSubCategories, doubleSub]);
                           }
                           return doubleSub
                        })
                     }
                     return subCateEle;
                  })
               }
               return res.data
            });
            setLoaded(true)
         })
         .catch()
   }

   // Delete Category
   const deleteCategoryHendle = async (id, name) => {
      if(window.confirm(`Delete ${name}`)) {
         await http.delete(`/category/${id}`)
            .then(res => {
               setCategories(categories.filter(item => item.id !== id));
               setSubCategories(subCategories.filter(item => item.id !== id));
               setDoubleSubCategories(doubleSubCategories.filter(item => item.id !== id));
               setFrom('delete');
               setDeleted(true);
               handleClick();
            })
            .catch(err => {
               setFrom('delete');
               setDeleted(false);
               handleClick();
            })
      }
   }


   // Change Page
   const hendleChangePage = (page) => {
      setCurrentPage(page)
      window.scroll(0, 0);
   }
   // Paginate
   const CategoryPaginated = paginate(categories, currentPage, pageSize);
   const SubCategoryPaginated = paginate(subCategories, currentPage, pageSize);
   const DoubleSubCategoryPaginated = paginate(doubleSubCategories, currentPage, pageSize);
   return (
      <>
         <div className='main px-2 px-md-3'>
            <Paper elevation={2} className="py-3 px-2">
               <h2 className='d-flex justify-content-center'>
                  Категории
               </h2>
               <Tabs defaultActiveKey="1">
                  <TabPane tab="Categories" key="1">
                     <CategoriesList
                        loaded={loaded}
                        paginated={CategoryPaginated}
                        count={count}
                        pageSize={pageSize} 
                        hendleChangePage={hendleChangePage}
                        name="Category Name"
                        rows={rows}
                        clickedSingleObjHendle={clickedSingleObjHendle}
                        clickedObjHendle={clickedObjHendle}
                        deleteData={deleteCategoryHendle}
                     />
                  </TabPane>
                  <TabPane tab="Sub Categories" key="2">
                     <CategoriesList
                        loaded={loaded}
                        paginated={SubCategoryPaginated}
                        count={count}
                        pageSize={pageSize} 
                        hendleChangePage={hendleChangePage}
                        name="Sub Category Name"
                        rows={rows}
                        clickedSingleObjHendle={clickedSingleObjHendle}
                        clickedObjHendle={clickedObjHendle}
                        deleteData={deleteCategoryHendle}
                     />
                  </TabPane>
                  <TabPane tab="Sub Sub Categories" key="3">
                     <CategoriesList
                        loaded={loaded}
                        paginated={DoubleSubCategoryPaginated}
                        count={count}
                        pageSize={pageSize} 
                        hendleChangePage={hendleChangePage}
                        name="Sub Sub Category Name"
                        rows={rows}
                        clickedSingleObjHendle={clickedSingleObjHendle}
                        clickedObjHendle={clickedObjHendle}
                        deleteData={deleteCategoryHendle}
                     />
                  </TabPane>
               </Tabs>
            </Paper>
         </div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className='modal_box'>
               <EditCategory
                  selectedCategory={selectedCategory}
                  setOpen={setOpen}
                  setFrom={setFrom}
                  handleClick={handleClick}
                  setSuccess={setSuccess}
                  categories={categories}
                  setCategories={setCategories}
                  subCategories={subCategories}
                  setSubCategories={setSubCategories}
                  doubleSubCategories={doubleSubCategories}
                  setDoubleSubCategories={setDoubleSubCategories}
               />
            </Box>
         </Modal>
         <Modal
            open={openSingleCont}
            onClose={handleSingleContClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className='modal_box'>
               <SingleCategory
                  singleCont={singleCont}
               />
            </Box>
         </Modal>
         <MyAlert
            notific={notific}
            handleClose={handleCloseBackdrop}
            from={from}
            success={success}
            errorMessage="Category not update"
            successMessage="Category update"
            deleted={deleted}
            responseDeleteMessage="Category Deleted"
            rejectDeleteMessage="Category Not deleted"
         />
      </>
   )
}

export default Categories;