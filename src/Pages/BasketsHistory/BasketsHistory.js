import React, { useEffect, useState } from 'react';
import { Paper, OutlinedInput, MenuItem } from '@mui/material';
import { DatePicker } from 'antd';
import { Col, Row } from 'react-bootstrap';
import BasketInforma from '../../components/BasketInforma/BasketInforma';
import BasketsList from '../../components/BasketsList/BasketsList';
import Title from '../../components/Title/Title';
import http from '../../Services/getData';
import { paginate } from '../../utils/paginate';
import { VscHistory } from 'react-icons/vsc';
import moment from 'moment';
import { Select } from 'antd';
import './BasketsHistory.css';

const { Option } = Select;
const now = Date.now()

const BasketsHistory = () => {
   const [loaded, setLoaded] = useState(false);
   const [postmanId, setPostmanId] = useState('');
   const [basketType, setBasketType] = useState('unchecked');
   const [postmans, setPostmans] = useState([]);
   const [clickedPostman, setClickedPostman] = useState({});
   const [baskets, setBaskets] = useState([]);
   const [start, setStart] = useState('2021-12-31');
   const [end, setEnd] = useState(moment(now).format('YYYY-MM-DD'));
   const dateFormat = 'YYYY/MM/DD';
   const [dateChanged, setDateChanged] = useState(false);
   // OffCanvas' states
   const [show, setShow] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(10);
   let count = baskets.length;

   const row = ["Price UZS", "Price USD", "Description", "Operations"];

   // Get All Unchecked Baskets ------------>
   useEffect(() => {
      filterBasketType()
   }, [start, end])

   let getAllUncheckedBaskets = async (id) => {
      await http
         .get(`/warehouse-basket/all${dateChanged ? `?from=${start}&to=${end}` : ""}${id ? `?postman_id=${id}`: ""}`)
         .then(res => {
            setBaskets(res.data);
            setLoaded(true);
         })
   }

   // Get All Checked Baskets ----------->
   let getAllCheckedBaskets = async (id) => {
      await http
         .get(`/orders/history${dateChanged ? `?from=${start}&to=${end}` : ""}${id ? `&postman_id=${id}`: ""}`)
         .then(
            res => {
               setBaskets(res.data);
               setLoaded(true);
            }
         )
   }

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

   // Filter Baskets ----------->
   const filterBasketType = (val = "unchecked") => {
      setLoaded(false)
      if (val === 'unchecked') {
         setBasketType("unchecked")
         getAllUncheckedBaskets()
      } else {
         setBasketType("checked")
         getAllCheckedBaskets()
      }
   }

   const filterPostmanBasket = (id) => {
      setLoaded(false);
      if (basketType === 'unchecked') {
         getAllUncheckedBaskets(id)
      } else {
         getAllCheckedBaskets(id)
      }
   }

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
   const paginated = paginate(baskets, currentPage, pageSize);

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
                              style={{width: "100%"}}
                              value={moment(start, dateFormat)}
                              onChange={(value, strValue) => {
                                 setDateChanged(true)
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
                                 setDateChanged(true)
                                 setEnd(strValue)
                              }}
                              defaultValue={moment('2015/01/01', dateFormat)}
                              format={dateFormat}
                           />
                        </Col>
                     </Row>
                  </Col>
                  <Col xs="12" lg="5" className='mt-4 mt-md-2'>
                     <Select
                        style={{
                           width: "100%"
                        }}
                        onChange={(e) => filterPostmanBasket(e)}
                        placeholder="Postmans"
                     >
                        {
                           postmans.map(postman => (
                              <Option key={postman.full_name} value={postman.id}>{postman.full_name}</Option>
                           ))
                        }
                     </Select>
                  </Col>
                  <Col xs="12" lg="3" className='mt-4 mt-md-2'>
                     <Select defaultValue="unchecked" style={{ width: "100%" }} onChange={e => filterBasketType(e)}>
                        <Option value="unchecked">Unchecked</Option>
                        <Option value="checked">Checked</Option>
                     </Select>
                  </Col>
               </Row>
               <Row className='w-100 mx-auto mt-4 px-0'>
                  <BasketsList
                     loaded={loaded}
                     basketType={basketType}
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
