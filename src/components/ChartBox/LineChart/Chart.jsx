import React from 'react';
import './Chart.css';
import LineChart from './Content';


const Chart = (props) => {
   return (
      <div className='chart-box'>
         <div className="line-chart-header">
            <div className='line-chart-title'>
               <h3> <article>$</article> {props.count}</h3>
               <span>{props.describe}</span>
            </div>
         </div>
         <LineChart />
      </div>
   );
}

export default Chart;
