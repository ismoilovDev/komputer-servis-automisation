import React, { useEffect, useState } from 'react'
import { Alert, Tabs } from 'antd';
import { FcBusinessContact, FcBusinessman, FcInTransit } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import Skeleton from '../../components/Skeleton/Skeleton';
import http from '../../Services/getData';
import { Modal, Box, Paper } from '@mui/material';
import EditCompanyClient from '../../components/EditCompanyClient/EditCompanyClient';
import EditPostman from '../../components/EditPostman/Editpostman';
import SingleClient from '../../components/SingleClient/SingleClient';
import Pagination from '../../components/Pagination/Pagination';
import { paginate } from './../../utils/paginate';
import './Clients.css';


const { TabPane } = Tabs;

function Clients() {
   const [compClients, setCompClients] = useState([]);
   const [clients, setClients] = useState([]);
   const [postmans, setPostmans] = useState([]);
   const [loading, setLoading] = useState(false);
   const [clickedId, setClickedId] = useState('');
   const [open, setOpen] = useState(false);
   const [openSingleCont, setOpenSingleCont] = useState(false);
   const [postmanId, setPostmanId] = useState("");
   const [clickAs, setClickAs] = useState(false);
   const [singleCont, setSingleCont] = useState({});
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(8);
   let count = clients.length;
   let countPostman = postmans.length;

   useEffect(() => {
      getAllClients()
      getAllPostman()
   }, [])

   // Edit Modal --------------->
   const handleClose = () => setOpen(false);
   const clickedIdHendle = (id) => {
      setOpen(true);
      setClickedId(id)
      setClickAs(false);
   }
   const clickedPostmanIdHendle = (id) => {
      setOpen(true);
      setPostmanId(id);
      setClickAs(true);
   }


   // Single Content Modal ------------->
   const handleSingleContClose = () => setOpenSingleCont(false);
   const clickedSingleContIdHendle = (singleCate) => {
      setOpenSingleCont(true);
      setSingleCont(singleCate);
   }


   // Get All Clients
   const getAllClients = async () => {
      await http
         .get('/user/all')
         .then(res => {
            setLoading(true)
            const allClients = res.data;
            setClients(allClients.filter(client => client.status === "J"));
            setCompClients(allClients.filter(client => client.status === "Y"));
         })
         .catch()
   }

   // Get All Postmans
   const getAllPostman = async () => {
      await http
         .get('/postman/all')
         .then(res => {
            setPostmans(res.data)
         })
         .catch()
   }

   // Delete Client
   const deleteClientHendle = async (id, name) => {
      if(window.confirm(`Delete ${name}`)) {
         await http.delete(`/user/delete/${id}`)
            .then(res => {
               setCompClients(compClients.filter(item => item.id !== id));
               setClients(clients.filter(item => item.id !== id));
            })
            .catch(err => {

            })
      }
   }

   // Delete Postman
   const deletePostmanHendle = async (id, name) => {
      if(window.confirm(`Delete ${name}`)) {
         await http.delete(`/postman/delete/${id}`)
            .then(res => {
               setPostmans(postmans.filter(item => item.id !== id));
               console.log('deleted');
            })
            .catch(err => {

            })
      }
   }

   // Change Page
   const hendleChangePage = (page) => {
      setCurrentPage(page)
      window.scroll(0, 0);
   }
   // Paginate
   const paginated = paginate(clients, currentPage, pageSize)
   const paginatedPostman = paginate(postmans, currentPage, pageSize)
   return (
      <>
         <div className='main px-2 px-md-3'>
            <Paper elevation={2} className="py-3 px-2">
               <h2 className='d-flex justify-content-center'>
                  Клиенты
               </h2>
               <Tabs defaultActiveKey="1">
                  <TabPane tab="Yurudik" key="1">
                     <div className='box'>
                        <div className='my_table'>
                           <ul>
                              <li className='my_table_header'>
                                 <span className='my_table_name'>
                                    Company Name
                                 </span>
                                 <span>
                                    Company Number
                                 </span>
                                 <span>
                                    INN
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
                                          compClients.length !== 0 ? (
                                             compClients.map((comp, i) => (
                                                <li key={i} className='my_table_body'>
                                                   <span className='my_table_name' onClick={() => clickedSingleContIdHendle(comp)}>
                                                      <article>
                                                         <FcBusinessContact />
                                                      </article>
                                                      {comp.full_name}
                                                   </span>
                                                   <span>
                                                      {comp.phone}
                                                   </span>
                                                   <span>
                                                      {comp.inn}
                                                   </span>
                                                   <span className='my_table_btns'>
                                                      <button className='btn-edit' onClick={() => clickedIdHendle(comp.id)}>
                                                         <FaRegEdit />
                                                      </button>
                                                      <button onClick={() => deleteClientHendle(comp.id, comp.full_name)}>
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
                  <TabPane tab="Jismoniy" key="2">
                     <div className='box'>
                        <div className='my_table'>
                           <ul>
                              <li className='my_table_header'>
                                 <span className='my_table_name'>
                                    Name
                                 </span>
                                 <span>
                                    Phone Number
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
                                          clients.length !== 0 ? (
                                             paginated.map((item, index) => (
                                                <li key={index} className='my_table_body'>
                                                   <span className='my_table_name' onClick={() => clickedSingleContIdHendle(item)}>
                                                      <article>
                                                         <FcBusinessman />
                                                      </article>
                                                      {item.full_name}
                                                   </span>
                                                   <span>
                                                      {item.phone}
                                                   </span>
                                                   <span className='my_table_btns'>
                                                      <button className='btn-edit' onClick={() => clickedIdHendle(item.id)}>
                                                         <FaRegEdit />
                                                      </button>
                                                      <button onClick={() => deleteClientHendle(item.id, item.full_name)}>
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
                     <Pagination
                        countItems={count}
                        pageSize={pageSize}
                        onPageChange={hendleChangePage}
                     />
                  </TabPane>
                  <TabPane tab="Postman" key="3">
                     <div className='box'>
                        <Pagination
                           countItems={countPostman}
                           pageSize={pageSize}
                           onPageChange={hendleChangePage}
                        />
                        <div className='my_table'>
                           <ul>
                              <li className='my_table_header'>
                                 <span className='my_table_name'>
                                    Company Name
                                 </span>
                                 <span>
                                    Company Number
                                 </span>
                                 <span>
                                    INN
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
                                          postmans.length !== 0 ? (
                                             paginatedPostman.map((item, id) => (
                                                <li key={id} className='my_table_body'>
                                                   <span className='my_table_name' onClick={() => clickedSingleContIdHendle(item)}>
                                                      <article>
                                                         <FcInTransit />
                                                      </article>
                                                      {item.full_name}
                                                   </span>
                                                   <span>
                                                      {item.phone}
                                                   </span>
                                                   <span>
                                                      {item.inn}
                                                   </span>
                                                   <span className='my_table_btns'>
                                                      <button className='btn-edit' onClick={() => clickedPostmanIdHendle(item.id)}>
                                                         <FaRegEdit />
                                                      </button>
                                                      <button onClick={() => deletePostmanHendle(item.id, item.full_name)}>
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
               {
                  clickAs ? (
                     <EditPostman
                        id={postmanId}
                        setOpen={setOpen}
                        postmans={postmans}
                        setPostmans={setPostmans}
                     />
                  ) : (
                     <EditCompanyClient
                        id={clickedId}
                        setOpen={setOpen}
                        clients={clients}
                        setClients={setClients}
                        compClients={compClients}
                        setCompClients={setCompClients}
                     />
                  )
               }
            </Box>
         </Modal>
         <Modal
            open={openSingleCont}
            onClose={handleSingleContClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className="modal_box">
               <SingleClient
                  singleCont={singleCont}
               />
            </Box>
         </Modal>
      </>
   )
}

export default Clients