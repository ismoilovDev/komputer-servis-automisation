import React from 'react';
import ProgressBar from './Content.jsx';
import './Chart.css';


const Chart = (props) => {
   return (
      <div className='chart-box'>
         <div className="chart-header">
            <div className='chart-title'>
               <h3>{props.title}</h3>
               <span>{props.describe}</span>
            </div>
            <p>{props.count}</p>
         </div>
         <ProgressBar
            color={props.color}
         />
      </div>
   );
}

export default Chart;
