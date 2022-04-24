import { Paper } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BasicDateRangePicker from '../../components/DatePicker/DatePicker';

const BasketsHistory = () => {
   return (
      <div className='main px-2 px-md-3'>
         <Paper elevation={2} className="py-3 px-2">
            <Row>
               <Col>
                  <BasicDateRangePicker />
               </Col>
               <Col>
                  
               </Col>
            </Row>
         </Paper>
      </div>
   );
}

export default BasketsHistory;
