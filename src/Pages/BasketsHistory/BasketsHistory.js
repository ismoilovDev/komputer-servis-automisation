import React, { useEffect, useState } from 'react';
import { FormControl, Paper, Select, InputLabel, OutlinedInput, MenuItem } from '@mui/material';
import { DatePicker } from 'antd';
import { Col, Row } from 'react-bootstrap';
import BasketInforma from '../../components/BasketInforma/BasketInforma';
import BasketsList from '../../components/BasketsList/BasketsList';
import Title from '../../components/Title/Title';
import http from '../../Services/getData';
import { paginate } from '../../utils/paginate';
import { VscHistory } from 'react-icons/vsc';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import './BasketsHistory.css';


const now = Date.now()
const useStyles = makeStyles({
   minLabel: {
      borderRadius: 2,
      lineHeight: '1em',
   },
   minInput: {
      minHeight: '1em'
   }
});

const BasketsHistory = () => {
   const classes = useStyles();
   const [loaded, setLoaded] = useState(false);
   const [postmanId, setPostmanId] = useState('');
   const [postmans, setPostmans] = useState([]);
   const [clickedPostman, setClickedPostman] = useState({});
   const [baskets, setBaskets] = useState([]);
   const [start, setStart] = useState('2000-12-31')
   const [end, setEnd] = useState(moment(now).format('YYYY-MM-DD'))
   const dateFormat = 'YYYY/MM/DD';
   // OffCanvas' states
   const [show, setShow] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(10);
   let count = baskets.length;

   const row = ["Price UZS", "Price USD", "Description", "Operations"];

   // Get All Baskets ------------>
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
   }, [start, end])



   // Get All Postmans ----------->
   useEffect(() => {
      const getAllPostman = async () => {
         await http
            .get('/postman/all')
            .then(res => {
               setPostmans(res.data)
            })
            .catch(err => {
               console.log(err)
            })
      }
      getAllPostman()
   }, [])


   // OffCanvas Hendles ---------------->
   const handleClose = () => setShow(false);
   const handleShow = (obj) => {
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
               <Row className='justify-content-start align-items-center'>
                  <Col xs="12" lg="4" className='mt-4 mt-md-2'>
                     <Row>
                        <Col>
                           <DatePicker
                              value={moment(start, dateFormat)}
                              onChange={(value, strValue) => {
                                 setStart(strValue)
                              }} 
                              defaultValue={moment('2015/01/01', dateFormat)}
                              format={dateFormat}
                           />
                        </Col>
                        <Col>
                           <DatePicker
                              value={moment(end)}
                              onChange={(value, strValue) => {
                                 setEnd(strValue)
                              }} 
                              defaultValue={moment('2015/01/01', dateFormat)}
                              format={dateFormat}
                           />
                        </Col>
                     </Row>
                  </Col>
                  
                  <Col xs="12" lg="4" className='d-flex align-items-center mt-4 mt-md-2'>
                     <FormControl className='w-100 change-form' variant="outlined" size='small'>
                        <InputLabel style={{lineHeight: '1em'}} className={classes.minLabel} id="pastavshik">Pastavshik Name</InputLabel>
                        <Select
                           size='small'
                           labelId="pastavshik"
                           id="pastavshikId"
                           value={postmanId}
                           onChange={e => setPostmanId(e.target.value)}
                           required
                           input={<OutlinedInput label="Pastavshik Name" />}
                        >
                           {
                              postmans.map(postman => (
                                 <MenuItem key={postman.full_name} value={postman.id}>{postman.full_name}</MenuItem>
                              ))
                           }
                        </Select>
                     </FormControl>
                  </Col>
               </Row>
               <Row className='w-100 mx-auto mt-4 px-0'>
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
