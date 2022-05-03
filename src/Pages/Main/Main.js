import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Chart from '../../components/ChartBox/Chart';
import Title from '../../components/Title/Title';
import http from '../../Services/getData';
import { IoLayersOutline } from 'react-icons/io5';

const ProgressBar = ({ setToken }) => {

   useEffect(() => {
      const getAllProducts = async () => {
         await http
            .get('/product/all')
            .then(res => {

            })
            .catch(err => {
               console.log(err.response)
               if (err.response.data.message === "Unauthenticated." || err.response.status === 401) {
                  window.localStorage.clear()
                  setToken("")
                  window.location.reload(false);
               }
            })
      }
      getAllProducts()

   },  // eslint-disable-next-line 
      [])

   return (
      <div className='main px-2 px-md-3'>
         <Title
            title="Панель управления"
            children={<IoLayersOutline />}
         />
         <Container>
            <Row>
               <Col xs='12' md="6" lg="4">
                  <Chart
                     title="Total Orders"
                     count="1896"
                     describe="Last year expenses"
                     color="#3F6AD8"
                  />
               </Col>
               <Col xs='12' md="6" lg="4">
                  <Chart
                     title="Products Sold"
                     count="757"
                     describe="Last year expenses"
                     color="#E25A7B"
                  />
               </Col>
               <Col xs='12' md="6" lg="4">
                  <Chart
                     title="Clients"
                     count="2096"
                     describe="Last year expenses"
                     color="#3AC47D"
                  />
               </Col>
            </Row>
         </Container>
      </div>
   )
};
export default ProgressBar;