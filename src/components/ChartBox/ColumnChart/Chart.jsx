import React from 'react';
import ColumnChart from './Content';
import { IoIosRocket } from "react-icons/io";
import './Chart.css'


const ColumnChartContent = (props) => {
   return (
      <div className='chart-box column-chart-box'>
         <div className="column-chart-header">
            <IoIosRocket />
            <h4>BANDWIDTH REPORTS</h4>
         </div>
         <ColumnChart />
      </div>
   );
}

export default ColumnChartContent;