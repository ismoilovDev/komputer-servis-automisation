import React, { useEffect, useState } from 'react'
import Title from '../../components/Title/Title';
import { FiServer } from 'react-icons/fi';
import { Paper } from '@mui/material';
import http from '../../Services/getData';
import { paginate } from '../../utils/paginate';
import PostmansList from '../../components/PostmansList/PostmansList';

function Postmans() {
   const [loaded, setLoaded] = useState(false);
   const [postmans, setPostmans] = useState([]);
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
   
   const rows = ['Number', 'INN'];

   // Change Page
   const hendleChangePage = (page) => {
      setCurrentPage(page)
      window.scroll(0, 0);
   }
   
   // Paginate
   const postmanPaginated = paginate(postmans, currentPage, pageSize);

   return (
      <div className='main px-2 px-md-3'>
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
            />
         </Paper>
      </div>
   )
}

export default Postmans;