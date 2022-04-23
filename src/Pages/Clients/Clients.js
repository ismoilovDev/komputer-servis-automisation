import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import http from '../../Services/getData';
import { Modal, Box, Paper } from '@mui/material';
import EditCompanyClient from '../../components/EditCompanyClient/EditCompanyClient';
import EditPostman from '../../components/EditPostman/Editpostman';
import SingleClient from '../../components/SingleClient/SingleClient';
import ClientsList from '../../components/ClientsList/ClientsList'
import { paginate } from '../../utils/paginate';
import './Clients.css';
import MyAlert from '../../components/MyAlert/MyAlert';


const { TabPane } = Tabs;
function Clients() {
   const [loaded, setLoaded] = useState(false);
   const [compClients, setCompClients] = useState([]);
   const [clients, setClients] = useState([]);
   const [postmans, setPostmans] = useState([]);
   const [selectedClient, setSelectedClient] = useState({});
   const [selectedPostman, setSelectedPostman] = useState({});
   const [open, setOpen] = useState(false);
   const [openSingleCont, setOpenSingleCont] = useState(false);
   const [postmanId, setPostmanId] = useState("");
   const [clickAs, setClickAs] = useState(false);
   const [singleCont, setSingleCont] = useState({});
   const [from, setFrom] = useState("");
   const [success, setSuccess] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const [notific, setNotific] = useState(false);
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
   const clickedObjHendle = (obj) => {
      setOpen(true);
      setSelectedClient(obj)
      setClickAs(false);
   }
   const clickedPostmanObjHendle = (obj) => {
      setOpen(true);
      setSelectedPostman(obj);
      setClickAs(true);
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

   const rows = ['Number', 'INN', 'Операции'];
   const clientsRow = ['Number', 'Операции'];


   // Get All Clients
   const getAllClients = async () => {
      await http
         .get('/user/all')
         .then(res => {
            const allClients = res.data;
            setClients(allClients.filter(client => client.status === "J"));
            setCompClients(allClients.filter(client => client.status === "Y"));
            setLoaded(true)
         })
         .catch()
   }

   // Get All Postmans
   const getAllPostman = async () => {
      await http
         .get('/postman/all')
         .then(res => {
            setPostmans(res.data)
            setLoaded(true)
         })
         .catch()
   }

   // Delete Client
   const deleteClientHendle = async (id, name) => {
      if (window.confirm(`Delete ${name}`)) {
         await http.delete(`/user/delete/${id}`)
            .then(res => {
               setCompClients(compClients.filter(item => item.id !== id));
               setClients(clients.filter(item => item.id !== id));
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

   // Delete Postman
   const deletePostmanHendle = async (id, name) => {
      if (window.confirm(`Delete ${name}`)) {
         await http.delete(`/postman/delete/${id}`)
            .then(res => {
               setPostmans(postmans.filter(item => item.id !== id));
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
   const compClientsPaginated = paginate(compClients, currentPage, pageSize);
   const clientsPaginated = paginate(clients, currentPage, pageSize);
   const postmanPaginated = paginate(postmans, currentPage, pageSize);

   return (
      <>
         <div className='main px-2 px-md-3'>
            <Paper elevation={2} className="py-3 px-2">
               <h2 className='d-flex justify-content-center'>
                  Клиенты
               </h2>
               <Tabs defaultActiveKey="1">
                  <TabPane tab="Yurudik" key="1">
                     <ClientsList
                        loaded={loaded}
                        paginated={compClientsPaginated}
                        count={count}
                        pageSize={pageSize} 
                        hendleChangePage={hendleChangePage}
                        name="Client Name"
                        rows={rows}
                        clickedSingleObjHendle={clickedSingleObjHendle}
                        clickedObjHendle={clickedObjHendle}
                        deleteData={deleteClientHendle}
                     />
                  </TabPane>
                  <TabPane tab="Jismoniy" key="2">
                     <ClientsList
                        loaded={loaded}
                        paginated={clientsPaginated}
                        count={count}
                        pageSize={pageSize} 
                        hendleChangePage={hendleChangePage}
                        name="Client Name"
                        rows={clientsRow}
                        clickedSingleObjHendle={clickedSingleObjHendle}
                        clickedObjHendle={clickedObjHendle}
                        deleteData={deleteClientHendle}
                     />
                  </TabPane>
                  <TabPane tab="Postmans" key="3">
                     <ClientsList
                        loaded={loaded}
                        paginated={postmanPaginated}
                        count={countPostman}
                        pageSize={pageSize} 
                        hendleChangePage={hendleChangePage}
                        name="Postman Name"
                        rows={rows}
                        clickedSingleObjHendle={clickedSingleObjHendle}
                        clickedObjHendle={clickedPostmanObjHendle}
                        deleteData={deletePostmanHendle}
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
               {
                  clickAs ? (
                     <EditPostman
                        selectedPostman={selectedPostman}
                        setFrom={setFrom}
                        handleClick={handleClick}
                        setSuccess={setSuccess}
                        setOpen={setOpen}
                        postmans={postmans}
                        setPostmans={setPostmans}
                     />
                  ) : (
                     <EditCompanyClient
                        selectedClient={selectedClient}
                        setFrom={setFrom}
                        handleClick={handleClick}
                        setSuccess={setSuccess}
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
         <MyAlert
            notific={notific}
            handleClose={handleCloseBackdrop}
            from={from}
            success={success}
            errorMessage="Client not update"
            successMessage="Client update"
            deleted={deleted}
            responseDeleteMessage="Client Deleted"
            rejectDeleteMessage="Client Not deleted"
         />
      </>
   )
}

export default Clients