import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ColumnChartContent from '../ColumnChart/Chart';
import Chart from './Chart';

const LineAnalys = () => {
   return (
      <>
         <Col xs='12' xl="6">
            <Row>
               <Col xs="12" sm="6" lg="3" xl="6">
                  <Chart
                     count="1896"
                     describe="Sales last month"
                     color="#3F6AD8"
                  />
               </Col>
               <Col xs="12" sm="6" lg="3" xl="6">
                  <Chart
                     count="1896"
                     describe="Sales last month"
                     color="#3F6AD8"
                  />
               </Col>
               <Col xs="12" sm="6" lg="3" xl="6">
                  <Chart
                     count="1896"
                     describe="Sales last month"
                     color="#3F6AD8"
                  />
               </Col>
               <Col xs="12" sm="6" lg="3" xl="6">
                  <Chart
                     count="1896"
                     describe="Sales last month"
                     color="#3F6AD8"
                  />
               </Col>
            </Row>
         </Col>
         <Col>
            <ColumnChartContent />
         </Col>
      </>
   )
}

export default LineAnalys;