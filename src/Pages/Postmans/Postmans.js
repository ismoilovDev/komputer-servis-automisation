import React, { useEffect, useState } from 'react'
import Title from '../../components/Title/Title';
import { FiServer } from 'react-icons/fi';
import { Paper } from '@mui/material';
import http from '../../Services/getData';
import { paginate } from '../../utils/paginate';
import PostmansList from '../../components/PostmansList/PostmansList';
import Paylet from '../../components/Paylet/Paylet';

function Postmans() {
   const [loaded, setLoaded] = useState(false);
   const [postmans, setPostmans] = useState([]);

   // Paylet --->
   const [isModalVisible, setIsModalVisible] = useState(false);
   
   // Pagination --->
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(8);
   let countPostman = postmans.length;

   useEffect(() => {
      getAllPostman()
   }, [])

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
   
   const rows = ['Number', 'INN', "Pay"];

   // PAGINATION ----------------->
   // Change Page
   const hendleChangePage = (page) => {
      setCurrentPage(page)
      window.scroll(0, 0);
   }
   
   // Paginate
   const postmanPaginated = paginate(postmans, currentPage, pageSize);

   // PAYLET ---------------------->
   
   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleOk = () => {
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };
   return (
      <div className='main postmans px-2 px-md-3'>
         <Title
            title="Продукты"
            children={<FiServer />}
         />
         <Paper elevation={2} className="py-3 px-2">
            <PostmansList 
               loaded={loaded}
               paginated={postmanPaginated}
               count={countPostman}
               pageSize={pageSize} 
               hendleChangePage={hendleChangePage}
               name="Postman Name"
               rows={rows}
               showModal={showModal}
            />
         </Paper>
         <Paylet 
            isModalVisible={isModalVisible}
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
         />
      </div>
   )
}

export default Postmans;