import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Chart from './Chart';

const ProgressBar = () => {
   return (
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
   )
}

export default ProgressBar;