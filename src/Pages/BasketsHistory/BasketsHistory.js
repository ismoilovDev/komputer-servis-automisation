import { FormControl, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import BasketInforma from '../../components/BasketInforma/BasketInforma';
import BasketsList from '../../components/BasketsList/BasketsList';
import BasicDateRangePicker from '../../components/DatePicker/DatePicker';
import Title from '../../components/Title/Title';
import http from '../../Services/getData';
import { paginate } from '../../utils/paginate';
import { VscHistory } from 'react-icons/vsc';

const BasketsHistory = () => {

   const [loaded, setLoaded] = useState(false);
   const [search, setSearch] = useState("");
   const [clickedPostman, setClickedPostman] = useState({});
   const [baskets, setBaskets] = useState([]);
   
   // OffCanvas' states
   const [show, setShow] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(10);
   let count = baskets.length;

   useEffect(() => {
      const getAllBaskets = async () => {
         await http
            .get('/warehouse-basket/all')
            .then(res => {
               setBaskets(res.data)
               setLoaded(true)
            })
            .catch(err => {
            })
      }
      getAllBaskets()
   }, [])
   const row = [ "Price UZS", "Price USD", "description", "Operations" ];
   
   // OffCanvas Hendles ---------------->
   const handleClose = () => setShow(false);
   const handleShow = (obj) =>{
      setShow(true);
      setClickedPostman(obj)
      console.log(obj);
   }

   // Change Page
   const hendleChangePage = (page) => {
      setCurrentPage(page)
      window.scroll(0, 0);
   }
   // Paginate
   const paginated = paginate(baskets, currentPage, pageSize)
   return (
      <>
         <div className='main px-2 px-md-3'>
            <Title
               title="История Заявки"
               children={<VscHistory />}
            />
            <Paper elevation={2} className="py-3 px-2">
               <Row className='justify-content-between align-items-center px-2'>
                  <Col xs="5">
                     <BasicDateRangePicker />
                  </Col>
                  <Col xs="7" className='d-flex align-items-center'>
                     <FormControl className='w-100'>
                        <TextField
                           size="small"
                           className="w-100 for-label"
                           type="text"
                           id="tavar"
                           variant="outlined"
                           label="Search..."
                           value={search}
                           autoComplete="off"
                           onChange={(e) => { setSearch(e.target.value) }}
                           placeholder="Saliq Bisenov"
                           required
                        />
                     </FormControl>
                  </Col>
               </Row>
               <Row className='px-2 mt-5'>
                  <BasketsList 
                     loaded={loaded}
                     paginated={paginated}
                     count={count}
                     pageSize={pageSize}
                     hendleChangePage={hendleChangePage}
                     name="Postman"
                     rows={row}
                     handleShow={handleShow}
                  />
               </Row>
            </Paper>
         </div>
         <BasketInforma
            show={show}
            handleClose={handleClose}
            clickedPostman={clickedPostman}
         />
      </>
   );
}

export default BasketsHistory;
