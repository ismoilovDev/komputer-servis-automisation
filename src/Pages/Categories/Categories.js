import React, { useEffect, useState } from 'react'
import { Alert, Tabs } from 'antd';
import { FcBusinessContact, FcBusinessman, FcInTransit } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import Skeleton from '../../components/Skeleton/Skeleton';
import http from '../../Services/getData';
import { Modal, Box, Paper } from '@mui/material';
import EditCategory from '../../components/EditCategory/EditCategory';
import '../Clients/Clients.css';
import SingleCategory from '../../components/SingleCategory/SingleCategory';


const { TabPane } = Tabs;

function Categories() {
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [doubleSubCategories, setDoubleSubCategories] = useState([]);
   const [loading, setLoading] = useState(false);
   const [clickedId, setClickedId] = useState('');
   const [open, setOpen] = useState(false);
   const [openSingleCont, setOpenSingleCont] = useState(false);
   const [singleCont, setSingleCont] = useState({});

   useEffect(() => {
      getMainCategories()
      getSubCategories()
      getDoubleSubCategories()
   }, // eslint-disable-next-line
      [])

   // Edit Modal --------------->
   const handleClose = () => setOpen(false);
   const clickedIdHendle = (id) => {
      setOpen(true);
      setClickedId(id)
   }


   // Single Content Modal ------------->
   const handleSingleContClose = () => setOpenSingleCont(false);
   const clickedSingleContIdHendle = (singleCate) => {
      setOpenSingleCont(true);
      setSingleCont(singleCate);
   }



   // Get Main Categories
   const getMainCategories = async () => {
      await http
         .get('/category/categories')
         .then(res => {
            setLoading(true)
            res.data.map(item => {
               console.log(categories.some(child => child.id !== item.id))
               if (categories.every(child => child.id !== item.id)) {
                  setCategories(options => [...options, item]);
                  console.log(categories);
               }
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
         })
         .catch()
   }

   // Get Sub Categories
   const getDoubleSubCategories = () => {
      http
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
            })
            .catch(err => {

            })
      }
   }


   return (
      <>
         <div className='main px-2 px-md-3'>
            <Paper elevation={2} className="py-3 px-2">
               <h2 className='d-flex justify-content-center'>
                  Категории
               </h2>
               <Tabs defaultActiveKey="1">
                  <TabPane tab="Categories" key="1">
                     <div className='box'>
                        <div className='my_table'>
                           <ul>
                              <li className='my_table_header'>
                                 <span className='my_table_name'>
                                    Category Name
                                 </span>
                                 <span>
                                    Min prosent
                                 </span>
                                 <span>
                                    Optom prosent
                                 </span>
                                 <span>
                                    Max prosent
                                 </span>
                                 <span className='my_table_btns'>
                                    Операции
                                 </span>
                              </li>

                              {/* Company Clients */}
                              {
                                 loading ? (
                                    <>
                                       {
                                          categories.length !== 0 ? (
                                             categories.map((cate, i) => (
                                                <li key={i} className='my_table_body'>
                                                   <span className='my_table_name' onClick={() => clickedSingleContIdHendle(cate)}>
                                                      <article>
                                                         <FcBusinessContact />
                                                      </article>
                                                      {cate.name}
                                                   </span>
                                                   <span>
                                                      {cate.min_percent}
                                                   </span>
                                                   <span>
                                                      {cate.whole_percent}
                                                   </span>
                                                   <span>
                                                      {cate.max_percent}
                                                   </span>
                                                   <span className='my_table_btns'>
                                                      <button className='btn-edit' onClick={() => clickedIdHendle(cate.id)}>
                                                         <FaRegEdit />
                                                      </button>
                                                      <button onClick={() => deleteCategoryHendle(cate.id, cate.name)}>
                                                         <IoMdTrash />
                                                      </button>
                                                   </span>
                                                </li>
                                             ))
                                          ) : (
                                             <Alert message="Warning" type="warning" showIcon />
                                          )
                                       }
                                    </>
                                 ) : (
                                    <Skeleton />
                                 )
                              }
                           </ul>
                        </div>
                     </div>
                  </TabPane>
                  <TabPane tab="Sub Categories" key="2">
                     <div className='box'>
                        <div className='my_table'>
                           <ul>
                              <li className='my_table_header'>
                                 <span className='my_table_name'>
                                    Category Name
                                 </span>
                                 <span>
                                    Min prosent
                                 </span>
                                 <span>
                                    Optom prosent
                                 </span>
                                 <span>
                                    Max prosent
                                 </span>
                                 <span className='my_table_btns'>
                                    Операции
                                 </span>
                              </li>

                              {/* Jismoniy clients */}
                              {
                                 loading ? (
                                    <>
                                       {
                                          subCategories.length !== 0 ? (
                                             subCategories.map((cate, index) => (
                                                <li key={index} className='my_table_body'>
                                                   <span className='my_table_name' onClick={() => clickedSingleContIdHendle(cate)}>
                                                      <article>
                                                         <FcBusinessman />
                                                      </article>
                                                      {cate.name}
                                                   </span>
                                                   <span>
                                                      {cate.min_percent}
                                                   </span>
                                                   <span>
                                                      {cate.whole_percent}
                                                   </span>
                                                   <span>
                                                      {cate.max_percent}
                                                   </span>
                                                   <span className='my_table_btns'>
                                                      <button className='btn-edit' onClick={() => clickedIdHendle(cate.id)}>
                                                         <FaRegEdit />
                                                      </button>
                                                      <button onClick={() => deleteCategoryHendle(cate.id, cate.name)}>
                                                         <IoMdTrash />
                                                      </button>
                                                   </span>
                                                </li>
                                             ))
                                          ) : (
                                             <Alert message="Warning" type="warning" showIcon />
                                          )
                                       }
                                    </>
                                 ) : (
                                    <Skeleton />
                                 )
                              }
                           </ul>
                        </div>
                     </div>
                  </TabPane>
                  <TabPane tab="Sub Sub categoris" key="3">
                     <div className='box'>
                        <div className='my_table'>
                           <ul>
                              <li className='my_table_header'>
                                 <span className='my_table_name'>
                                    Sub Sub Category Name
                                 </span>
                                 <span>
                                    Min prosent
                                 </span>
                                 <span>
                                    Optom prosent
                                 </span>
                                 <span>
                                    Max prosent
                                 </span>
                                 <span className='my_table_btns'>
                                    Операции
                                 </span>
                              </li>

                              {/* Products */}
                              {
                                 loading ? (
                                    <>
                                       {
                                          doubleSubCategories.length !== 0 ? (
                                             doubleSubCategories.map((cate, id) => (
                                                <li key={id} className='my_table_body'>
                                                   <span className='my_table_name' onClick={() => clickedSingleContIdHendle(cate)}>
                                                      <article>
                                                         <FcInTransit />
                                                      </article>
                                                      {cate.name}
                                                   </span>
                                                   <span>
                                                      {cate.min_percent}
                                                   </span>
                                                   <span>
                                                      {cate.whole_percent}
                                                   </span>
                                                   <span>
                                                      {cate.max_percent}
                                                   </span>
                                                   <span className='my_table_btns'>
                                                      <button className='btn-edit' onClick={() => clickedIdHendle(cate.id)}>
                                                         <FaRegEdit />
                                                      </button>
                                                      <button onClick={() => deleteCategoryHendle(cate.id, cate.name)}>
                                                         <IoMdTrash />
                                                      </button>
                                                   </span>
                                                </li>
                                                )
                                             )) : (
                                             <Alert message="Warning" type="warning" showIcon />
                                          )
                                       }
                                    </>
                                 ) : (
                                    <Skeleton />
                                 )
                              }
                           </ul>
                        </div>
                     </div>
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
                  id={clickedId}
                  setOpen={setOpen}
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
      </>
   )
}

export default Categories;